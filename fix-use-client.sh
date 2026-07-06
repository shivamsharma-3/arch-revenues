#!/bin/bash
find app components -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  if grep -q "use client" "$file"; then
    # Remove all "use client"; or 'use client';
    sed -i '/"use client";/d' "$file"
    sed -i "/'use client';/d" "$file"
    sed -i "/\"use client\"/d" "$file"
    sed -i "/'use client'/d" "$file"
    # Insert it at the top
    sed -i '1s/^/"use client";\n/' "$file"
  fi
done
echo "Fixed use client"
