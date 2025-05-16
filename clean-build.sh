#!/bin/bash

# Stop any running processes
echo "Stopping any running processes..."
pkill -f "node"

# Clean up build artifacts
echo "Cleaning up build artifacts..."
rm -rf .next
rm -rf node_modules

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

echo "Clean build completed!"
