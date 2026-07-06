#!/bin/bash

animate_file() {
  file=$1
  if ! grep -q "import { motion } from 'motion/react'" "$file" && ! grep -q 'import { motion } from "motion/react"' "$file"; then
    # Add import
    sed -i '1s/^/import { motion } from "motion\/react";\n/' "$file"
    
    # Check if we need use client
    if ! grep -q '"use client"' "$file" && ! grep -q "'use client'" "$file"; then
      sed -i '1s/^/"use client";\n/' "$file"
    fi
  fi
}

animate_file "components/HowItWorks.tsx"
animate_file "components/Pricing.tsx"
animate_file "components/Problem.tsx"
animate_file "components/SocialProof.tsx"
animate_file "components/CaseStudyPipeline.tsx"
animate_file "components/Comparison.tsx"
animate_file "components/FAQ.tsx"

