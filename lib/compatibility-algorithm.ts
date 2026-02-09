export interface CalculationStep {
    array: number[];
      description: string;
      }

      export const calculateCompatibility = (name1: string, condition: string, name2: string) => {
        // 1. Clean and combine names
          const cleanName1 = name1.toLowerCase().replace(/[^a-z]/g, '');
            const cleanCondition = condition.toLowerCase().replace(/[^a-z]/g, '');
              const cleanName2 = name2.toLowerCase().replace(/[^a-z]/g, '');
                
                  const combined = cleanName1 + cleanCondition + cleanName2;
                    
                      // 2. Count character frequencies
                        const charMap: Record<string, number> = {};
                          for (const char of combined) {
                              charMap[char] = (charMap[char] || 0) + 1;
                                }

                                  // 3. Create initial number array (COUNT EACH LETTER ONLY ONCE)
                                    let currentArray: number[] = [];
                                      const seenChars = new Set<string>(); // To track used letters

                                        for (const char of combined) {
                                            if (!seenChars.has(char)) {
                                                  currentArray.push(charMap[char]);
                                                        seenChars.add(char); // Mark as seen
                                                            }
                                                              }

                                                                const steps: CalculationStep[] = [];
                                                                  
                                                                    steps.push({
                                                                        array: [...currentArray],
                                                                            description: 'Initial unique counts'
                                                                              });

                                                                                // 4. "First + Last" Reduction Loop
                                                                                  while (parseInt(currentArray.join('')) > 100) {
                                                                                      
                                                                                          // Step A: Flatten array if needed
                                                                                              let flatArray: number[] = [];
                                                                                                  for (let num of currentArray) {
                                                                                                        if (num >= 10) {
                                                                                                                const digits = num.toString().split('').map(Number);
                                                                                                                        flatArray.push(...digits);
                                                                                                                              } else {
                                                                                                                                      flatArray.push(num);
                                                                                                                                            }
                                                                                                                                                }
                                                                                                                                                    currentArray = flatArray;

                                                                                                                                                        if (parseInt(currentArray.join('')) <= 100) break;

                                                                                                                                                            // Step B: Add First + Last
                                                                                                                                                                const newArray: number[] = [];
                                                                                                                                                                    let left = 0;
                                                                                                                                                                        let right = currentArray.length - 1;

                                                                                                                                                                            while (left <= right) {
                                                                                                                                                                                  if (left === right) {
                                                                                                                                                                                          // Middle number
                                                                                                                                                                                                  newArray.push(currentArray[left]);
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                // First + Last
                                                                                                                                                                                                                        newArray.push(currentArray[left] + currentArray[right]);
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                    left++;
                                                                                                                                                                                                                                          right--;
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                      currentArray = newArray;
                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                              steps.push({
                                                                                                                                                                                                                                                                    array: [...currentArray],
                                                                                                                                                                                                                                                                          description: 'Reduced (First + Last)'
                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                  // 5. Final Result
                                                                                                                                                                                                                                                                                    let percentage = parseInt(currentArray.join(''));
                                                                                                                                                                                                                                                                                      if (percentage > 100) percentage = 100;

                                                                                                                                                                                                                                                                                        return { percentage, steps };
                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                        export function getQuoteForPercentage(percentage: number): string {
                                                                                                                                                                                                                                                                                          if (percentage >= 90) return "Made in Heaven! 💕";
                                                                                                                                                                                                                                                                                            if (percentage >= 75) return "Perfect Match! ✨";
                                                                                                                                                                                                                                                                                              if (percentage >= 50) return "Good Vibes! 🌟";
                                                                                                                                                                                                                                                                                                if (percentage >= 25) return "It Could Work... 🤔";
                                                                                                                                                                                                                                                                                                  return "Run Away! 🏃";
                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                  export function getColorForPercentage(percentage: number): string {
                                                                                                                                                                                                                                                                                                    if (percentage >= 90) return "#00ff00"; 
                                                                                                                                                                                                                                                                                                      if (percentage >= 75) return "#00d4ff"; 
                                                                                                                                                                                                                                                                                                        if (percentage >= 50) return "#ffff00"; 
                                                                                                                                                                                                                                                                                                          if (percentage >= 25) return "#ff8800"; 
                                                                                                                                                                                                                                                                                                            return "#ff0000"; 
                                                                                                                                                                                                                                                                                                            }

