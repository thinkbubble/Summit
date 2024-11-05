#!/bin/bash

# Get the directory to delete (summit)
TARGET_DIR="$1"

# Allow setup.sh to complete fully, then delete summit
sleep 2
rm -rf "$TARGET_DIR"
