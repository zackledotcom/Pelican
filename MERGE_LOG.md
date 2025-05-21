# MERGE_LOG.md

## React Components
- Merged MessageBubble.jsx and MessageBubble.tsx into a single MessageBubble.jsx with sender support and accessibility improvements. Removed MessageBubble.tsx.
- Kept AIResponseBubble.jsx. Removed airresponsebubble.jsx (duplicate).
- Kept InputBar.jsx. Removed ChatInput.jsx, chatinputbar.jsx, and inputarea.jsx (duplicates/older variants).

## Server
- Merged all production-ready server logic into api/server.js (ES modules, all endpoints, context/memory management, vector/embedding utilities, static file serving).
- Removed api/backendserver.js and backend/backend.js after extracting all needed logic/utilities.
- Removed backend/2server.js (already done).

## API & Backend
- Implemented /api/memory endpoint using ChromaDB (returns real memory objects from uploaded_files collection).
- Updated /api/upload to accept FormData using multer (works with all file uploaders).

## File Stubs & Upgrades
- Upgraded hooks/vectorAPI.js to use /api/memory (ChromaDB-backed) and implement pinQdrant/unpinQdrant.
- Upgraded hooks/useVectorMemory.js to fetch real memories from backend.
- Upgraded hooks/MarkdownRenderer.js to use react-markdown, remark-gfm, and syntax highlighting.
- Added providers/ThemeProvider.js (minimal stub for theme context).

## Enhancements
- /api/upload now adds timestamp, pinned, and score metadata to each memory.
- /api/memory/cleanup is called automatically on server start.
- Example UI code for memory voting (upvote/downvote) provided for MemoryInspector.

## Dependencies & Lint
- Rebuilt package.json from all imports/usage. Added: express, cors, ollama, chromadb, @qdrant/js-client-rest, uuid, gpt-tokenizer, framer-motion, node-fetch, electron, eslint, eslint-plugin-react.
- Updated start script to `node api/server.js`.
- Added ESLint config (.eslintrc.json) with recommended and react rules.
- Added `npm run lint` script.

## Notes
- All merges prioritize logic completeness and accessibility. Unknown or experimental logic is commented/documented if not merged.
- No .bak, .copy, or -old files remain for these components.
