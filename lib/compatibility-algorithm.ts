/**
 * SoulMatch Compatibility Calculator
 * 
 * Algorithm:
 * 1. Concatenate: Name1 + Condition + Name2
 * 2. Count character occurrences to create initial number array
 * 3. Pyramid reduction: Add first+last, second+second-to-last, etc.
 * 4. Repeat until 2-digit number remains (the percentage)
 */

export interface CalculationStep {
  description: string;
  array: number[];
}

/**
 * Count character occurrences in a string and return as array of counts
 * @param text - Input string
 * @returns Array of character counts
 */
function countCharacters(text: string): number[] {
  const cleanText = text.toLowerCase().replace(/\s+/g, '');
  const charMap: Record<string, number> = {};
  
  for (const char of cleanText) {
    if (/[a-z]/.test(char)) {
      charMap[char] = (charMap[char] || 0) + 1;
    }
  }
  
  // Return counts in order of appearance
  return Object.values(charMap);
}

/**
 * Perform one pyramid reduction iteration
 * Adds first+last, second+second-to-last, etc.
 * @param array - Current number array
 * @returns New array after one reduction pass
 */
function pyramidReduction(array: number[]): number[] {
  if (array.length <= 1) return array;
  
  const result: number[] = [];
  const len = array.length;
  
  for (let i = 0; i < Math.ceil(len / 2); i++) {
    const left = array[i];
    const right = array[len - 1 - i];
    
    if (i === Math.floor(len / 2) && len % 2 === 1) {
      // Middle element in odd-length array
      result.push(left);
    } else if (i < Math.ceil(len / 2)) {
      const sum = left + right;
      result.push(sum);
    }
  }
  
  return result;
}

/**
 * Convert number to array of digits
 * @param num - Number to convert
 * @returns Array of individual digits
 */
function numberToDigits(num: number): number[] {
  return String(num).split('').map(Number);
}

/**
 * Check if a number is 2 digits (10-99)
 * @param num - Number to check
 * @returns True if number is between 10 and 99
 */
function isTwoDigit(num: number): boolean {
  return num >= 10 && num <= 99;
}

/**
 * Calculate compatibility percentage with step-by-step breakdown
 * @param name1 - First person's name
 * @param condition - Relationship condition (Love, Friend, etc.)
 * @param name2 - Second person's name
 * @returns Object with final percentage and calculation steps
 */
export function calculateCompatibility(
  name1: string,
  condition: string,
  name2: string
): { percentage: number; steps: CalculationStep[] } {
  const steps: CalculationStep[] = [];
  
  // Step 1: Concatenate
  const concatenated = name1 + condition + name2;
  
  // Step 2: Count characters
  let currentArray = countCharacters(concatenated);
  steps.push({
    description: `Character counts from "${concatenated}"`,
    array: [...currentArray],
  });
  
  // Step 3: Pyramid reduction loop - STOP when exactly 2 elements remain
  let iteration = 0;
  while (currentArray.length > 2) {
    iteration++;
    
    // Convert array elements to digits if multi-digit
    let flatArray: number[] = [];
    for (const num of currentArray) {
      if (num >= 10) {
        flatArray.push(...numberToDigits(num));
      } else {
        flatArray.push(num);
      }
    }
    
    currentArray = pyramidReduction(flatArray);
    steps.push({
      description: `Pyramid reduction iteration ${iteration}`,
      array: [...currentArray],
    });
  }
  
  // Final result: get the percentage
  let percentage: number;
  
  if (currentArray.length === 2) {
    // Combine two digits into a 2-digit percentage (e.g., [7, 5] = 75%)
    percentage = currentArray[0] * 10 + currentArray[1];
  } else if (currentArray.length === 1) {
    // Single digit, treat as is
    percentage = currentArray[0];
  } else {
    // Fallback: should not happen with correct algorithm
    percentage = currentArray.reduce((a, b) => a + b, 0);
    if (percentage > 99) percentage = 99;
  }
  
  // Ensure percentage is 0-100
  percentage = Math.max(0, Math.min(100, percentage));
  
  return { percentage, steps };
}

/**
 * Get a fun quote based on compatibility percentage
 * @param percentage - Compatibility percentage (0-100)
 * @returns Fun quote string
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
 * @param percentage - Compatibility percentage (0-100)
 * @returns Color hex code
 */
export function getColorForPercentage(percentage: number): string {
  if (percentage >= 90) return "#00ff00"; // Green
  if (percentage >= 75) return "#00d4ff"; // Cyan/Blue
  if (percentage >= 50) return "#ffff00"; // Yellow
  if (percentage >= 25) return "#ff8800"; // Orange
  return "#ff0000"; // Red
}
