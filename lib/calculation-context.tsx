import React, { createContext, useContext, useState, useCallback } from 'react';
import { calculateCompatibility, CalculationStep } from './compatibility-algorithm';

export interface CalculationData {
  name1: string;
  condition: string;
  name2: string;
  percentage: number;
  steps: CalculationStep[];
}

interface CalculationContextType {
  calculationData: CalculationData | null;
  isCalculating: boolean;
  calculate: (name1: string, condition: string, name2: string) => Promise<void>;
  reset: () => void;
}

const CalculationContext = createContext<CalculationContextType | undefined>(undefined);

export function CalculationProvider({ children }: { children: React.ReactNode }) {
  const [calculationData, setCalculationData] = useState<CalculationData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = useCallback(
    async (name1: string, condition: string, name2: string) => {
      setIsCalculating(true);
      try {
        // Simulate async operation for animation timing
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        const { percentage, steps } = calculateCompatibility(name1, condition, name2);
        setCalculationData({
          name1,
          condition,
          name2,
          percentage,
          steps,
        });
      } finally {
        setIsCalculating(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setCalculationData(null);
  }, []);

  return (
    <CalculationContext.Provider value={{ calculationData, isCalculating, calculate, reset }}>
      {children}
    </CalculationContext.Provider>
  );
}

export function useCalculation() {
  const context = useContext(CalculationContext);
  if (!context) {
    throw new Error('useCalculation must be used within CalculationProvider');
  }
  return context;
}
