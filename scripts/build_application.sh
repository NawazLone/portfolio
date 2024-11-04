#!/bin/bash
# Navigate to the application folder, install dependencies, and build the Angular app
# Change ownership of the application directory to ec2-user
sudo chown -R ec2-user:ec2-user /var/www/html/angular-app
# Optionally, set permissions to allow read, write, and execute for the owner
sudo chmod -R 755 /var/www/html/angular-app
cd /var/www/html/angular-app # Adjust this path if needed
npm install
ng build --configuration production # This will create a production build in the 'dist' folder
