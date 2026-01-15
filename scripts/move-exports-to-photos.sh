#!/bin/bash

# Script to move all exported story videos to the Photos directory
# This will copy (not move) all MP4 and WEBM files from exports/ to ~/Photos/Bachatorial-Exports/

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Source and destination directories
SOURCE_DIR="/Users/davidserrano/Documents/dev/projects/bachatorial/exports"
DEST_DIR="$HOME/Photos/Bachatorial-Exports"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Bachatorial Export Mover${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${YELLOW}Error: Source directory not found: $SOURCE_DIR${NC}"
    exit 1
fi

# Create destination directory if it doesn't exist
if [ ! -d "$DEST_DIR" ]; then
    echo -e "${GREEN}Creating destination directory: $DEST_DIR${NC}"
    mkdir -p "$DEST_DIR"
fi

# Count total files
TOTAL_FILES=$(find "$SOURCE_DIR" -type f \( -name "*.mp4" -o -name "*.webm" \) | wc -l | tr -d ' ')

if [ "$TOTAL_FILES" -eq 0 ]; then
    echo -e "${YELLOW}No video files found in $SOURCE_DIR${NC}"
    exit 0
fi

echo -e "${GREEN}Found $TOTAL_FILES video files to copy${NC}"
echo ""

# Copy all video files while preserving directory structure
COPIED_COUNT=0

while IFS= read -r file; do
    # Get relative path from source directory
    RELATIVE_PATH="${file#$SOURCE_DIR/}"

    # Get the story name (first directory)
    STORY_NAME=$(echo "$RELATIVE_PATH" | cut -d'/' -f1)

    # Get the filename
    FILENAME=$(basename "$file")

    # Files are already named with story prefix (e.g., dance-videos-frame-1.mp4)
    # So we just use the filename as-is
    NEW_FILENAME="$FILENAME"

    # Create story subdirectory in destination
    STORY_DEST_DIR="$DEST_DIR/$STORY_NAME"
    mkdir -p "$STORY_DEST_DIR"

    # Destination file path with new name
    DEST_FILE="$STORY_DEST_DIR/$NEW_FILENAME"

    # Copy the file with new name
    if cp "$file" "$DEST_FILE"; then
        COPIED_COUNT=$((COPIED_COUNT + 1))
        echo -e "${GREEN}✓${NC} Copied: $STORY_NAME/$NEW_FILENAME"
    else
        echo -e "${YELLOW}✗${NC} Failed: $STORY_NAME/$NEW_FILENAME"
    fi
done < <(find "$SOURCE_DIR" -type f \( -name "*.mp4" -o -name "*.webm" \))

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Successfully copied $COPIED_COUNT/$TOTAL_FILES files${NC}"
echo -e "${BLUE}Destination: $DEST_DIR${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Note: Files were copied (not moved). Original files remain in exports/${NC}"
echo ""

# Open the destination folder in Finder
echo -e "${BLUE}Opening destination folder in Finder...${NC}"
open "$DEST_DIR"
