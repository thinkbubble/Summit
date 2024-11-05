#!/bin/bash

# Step 1: Create a Python virtual environment with a name of your choice, e.g., 'myenv'
python3 -m venv summit

# Activate the virtual environment
source summit/bin/activate

# Step 2: Install Flask
pip3 install flask
pip3 install requests
pip3 install pymongo
pip3 install openai

# Step 3: Set up project folder structure
mkdir -p static/css static/js static/images templates

# Move files into the structure
mv app.py ./
mv helper.py ./
mv main.css static/css/
mv project.js static/js/
mv components.js static/js/
mv index.html templates/

echo "Project setup complete."