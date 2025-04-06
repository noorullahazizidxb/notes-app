# Notes App

A modern, offline-first note-taking application built with React and TypeScript. Features include rich text editing, dark mode, tags, and favorites.

## Features

- 📝 Rich text editor with auto-save
- 🌙 Dark/Light theme toggle
- 🏷️ Tag support
- ⭐ Favorite notes
- 🔍 Search functionality
- 💾 Offline-first (all data stored locally)
- 📱 Responsive design

## Tech Stack

- React + TypeScript
- Zustand for state management
- React Router for navigation
- React Quill for rich text editing
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

- `src/app`: Main app and routes
  - `routes/`: All route components
- `src/components/`: Reusable UI components
- `src/store/`: Zustand state management
- `src/types/`: TypeScript type definitions
- `src/utils/`: Helper functions

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## License

MIT
