#!/bin/bash

# Move into the summit directory to start setup
cd "$(dirname "$0")"

# Prompt the user for a project name and validate it
read -p "Enter your project name (only letters, no spaces or special characters): " PROJECT_NAME

# Validate the project name (letters only, no spaces or special characters)
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z]+$ ]]; then
    echo "Invalid project name. Please use only letters with no spaces or special characters."
    exit 1
fi

# Store paths
SUMMIT_DIR="$(pwd)"
PARENT_DIR="$(dirname "$SUMMIT_DIR")"
PROJECT_PATH="$PARENT_DIR/$PROJECT_NAME"

# Create virtual environment in the parent directory
python3 -m venv "$PROJECT_PATH"

# Set up folder structure
mkdir -p "$PROJECT_PATH/static/css" "$PROJECT_PATH/static/js" "$PROJECT_PATH/static/images" "$PROJECT_PATH/templates"

# Move files to the new structure
mv helper.py "$PROJECT_PATH/"
mv app.py "$PROJECT_PATH/"
mv main.css "$PROJECT_PATH/static/css/"
mv summit.js "$PROJECT_PATH/static/js/"
mv project.js "$PROJECT_PATH/static/js/"
mv summit.png "$PROJECT_PATH/static/images/"
mv index.html "$PROJECT_PATH/templates/"

# Activate environment and install Flask
source "$PROJECT_PATH/bin/activate"
pip3 install flask

# Go back to parent and remove summit folder
cd "$PARENT_DIR"
rm -rf "$SUMMIT_DIR"

echo "Setup complete. You are now in your project directory '$PROJECT_NAME'."
echo "The virtual environment is activated. To reactivate later, use: source bin/activate"
