import type { Note, NoteCreateInput, NoteUpdateInput } from '../types/note';
import type { AuthUser } from '../store/authStore';
import { getAuthToken } from '../store/authStore';

type NotesListResponse = { notes: Note[] };
type NoteResponse = { note: Note };
type AuthResponse = { token: string; user: AuthUser };

export class NotesApiError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // ignore JSON parse failures on error responses
    }
    throw new NotesApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
};

export const notesApi = {
  list: async (): Promise<Note[]> => {
    const data = await request<NotesListResponse>('/api/notes');
    return data.notes;
  },

  create: async (payload: NoteCreateInput): Promise<Note> => {
    const data = await request<NoteResponse>('/api/notes', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data.note;
  },

  update: async (id: string, payload: NoteUpdateInput): Promise<Note> => {
    const data = await request<NoteResponse>(`/api/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return data.note;
  },

  delete: async (id: string): Promise<void> => {
    await request<void>(`/api/notes/${id}`, { method: 'DELETE' });
  },

  import: async (notes: Note[]): Promise<number> => {
    const data = await request<{ imported: number }>('/api/notes?action=import', {
      method: 'POST',
      body: JSON.stringify({ notes }),
    });
    return data.imported;
  },
};

export const authApi = {
  register: async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    return request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    return request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  me: async (): Promise<AuthUser> => {
    const data = await request<{ user: AuthUser }>('/api/auth/me');
    return data.user;
  },
};

export const isNetworkFailure = (error: unknown): boolean => {
  if (error instanceof NotesApiError) return error.status >= 500;
  return error instanceof TypeError;
};
