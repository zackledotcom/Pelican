# Deep Pelican RAG Project - Manual Steps & Tips

## Profiling Endpoints
- To profile backend performance:
  1. Start the server with Node.js inspector:
     node --inspect api/server.js
  2. Open Chrome and go to chrome://inspect to attach the debugger.
  3. Use the Profiler tab to record CPU profiles and analyze slow endpoints.
- For deeper profiling, install Clinic.js:
     npm install -g clinic
     clinic doctor -- node api/server.js
  Follow the instructions to generate and view a performance report.
- Every request is also logged with its duration in the server console.

## Pagination in MemoryInspector
- The UI now paginates memories (20 per page). Use Prev/Next buttons to navigate.
- Backend /api/memory supports ?page=1&limit=20 query params.

## Virtualization (Optional)
- For very large lists, consider using react-window or react-virtualized for smooth scrolling.
  Install with: npm install react-window
  See https://react-window.vercel.app/#/examples/list/fixed-size for usage.

## General Manual Steps
- After any code changes, restart both backend and frontend servers.
- For best performance, keep your vector DB size small and run regular cleanups.
- Use the upvote/downvote buttons in MemoryInspector to improve memory quality.

## Need more help?
- See MERGE_LOG.md for a summary of all merges and enhancements.
- Ask your AI assistant for further optimization or deployment tips!
