#!/bin/bash

# Get the absolute path of the current directory (this should be the project directory)
PROJECT_PATH="$(pwd)"

# Create a virtual environment in the project directory
python3 -m venv "$PROJECT_PATH/venv"

# Set up folder structure in the project path
mkdir -p "$PROJECT_PATH/static/css" "$PROJECT_PATH/static/js" "$PROJECT_PATH/static/images" "$PROJECT_PATH/templates"

# Move files into the appropriate locations in the project structure
# Assuming main.css, summit.js, project.js, summit.png, and index.html are present in the repo
mv "$PROJECT_PATH/main.css" "$PROJECT_PATH/static/css/"
mv "$PROJECT_PATH/summit.js" "$PROJECT_PATH/static/js/"
mv "$PROJECT_PATH/project.js" "$PROJECT_PATH/static/js/"
mv "$PROJECT_PATH/summit.png" "$PROJECT_PATH/static/images/"
mv "$PROJECT_PATH/index.html" "$PROJECT_PATH/templates/"

# Activate the virtual environment and install Flask
source "$PROJECT_PATH/venv/bin/activate"
pip3 install flask

echo "Setup complete. You are now in your project directory '$(basename "$PROJECT_PATH")'."
echo "To activate the virtual environment later, use: source venv/bin/activate"
