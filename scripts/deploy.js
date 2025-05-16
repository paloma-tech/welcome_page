// Deployment script for Next.js application
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const BUILD_DIR = '.next';
const STANDALONE_DIR = '.next/standalone';
const STATIC_DIR = '.next/static';
const PUBLIC_DIR = 'public';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function executeCommand(command, errorMessage) {
  try {
    log(`Executing: ${command}`, colors.cyan);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(`${errorMessage}: ${error.message}`, colors.red);
    return false;
  }
}

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    log(`Creating directory: ${dir}`, colors.yellow);
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    log(`Source directory does not exist: ${source}`, colors.red);
    return false;
  }

  ensureDirectoryExists(destination);

  try {
    log(`Copying from ${source} to ${destination}`, colors.cyan);
    fs.cpSync(source, destination, { recursive: true });
    return true;
  } catch (error) {
    log(`Error copying directory: ${error.message}`, colors.red);
    return false;
  }
}

// Main deployment process
async function deploy() {
  log('Starting deployment process...', colors.green);

  // Step 1: Clean previous build
  log('Step 1: Cleaning previous build...', colors.blue);
  if (fs.existsSync(BUILD_DIR)) {
    try {
      // Instead of removing the entire directory, remove its contents
      const files = fs.readdirSync(BUILD_DIR);
      for (const file of files) {
        const filePath = path.join(BUILD_DIR, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
      log('Previous build cleaned successfully', colors.green);
    } catch (error) {
      log(`Error cleaning previous build: ${error.message}`, colors.red);
      // Continue with the process even if cleaning fails
    }
  } else {
    ensureDirectoryExists(BUILD_DIR);
  }

  // Step 2: Install dependencies
  log('Step 2: Installing dependencies...', colors.blue);
  if (!executeCommand('npm install --production', 'Failed to install dependencies')) {
    return;
  }

  // Step 3: Build the application
  log('Step 3: Building the application...', colors.blue);
  if (!executeCommand('npm run build', 'Failed to build the application')) {
    return;
  }

  log('Deployment preparation completed successfully!', colors.green);
  log('The application is ready to be deployed.', colors.green);
  log('To start the application in production mode, run: npm run start', colors.yellow);
}

// Run the deployment process
deploy().catch((error) => {
  log(`Deployment failed: ${error.message}`, colors.red);
  process.exit(1);
});
