#!/bin/bash
find app components -type f -name "*.tsx" | while read -r file; do
  if grep -q '"use client"' "$file"; then
    sed -i '/"use client"/d' "$file"
    sed -i "/'use client'/d" "$file"
    sed -i '1s/^/"use client";\n/' "$file"
  fi
done
