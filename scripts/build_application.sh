#!/bin/bash
# Navigate to the application folder, install dependencies, and build the Angular app
cd /var/www/html/angular-app # Adjust this path if needed
npm install
ng build --prod # This will create a production build in the 'dist' folder
