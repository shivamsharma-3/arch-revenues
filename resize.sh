#!/bin/bash
find app components -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  sed -i 's/text-\[11px\]/text-xs/g' "$file"
  sed -i 's/text-\[12px\]/text-xs/g' "$file"
  sed -i 's/text-\[14px\]/text-sm/g' "$file"
  sed -i 's/text-\[16px\]/text-base/g' "$file"
  sed -i 's/text-\[18px\]/text-lg/g' "$file"
  sed -i 's/text-\[20px\]/text-xl/g' "$file"
  sed -i 's/text-\[24px\]/text-2xl/g' "$file"
  
  # For the 32px and 48px responsive classes, let's fix them together or individually:
  sed -i 's/text-\[32px\] md:text-\[48px\]/text-4xl md:text-5xl/g' "$file"
  
  # If any solo ones are left:
  sed -i 's/text-\[32px\]/text-3xl/g' "$file"
  sed -i 's/text-\[48px\]/text-5xl/g' "$file"
  sed -i 's/text-\[56px\]/text-6xl/g' "$file"
  sed -i 's/text-\[64px\]/text-7xl/g' "$file"
done

echo "Resize done"
