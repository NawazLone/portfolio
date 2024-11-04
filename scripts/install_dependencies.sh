#!/bin/bash
# Update the system, install Node.js, npm, Angular CLI, and Nginx
sudo yum update -y
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs nginx
sudo npm install -g @angular/cli
