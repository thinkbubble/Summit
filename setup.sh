#!/bin/bash

# Prompt the user for a project name and validate it
read -p "Enter your project name (only letters, no spaces or special characters): " PROJECT_NAME

# Check if project name is valid (letters only, no spaces or special characters)
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z]+$ ]]; then
    echo "Invalid project name. Please use only letters with no spaces or special characters."
    exit 1
fi

# Define the absolute path for the new project outside the cloned 'summit' folder
PROJECT_PATH="$(pwd)/../$PROJECT_NAME"

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

# Move to the new project directory without using cd (uses pushd/popd for absolute path navigation)
pushd "$PROJECT_PATH" > /dev/null

# Delete the originally cloned 'summit' folder using $OLDPWD
rm -rf "$OLDPWD"

echo "Setup complete. You are now in your project directory '$PROJECT_NAME'."
echo "The virtual environment is activated. To reactivate later, use: source bin/activate"

# Use popd to return control back to this absolute path without affecting shell's working directory context.
popd > /dev/null
