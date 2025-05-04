const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Helper function to execute commands
function runCommand(command, cwd = process.cwd()) {
  console.log(`Running: ${command} in ${cwd}`);
  try {
    execSync(command, { cwd, stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Main build process
async function build() {
  console.log('Starting build process...');

  // Install root dependencies
  console.log('\nInstalling root dependencies...');
  runCommand('npm install --legacy-peer-deps');

  // Install server dependencies
  console.log('\nInstalling server dependencies...');
  runCommand('npm install --legacy-peer-deps', path.join(process.cwd(), 'server'));

  // Handle client build
  console.log('\nHandling client build...');
  const clientDir = path.join(process.cwd(), 'client');

  // Remove @mui/lab from package.json if it exists
  console.log('Checking client package.json...');
  const packageJsonPath = path.join(clientDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.dependencies['@mui/lab']) {
    console.log('Removing @mui/lab from dependencies...');
    delete packageJson.dependencies['@mui/lab'];
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Install client dependencies
  console.log('Installing client dependencies...');
  runCommand('npm install --legacy-peer-deps --no-package-lock', clientDir);

  // Build client
  console.log('Building client...');
  runCommand('npm run build', clientDir);

  console.log('\nBuild completed successfully!');
}

// Run the build
build().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});
