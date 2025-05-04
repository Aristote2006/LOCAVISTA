/**
 * Development server script with nodemon
 */
const { spawn } = require('child_process');
const path = require('path');

// Path to nodemon binary
const nodemonPath = path.join(__dirname, '../node_modules/.bin/nodemon');

// Spawn nodemon process
const nodemon = spawn(nodemonPath, ['server.js'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
});

// Handle process exit
nodemon.on('close', (code) => {
  console.log(`Nodemon process exited with code ${code}`);
  process.exit(code);
});

// Handle process errors
nodemon.on('error', (err) => {
  console.error('Failed to start nodemon process:', err);
  process.exit(1);
});
