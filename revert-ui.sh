#!/bin/bash

# Find all tsx files in app and components
find app components -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  # Backgrounds
  sed -i 's/bg-\[#F8F0EB\]/bg-zinc-50/g' "$file"
  sed -i 's/bg-\[#D4875A\]/bg-zinc-900/g' "$file"
  sed -i 's/hover:bg-\[#c2794e\]/hover:bg-zinc-800/g' "$file"
  
  # Text colors
  sed -i 's/text-\[#1A2330\]/text-zinc-900/g' "$file"
  sed -i 's/text-\[#506070\]/text-zinc-600/g' "$file"
  sed -i 's/text-\[#D4875A\]/text-zinc-900/g' "$file"
  sed -i 's/hover:text-\[#D4875A\]/hover:text-zinc-600/g' "$file"
  
  # Borders
  sed -i 's/border-\[#D4875A\]\/30/border-zinc-200/g' "$file"
  sed -i 's/border-\[#D4875A\]/border-zinc-900/g' "$file"
  
  # Shadows
  sed -i 's/shadow-\[#D4875A\]\/20/shadow-zinc-900\/20/g' "$file"
  sed -i 's/shadow-\[#D4875A\]\/5/shadow-zinc-900\/5/g' "$file"
done

echo "UI replacement done"
