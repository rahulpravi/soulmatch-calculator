export interface CalculationStep {
  array: number[];
  description: string;
}

export const calculateCompatibility = (name1: string, condition: string, name2: string) => {
  // 1. Clean and combine names (English logic)
  const cleanName1 = name1.toLowerCase().replace(/[^a-z]/g, '');
  const cleanCondition = condition.toLowerCase().replace(/[^a-z]/g, '');
  const cleanName2 = name2.toLowerCase().replace(/[^a-z]/g, '');
  
  const combined = cleanName1 + cleanCondition + cleanName2;
  
  // 2. Count character frequencies
  const charMap: Record<string, number> = {};
  for (const char of combined) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  // 3. Create initial number array
  let currentArray: number[] = [];
  for (const char of combined) {
    currentArray.push(charMap[char]);
  }

  const steps: CalculationStep[] = [];
  
  // Save initial state
  steps.push({
    array: [...currentArray],
    description: 'Initial character counts'
  });

  // 4. Pyramid Reduction Loop
  while (currentArray.length > 2) {
    // 🔥 FIX: If exact 100, stop immediately
    if (currentArray.join('') === '100') {
      return { percentage: 100, steps };
    }

    const newArray: number[] = [];
    for (let i = 0; i < currentArray.length - 1; i++) {
      let sum = currentArray[i] + currentArray[i + 1];
      
      // Logic: If sum is 15, it becomes 1+5=6 (Sum of digits)
      if (sum >= 10) {
        newArray.push(Math.floor(sum / 10) + (sum % 10));
      } else {
        newArray.push(sum);
      }
    }
    
    currentArray = newArray;
    
    // Add step for animation
    steps.push({
      array: [...currentArray],
      description: 'Reduced'
    });
  }

  // 5. Final Result
  let percentage = parseInt(currentArray.join(''));
  
  // Final safety check: Max 100
  if (percentage > 100) percentage = 100;

  return { percentage, steps };
};

/**
 * Get a fun quote based on compatibility percentage
 */
export function getQuoteForPercentage(percentage: number): string {
  if (percentage >= 90) return "Made in Heaven! 💕";
  if (percentage >= 75) return "Perfect Match! ✨";
  if (percentage >= 50) return "Good Vibes! 🌟";
  if (percentage >= 25) return "It Could Work... 🤔";
  return "Run Away! 🏃";
}

/**
 * Get color based on compatibility percentage
 */
export function getColorForPercentage(percentage: number): string {
  if (percentage >= 90) return "#00ff00"; // Green
  if (percentage >= 75) return "#00d4ff"; // Cyan/Blue
  if (percentage >= 50) return "#ffff00"; // Yellow
  if (percentage >= 25) return "#ff8800"; // Orange
  return "#ff0000"; // Red
}
