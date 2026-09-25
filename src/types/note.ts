export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  tags: string[];
}

export interface NoteCreateInput {
  id?: string;
  title: string;
  content: string;
  isFavorite?: boolean;
  tags: string[];
}

export interface NoteUpdateInput {
  title?: string;
  content?: string;
  isFavorite?: boolean;
  tags?: string[];
}

export type DataMode = 'api' | 'local';
