#!/bin/bash

# Prompt the user for a project name and validate it
read -p "Enter your project name (only letters, no spaces or special characters): " PROJECT_NAME

# Check if project name is valid (letters only, no spaces or special characters)
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z]+$ ]]; then
    echo "Invalid project name. Please use only letters with no spaces or special characters."
    exit 1
fi

# Define the path for the new project outside the cloned 'summit' folder
#PROJECT_PATH="../$PROJECT_NAME"
BASE_DIR="$(pwd)"
PROJECT_PATH="$BASE_DIR/../$PROJECT_NAME"

# Create a virtual environment with the project name outside the 'summit' folder
python3 -m venv "$PROJECT_PATH"

# Set up folder structure in the new project path
mkdir -p "$PROJECT_PATH/static/css" "$PROJECT_PATH/static/js" "$PROJECT_PATH/static/images" "$PROJECT_PATH/templates"

# Move files into the correct locations in the new structure
mv helper.py "$PROJECT_PATH/"
mv app.py "$PROJECT_PATH/"
mv main.css "$PROJECT_PATH/static/css/"
mv summit.js "$PROJECT_PATH/static/js/"
mv project.js "$PROJECT_PATH/static/js/"
mv summit.png "$PROJECT_PATH/static/images/"
mv index.html "$PROJECT_PATH/templates/"

# Activate the virtual environment and install Flask
source "$PROJECT_PATH/bin/activate"
pip3 install flask

# Navigate out of the 'summit' folder
cd "$PROJECT_PATH"

# Delete the originally cloned 'summit' folder and its contents
rm -rf "$BASE_DIR"

echo "Setup complete. Your project '$PROJECT_NAME' is ready and isolated in the virtual environment at '$PROJECT_PATH'."
echo "To activate it, use: source $PROJECT_PATH/bin/activate"
