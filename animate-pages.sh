#!/bin/bash
animate_file() {
  file=$1
  if ! grep -q "import { motion } from 'motion/react'" "$file" && ! grep -q 'import { motion } from "motion/react"' "$file"; then
    sed -i '1s/^/import { motion } from "motion\/react";\n/' "$file"
    if ! grep -q '"use client"' "$file" && ! grep -q "'use client'" "$file"; then
      sed -i '1s/^/"use client";\n/' "$file"
    fi
  fi
  
  # Change main to motion.main
  sed -i 's/<main /<motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} /g' "$file"
  sed -i 's/<\/main>/<\/motion.main>/g' "$file"
}

animate_file "app/how-it-works/page.tsx"
animate_file "app/pricing/page.tsx"
animate_file "app/founder/page.tsx"
animate_file "app/strategy-call/page.tsx"
animate_file "app/icp-worksheet/thank-you/page.tsx"
animate_file "app/icp-worksheet/page.tsx"

