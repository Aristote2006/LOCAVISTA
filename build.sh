#!/bin/bash

# Exit on error
set -e

echo "Installing root dependencies..."
npm install --legacy-peer-deps

echo "Installing server dependencies..."
cd server
npm install --legacy-peer-deps
cd ..

echo "Installing client dependencies..."
cd client
npm install --legacy-peer-deps --no-package-lock

echo "Building client..."
npm run build
cd ..

echo "Build completed successfully!"
