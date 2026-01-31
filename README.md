# FolderWatcherLite

Node.js backend (Express + Chokidar) to watch a folder for file changes, with an Angular UI to start/stop watching and view events.

## Stack

- Backend: Node.js, Express, Chokidar, CORS
- UI: Angular (standalone), HttpClient

## Repository structure

- folder-watcher-backend/ — Node backend (TypeScript)
- folder-watcher-ui/ — Angular frontend

## Prerequisites

- Node.js 18+ and npm
- Git
- Angular CLI (optional) for running `ng serve`

## Backend: setup and run

1) Install dependencies
- In VS Code terminal:
  - cd \folder-watcher-backend
  - npm install

2) Run in development (TypeScript)
- If scripts exist:
  - npm run dev
- If not, run with ts-node:
  - npm i -D ts-node typescript @types/node
  - npx ts-node src/server.ts

3) Or build and run (compiled JS)
- npm run build
- npm start

4) Server
- Default: http://localhost:4000
- Health check: open the URL above; API is under /api/watch

### API endpoints

- Start watching
  - POST http://localhost:4000/api/watch/start
  - Body (Windows path example):
    { "path": "C:\\\\Users\\\\YourName\\\\Documents" }

- Stop watching
  - POST http://localhost:4000/api/watch/stop

- Get events
  - GET http://localhost:4000/api/watch/events

cURL examples (PowerShell-safe):

- Start
  curl -X POST http://localhost:4000/api/watch/start `
    -H "Content-Type: application/json" `
    -d "{`"path`":`"C:\\\\Users\\\\YourName\\\\Documents`"}"

- Events
  curl http://localhost:4000/api/watch/events

- Stop
  curl -X POST http://localhost:4000/api/watch/stop

## UI (Angular): setup and run

1) Install and run
- In a new terminal:
  - cd \folder-watcher-ui
  - npm install
  - npm start
  - Open http://localhost:4200

2) HttpClient provider (fix NullInjectorError)
- Ensure the app provides HttpClient:
  - If using standalone bootstrap (app.config.ts or main.ts):
    import { provideHttpClient } from '@angular/common/http';
    providers: [provideHttpClient(), ...]
  - If using NgModule (AppModule):
    import { HttpClientModule } from '@angular/common/http';
    @NgModule({ imports: [HttpClientModule, ...] })

3) Backend URL
- UI service points to:
  - src/app/core/services/watcher.service.ts
  - apiUrl = 'http://localhost:4000/api/watch'

4) Usage
- Open “Folder Watcher” dashboard
- Enter a folder path (e.g., C:\Users\YourName\Documents)
- Click “Start Watching” and observe events listed below

## CORS

If the UI can’t reach the backend due to CORS, ensure the backend enables CORS:

- In app.ts:
  import cors from 'cors';
  app.use(cors());

- Install if missing:
  npm i cors
  npm i -D @types/cors

## Troubleshooting

- Angular HttpClient error: NullInjectorError: No provider for HttpClient
  - Provide HttpClient as shown above.

- Windows paths
  - When sending JSON (e.g., via cURL/REST client), escape backslashes: C:\\\\path\\\\to\\\\watch
  - In the Angular UI input, normal Windows paths like C:\Users\You\Folder are fine.

- Permissions
  - Watching protected folders may require elevated permissions. Run VS Code as Administrator when needed.

- Port in use
  - Change backend port: set PORT env var or update server.ts, then align apiUrl in the UI.

## Git notes

- Single repo (recommended): Track both folders here and push to the same remote.
- If folder-watcher-ui is a Git submodule:
  - Commit/push inside folder-watcher-ui, then commit the submodule pointer in the root.

## Scripts cheat sheet

Backend (if defined in package.json):
- npm run dev — start with ts-node
- npm run build — compile TypeScript
- npm start — run compiled server

UI:
- npm start — ng serve

## License

MIT License