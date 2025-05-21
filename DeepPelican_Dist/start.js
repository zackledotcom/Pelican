const { spawn } = require('child_process');
const path = require('path');

console.log('🔧 Starting DeepPelican system...');

// Start the backend server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

// Start the frontend (if using Vite)
const frontend = spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: true
  });
  
  frontend.on('error', (err) => {
    console.error('Failed to start frontend:', err);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('Shutting down DeepPelican...');
    server.kill();
    frontend.kill();
    process.exit(0);
  });
  ess');
  const path = require('path');
  
  console.log('🔧 Starting DeepPelican system...');
  
  // Start the backend server
  const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    shell: true
  });
  
  server.on('error', (err) => {
    console.error('Failed to start server:', err);
  });
  
  // Start the frontend (if using Vite)
  const frontend = spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: true
  });
  
  frontend.on('error', (err) => {
    console.error('Failed to start frontend:', err);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('Shutting down DeepPelican...');
    server.kill();
    frontend.kill();
    process.exit(0);
  });
  
  frontend.on('error', (err) => {
    console.error('Failed to start frontend:', err);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('Shutting down DeepPelican...');
    server.kill();
    frontend.kill();
    process.exit(0);
  });
  