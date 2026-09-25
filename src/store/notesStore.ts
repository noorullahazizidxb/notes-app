import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { notesApi, isNetworkFailure } from '../lib/notesApi';
import { mergeTags } from '../utils/tags';
import type { DataMode, Note, NoteCreateInput, NoteUpdateInput } from '../types/note';

type Theme = 'light' | 'dark';
export type SortKey = 'updatedAt' | 'createdAt' | 'title';

type NotesState = {
  notes: Note[];
  theme: Theme;
  drawerOpen: boolean;
  activeNoteId: string | null;
  searchQuery: string;
  activeTag: string | null;
  sortKey: SortKey;
  dataMode: DataMode;
  isLoading: boolean;
  hasImportedLegacyNotes: boolean;
  loadNotes: () => Promise<void>;
  addNote: (note: NoteCreateInput) => Promise<Note>;
  updateNote: (id: string, updates: NoteUpdateInput) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  clearNotes: () => void;
  setTheme: (theme: Theme) => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setActiveNote: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveTag: (tag: string | null) => void;
  setSortKey: (key: SortKey) => void;
  filteredNotes: () => Note[];
};

type PersistedState = {
  notes: Note[];
  theme: Theme;
  drawerOpen: boolean;
  searchQuery: string;
  sortKey: SortKey;
  hasImportedLegacyNotes: boolean;
};

const sortNotes = (notes: Note[], key: SortKey = 'updatedAt'): Note[] => {
  return [...notes].sort((a, b) => {
    if (key === 'title') return a.title.localeCompare(b.title);
    return new Date(b[key]).getTime() - new Date(a[key]).getTime();
  });
};

const makeLocalNote = (input: NoteCreateInput): Note => {
  const now = new Date().toISOString();
  return {
    id: input.id ?? crypto.randomUUID(),
    title: input.title.trim() || 'Untitled note',
    content: input.content,
    tags: mergeTags(input.tags),
    isFavorite: input.isFavorite ?? false,
    createdAt: now,
    updatedAt: now,
  };
};

const notifyLocalFallback = () =>
  toast('API unavailable. Working in local mode.', { icon: '🛰️' });

/** Shared API-error handler for write operations; sets local mode on network failure. */
const handleApiError = (error: unknown, set: (s: Partial<NotesState>) => void): boolean => {
  if (isNetworkFailure(error)) {
    notifyLocalFallback();
    set({ dataMode: 'local' });
    return true; // caller should proceed with local write
  }
  throw error;
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      theme: 'dark',
      drawerOpen: false,
      activeNoteId: null,
      searchQuery: '',
      activeTag: null,
      sortKey: 'updatedAt',
      dataMode: 'api',
      isLoading: false,
      hasImportedLegacyNotes: false,

      loadNotes: async () => {
        if (get().isLoading) return;
        set({ isLoading: true });

        try {
          const remoteNotes = sortNotes(await notesApi.list(), get().sortKey);
          const shouldImportLegacy =
            remoteNotes.length === 0 &&
            get().notes.length > 0 &&
            !get().hasImportedLegacyNotes;

          if (shouldImportLegacy) {
            const imported = await notesApi.import(get().notes);
            if (imported > 0) toast.success(`Imported ${imported} local notes to your database.`);
            set({ hasImportedLegacyNotes: true });
            const refreshed = sortNotes(await notesApi.list(), get().sortKey);
            set({ notes: refreshed, dataMode: 'api', isLoading: false });
            return;
          }

          set({ notes: remoteNotes, dataMode: 'api', isLoading: false });
        } catch (error) {
          if (isNetworkFailure(error)) notifyLocalFallback();
          set({ dataMode: 'local', isLoading: false });
        }
      },

      addNote: async (input: NoteCreateInput) => {
        if (get().dataMode === 'api') {
          try {
            const created = await notesApi.create(input);
            set((s) => ({ notes: sortNotes([created, ...s.notes], s.sortKey) }));
            toast.success('Note created.');
            return created;
          } catch (error) {
            if (!handleApiError(error, set)) throw error;
          }
        }
        const created = makeLocalNote(input);
        set((s) => ({ notes: sortNotes([created, ...s.notes], s.sortKey) }));
        toast.success('Note created locally.');
        return created;
      },

      updateNote: async (id: string, updates: NoteUpdateInput) => {
        if (get().dataMode === 'api') {
          try {
            const updated = await notesApi.update(id, updates);
            set((s) => ({
              notes: sortNotes(
                s.notes.map((n) => (n.id === id ? updated : n)),
                s.sortKey
              ),
            }));
            return updated;
          } catch (error) {
            if (!handleApiError(error, set)) throw error;
          }
        }

        const now = new Date().toISOString();
        let localUpdated: Note | undefined;

        set((s) => ({
          notes: sortNotes(
            s.notes.map((n) => {
              if (n.id !== id) return n;
              localUpdated = {
                ...n,
                ...updates,
                title: updates.title !== undefined ? updates.title.trim() || 'Untitled note' : n.title,
                tags: updates.tags !== undefined ? mergeTags(updates.tags) : n.tags,
                updatedAt: now,
              };
              return localUpdated;
            }),
            s.sortKey
          ),
        }));

        if (!localUpdated) throw new Error('Note not found.');
        return localUpdated;
      },

      deleteNote: async (id: string) => {
        if (get().dataMode === 'api') {
          try {
            await notesApi.delete(id);
          } catch (error) {
            handleApiError(error, set);
          }
        }
        set((s) => ({
          notes: s.notes.filter((n) => n.id !== id),
          activeNoteId: s.activeNoteId === id ? null : s.activeNoteId,
        }));
        toast.success('Note deleted.');
      },

      toggleFavorite: async (id: string) => {
        const note = get().notes.find((n) => n.id === id);
        if (note) await get().updateNote(id, { isFavorite: !note.isFavorite });
      },

      clearNotes: () => set({ notes: [], hasImportedLegacyNotes: false }),

      setTheme: (theme) => set({ theme }),
      setDrawerOpen: (isOpen) => set({ drawerOpen: isOpen }),
      setActiveNote: (id) => set({ activeNoteId: id }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveTag: (tag) => set({ activeTag: tag }),
      setSortKey: (key) => {
        set((s) => ({ sortKey: key, notes: sortNotes(s.notes, key) }));
      },

      filteredNotes: () => {
        const { notes, searchQuery, activeTag } = get();
        const q = searchQuery.trim().toLowerCase();

        return notes.filter((note) => {
          const matchesTag = !activeTag || note.tags.includes(activeTag);
          if (!matchesTag) return false;
          if (!q) return true;
          return (
            note.title.toLowerCase().includes(q) ||
            note.content.toLowerCase().includes(q) ||
            note.tags.some((t) => t.includes(q))
          );
        });
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedState => ({
        notes: state.notes,
        theme: state.theme,
        drawerOpen: state.drawerOpen,
        searchQuery: state.searchQuery,
        sortKey: state.sortKey,
        hasImportedLegacyNotes: state.hasImportedLegacyNotes,
      }),
    }
  )
);

