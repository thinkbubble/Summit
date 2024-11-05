#!/bin/bash

# Prompt the user for a project name and validate it
read -p "Enter your project name (only letters, no spaces or special characters): " PROJECT_NAME

# Validate the project name (letters only, no spaces or special characters)
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z]+$ ]]; then
    echo "Invalid project name. Please use only letters with no spaces or special characters."
    exit 1
fi

# Get the absolute path of the summit directory and its parent
SUMMIT_DIR="$(pwd)"
PARENT_DIR="$(dirname "$SUMMIT_DIR")"
PROJECT_PATH="$PARENT_DIR/$PROJECT_NAME"

# Create virtual environment outside of summit
python3 -m venv "$PROJECT_PATH"

# Set up folder structure in the new project path
mkdir -p "$PROJECT_PATH/static/css" "$PROJECT_PATH/static/js" "$PROJECT_PATH/static/images" "$PROJECT_PATH/templates"

# Move files into the appropriate locations in the new structure
mv "$SUMMIT_DIR/helper.py" "$PROJECT_PATH/"
mv "$SUMMIT_DIR/app.py" "$PROJECT_PATH/"
mv "$SUMMIT_DIR/main.css" "$PROJECT_PATH/static/css/"
mv "$SUMMIT_DIR/summit.js" "$PROJECT_PATH/static/js/"
mv "$SUMMIT_DIR/project.js" "$PROJECT_PATH/static/js/"
mv "$SUMMIT_DIR/summit.png" "$PROJECT_PATH/static/images/"
mv "$SUMMIT_DIR/index.html" "$PROJECT_PATH/templates/"

# Activate the virtual environment directly in the new project directory
source "$PROJECT_PATH/bin/activate"
pip3 install flask

# Navigate to the new project directory, then delete the summit directory
cd "$PROJECT_PATH" || exit
rm -rf "$SUMMIT_DIR"

echo "Setup complete. You are now in your project directory '$PROJECT_NAME'."
echo "The virtual environment is activated. To reactivate later, use: source bin/activate"
