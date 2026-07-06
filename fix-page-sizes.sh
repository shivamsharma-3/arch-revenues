#!/bin/bash
for file in app/how-it-works/page.tsx app/pricing/page.tsx app/founder/page.tsx app/icp-worksheet/thank-you/page.tsx app/icp-worksheet/page.tsx; do
  sed -i 's/text-3xl md:text-4xl/text-4xl md:text-5xl/g' "$file"
done
echo "Fixed page sizes"
