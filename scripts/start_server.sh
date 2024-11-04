#!/bin/bash
# Configure Nginx to serve the Angular application
sudo cp /var/www/html/angular-app/nginx.conf /etc/nginx/nginx.conf
sudo systemctl start nginx
sudo systemctl enable nginx
