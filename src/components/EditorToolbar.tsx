import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EditorToolbarProps {
  title: string;
  isFavorite: boolean;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onToggleFavorite: () => void;
}

const EditorToolbar = ({
  title,
  isFavorite,
  onTitleChange,
  onSave,
  onToggleFavorite,
}: EditorToolbarProps) => {
  const navigate = useNavigate();

  return (
    <div className="navbar sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/notes')}
            className="btn-primary px-4 py-2 rounded-lg hover:bg-button-hover transition-theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <input
            className="w-full border rounded"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Note title..."
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={()=>{navigate('/');onSave();}}
            className="btn-primary px-4 py-2 rounded-lg hover:bg-button-hover transition-theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V3a1 1 0 012 0v4a9 9 0 11-18 0V5a7 7 0 012 0v6a3 3 0 000-3z" clipRule="evenodd" />
            </svg>
            Save
          </button>
          <button
            onClick={onToggleFavorite}
            className="btn-primary px-4 py-2 rounded-lg hover:bg-button-hover transition-theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
