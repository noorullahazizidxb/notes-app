// src/store/notesStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { createJSONStorage } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NotesState = {
  notes: Note[];
  addNote: (note: Note) => Promise<Note>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  drawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  addTag: (id: string, tag: string) => Promise<void>;
  removeTag: (id: string, tag: string) => Promise<void>;
  theme: 'light' | 'dark';
  setActiveNote: (id: string | null) => void;
  activeNoteId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredNotes: () => Note[];
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: async (note: Note) => {
        const newNote = { ...note, id: crypto.randomUUID() };
        set((state) => ({
          notes: [...state.notes, newNote]
        }));
        toast.success('Note created successfully');
        return newNote;
      },
      updateNote: async (id: string, updates: Partial<Note>) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
          )
        }));
        toast.success('Note updated successfully');
      },
      deleteNote: (id: string) => {
        const toastId = toast.loading('Deleting note...');
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id)
        }));
        setTimeout(() => {
          toast.dismiss(toastId);
          toast.success('Note deleted successfully');
        }, 1000);
      },
      toggleFavorite: (id: string) => {
        const note = get().notes.find((note) => note.id === id);
        if (note) {
          get().updateNote(id, { isFavorite: !note.isFavorite });
          const isNowFavorite = !note.isFavorite;
          toast.success(isNowFavorite ? 'Note marked as favorite' : 'Note removed from favorites');
        }
      },
      setTheme: (theme) => set({ theme }),
      drawerOpen: false,
      setDrawerOpen: (isOpen) => set({ drawerOpen: isOpen }),
      addTag: async (id: string, tag: string) => {
        const note = get().notes.find((note) => note.id === id);
        if (note && !note.tags.includes(tag)) {
          await get().updateNote(id, {
            tags: [...note.tags, tag]
          });
        }
      },
      removeTag: async (id: string, tag: string) => {
        const note = get().notes.find((note) => note.id === id);
        if (note) {
          await get().updateNote(id, {
            tags: note.tags.filter((t) => t !== tag)
          });
        }
      },
      theme: 'light',
      setActiveNote: (id) => set({ activeNoteId: id }),
      activeNoteId: null,
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      filteredNotes: () => {
        const query = get().searchQuery.toLowerCase();
        return get().notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query)
        );
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
