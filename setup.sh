#!/bin/bash

# Ensure we're working in the current project directory
PROJECT_PATH="$(pwd)"

# Step 1: Create the virtual environment in the project directory
python3 -m venv "$PROJECT_PATH"

# Step 2: Set up folder structure within the project directory
mkdir -p "$PROJECT_PATH/static/css" "$PROJECT_PATH/static/js" "$PROJECT_PATH/static/images" "$PROJECT_PATH/templates"

# Step 3: Move provided files to the appropriate locations within the project structure
# Check if each file exists before moving it to avoid errors
if [[ -f "$PROJECT_PATH/main.css" ]]; then
    mv "$PROJECT_PATH/main.css" "$PROJECT_PATH/static/css/"
fi

if [[ -f "$PROJECT_PATH/summit.js" ]]; then
    mv "$PROJECT_PATH/summit.js" "$PROJECT_PATH/static/js/"
fi

if [[ -f "$PROJECT_PATH/project.js" ]]; then
    mv "$PROJECT_PATH/project.js" "$PROJECT_PATH/static/js/"
fi

if [[ -f "$PROJECT_PATH/summit.png" ]]; then
    mv "$PROJECT_PATH/summit.png" "$PROJECT_PATH/static/images/"
fi

if [[ -f "$PROJECT_PATH/index.html" ]]; then
    mv "$PROJECT_PATH/index.html" "$PROJECT_PATH/templates/"
fi

# Step 4: Activate the virtual environment and install Flask
source "$PROJECT_PATH/bin/activate"
pip3 install flask
pip3 install pymongo
pip3 install requests

source "$PROJECT_PATH/bin/activate"

echo "Setup complete. Everything is set up within '$PROJECT_PATH'."
echo "To activate the virtual environment later, use: source venv/bin/activate"



# Step 5: Delete setup.sh from the folder
rm -- "$PROJECT_PATH/setup.sh"

python3 app.py
