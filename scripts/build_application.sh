#!/bin/bash

# Change ownership of the application directory to ec2-user
sudo chown -R ec2-user:ec2-user /var/www/html/angular-app
# Set permissions to allow read, write, and execute for the owner
sudo chmod -R 755 /var/www/html/angular-app

# Verify Node.js version
echo "Using Node.js version:"
node -v

# Navigate to the application folder, install dependencies, and build the Angular app
cd /var/www/html/angular-app || { echo "Failed to navigate to application folder"; exit 1; }

echo "Installing dependencies...."
npm install || { echo "npm install failed"; exit 1; }
echo "Building the Angular app for production..."
ng build --configuration production || { echo "ng build failed"; exit 1; }
echo "Build completed successfully."
