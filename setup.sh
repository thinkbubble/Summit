#!/bin/bash

# Prompt the user for a project name and validate it
read -p "Enter your project name (only letters, no spaces or special characters): " PROJECT_NAME

# Check if project name is valid (letters only, no spaces or special characters)
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z]+$ ]]; then
    echo "Invalid project name. Please use only letters with no spaces or special characters."
    exit 1
fi

# Store the absolute path for the summit and new project directories
CURRENT_DIR="$(pwd)"
PARENT_DIR="$(dirname "$CURRENT_DIR")"
PROJECT_PATH="$PARENT_DIR/$PROJECT_NAME"

# Create the virtual environment in the new project directory
python3 -m venv "$PROJECT_PATH"

# Set up folder structure directly in the new project path
mkdir -p "$PROJECT_PATH/static/css" "$PROJECT_PATH/static/js" "$PROJECT_PATH/static/images" "$PROJECT_PATH/templates"

# Move files into the new structure within the new project path
mv "$CURRENT_DIR/helper.py" "$PROJECT_PATH/"
mv "$CURRENT_DIR/app.py" "$PROJECT_PATH/"
mv "$CURRENT_DIR/main.css" "$PROJECT_PATH/static/css/"
mv "$CURRENT_DIR/summit.js" "$PROJECT_PATH/static/js/"
mv "$CURRENT_DIR/project.js" "$PROJECT_PATH/static/js/"
mv "$CURRENT_DIR/summit.png" "$PROJECT_PATH/static/images/"
mv "$CURRENT_DIR/index.html" "$PROJECT_PATH/templates/"

# Change to the new project directory and activate the virtual environment
cd "$PROJECT_PATH"
source bin/activate

# Install Flask
pip3 install flask

# Go back to the parent directory, delete the original cloned summit folder
cd "$PARENT_DIR"
rm -rf "$CURRENT_DIR"

echo "Setup complete. You are now in your project directory '$PROJECT_NAME'."
echo "The virtual environment is activated. To reactivate later, use: source bin/activate"
