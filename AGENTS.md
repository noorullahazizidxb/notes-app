# AGENTS.md

Offline-first React + TypeScript notes app (Vite 6, React 18, Tailwind 3, Zustand). No backend — all data is local.

## Commands

```sh
npm install        # install deps
npm run dev        # dev server on http://localhost:3000 (configured in vite.config.ts)
npm run build      # Vite build to dist/
npm run preview    # preview prod build
npx tsc --noEmit   # typecheck
```

- There is **no lint or test setup**. `npm run build` does NOT typecheck — run `npx tsc --noEmit` to verify types (tsconfig is strict, with `noUnusedLocals`/`noUnusedParameters`).
- README claims dev port 5173; it's actually **3000** (vite.config.ts). README is stale.

## Structure & wiring

- `src/app/root.tsx` — all routes via `createBrowserRouter` (lazy-loaded): `/` & `/notes` → Dashboard, `/editor/:id?` → Editor (`:id` optional = create mode), `/favorites`, `/settings`, `*` → NotFound. Add new routes here.
- `src/store/notesStore.ts` — the single Zustand store, persisted to `localStorage` under key `notes-storage` (zustand `persist` + `createJSONStorage`). Changing the `Note` shape will silently break rehydrated data. It exports its own `Note` interface, which is the one used across the app — `src/types/note.ts` is a stale duplicate.
- Uses Redux-style `func()` calls (`notes`, `addNote`, etc. from the hook), not selector-based setup.

## Styling / theming

- Dark mode is class-based: `darkMode: 'class'`, toggled on `document.documentElement` from the store's `theme` (also persisted). `index.html` defaults to `dark`.
- Semantic colors are CSS variables defined in `src/index.css` (`:root` / `.dark`) and mapped to Tailwind utilities in `tailwind.config.js` (`bg-bg`, `text-text`, `bg-card-bg`, `bg-button-primary`, `bg-input-border`, etc.). Use these instead of raw hex/Tailwind colors for theme-consistent UI.
- `src/index.css` contains aggressive global `input`/`input[type="text"]` rules with `!important` — new inputs will inherit these unless overridden.

## Notes editing

- Editor uses `react-quill` (must import `react-quill/dist/quill.snow.css`; `.ql-editor` is styled with `prose dark:prose-invert`). Note content is stored as HTML.
- Saving is debounced (~1s) inside `Editor.tsx`; hashtags are parsed out of content HTML via `src/utils/extractTags.ts`.