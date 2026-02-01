import { describe, it, expect } from 'vitest';
import { calculateCompatibility, getQuoteForPercentage, getColorForPercentage } from './compatibility-algorithm';

describe('Compatibility Algorithm', () => {
  describe('calculateCompatibility', () => {
    it('should calculate compatibility for basic names', () => {
      const result = calculateCompatibility('Alice', 'Love', 'Bob');
      expect(result.percentage).toBeGreaterThanOrEqual(0);
      expect(result.percentage).toBeLessThanOrEqual(100);
      expect(result.steps.length).toBeGreaterThan(0);
    });

    it('should return consistent results for the same input', () => {
      const result1 = calculateCompatibility('John', 'Friend', 'Jane');
      const result2 = calculateCompatibility('John', 'Friend', 'Jane');
      expect(result1.percentage).toBe(result2.percentage);
    });

    it('should handle different relationship conditions', () => {
      const conditions = ['Love', 'Friend', 'Bestie', 'Hate', 'Marriage', 'Trust', 'Crush'];
      for (const condition of conditions) {
        const result = calculateCompatibility('Alice', condition, 'Bob');
        expect(result.percentage).toBeGreaterThanOrEqual(0);
        expect(result.percentage).toBeLessThanOrEqual(100);
      }
    });

    it('should handle names with different cases', () => {
      const result1 = calculateCompatibility('Alice', 'Love', 'Bob');
      const result2 = calculateCompatibility('ALICE', 'LOVE', 'BOB');
      const result3 = calculateCompatibility('alice', 'love', 'bob');
      expect(result1.percentage).toBe(result2.percentage);
      expect(result2.percentage).toBe(result3.percentage);
    });

    it('should have steps describing the calculation process', () => {
      const result = calculateCompatibility('Test', 'Love', 'Case');
      expect(result.steps.length).toBeGreaterThan(0);
      expect(result.steps[0]).toHaveProperty('description');
      expect(result.steps[0]).toHaveProperty('array');
      expect(Array.isArray(result.steps[0].array)).toBe(true);
    });

    it('should handle single character names', () => {
      const result = calculateCompatibility('A', 'Love', 'B');
      expect(result.percentage).toBeGreaterThanOrEqual(0);
      expect(result.percentage).toBeLessThanOrEqual(100);
    });

    it('should handle long names', () => {
      const result = calculateCompatibility(
        'Alexandra',
        'Relationship',
        'Christopher'
      );
      expect(result.percentage).toBeGreaterThanOrEqual(0);
      expect(result.percentage).toBeLessThanOrEqual(100);
    });
  });

  describe('getQuoteForPercentage', () => {
    it('should return "Made in Heaven!" for 90-100%', () => {
      expect(getQuoteForPercentage(95)).toContain('Made in Heaven');
      expect(getQuoteForPercentage(100)).toContain('Made in Heaven');
      expect(getQuoteForPercentage(90)).toContain('Made in Heaven');
    });

    it('should return "Perfect Match!" for 75-89%', () => {
      expect(getQuoteForPercentage(80)).toContain('Perfect Match');
      expect(getQuoteForPercentage(75)).toContain('Perfect Match');
      expect(getQuoteForPercentage(89)).toContain('Perfect Match');
    });

    it('should return "Good Vibes!" for 50-74%', () => {
      expect(getQuoteForPercentage(60)).toContain('Good Vibes');
      expect(getQuoteForPercentage(50)).toContain('Good Vibes');
      expect(getQuoteForPercentage(74)).toContain('Good Vibes');
    });

    it('should return "It Could Work..." for 25-49%', () => {
      expect(getQuoteForPercentage(30)).toContain('It Could Work');
      expect(getQuoteForPercentage(25)).toContain('It Could Work');
      expect(getQuoteForPercentage(49)).toContain('It Could Work');
    });

    it('should return "Run Away!" for 0-24%', () => {
      expect(getQuoteForPercentage(10)).toContain('Run Away');
      expect(getQuoteForPercentage(0)).toContain('Run Away');
      expect(getQuoteForPercentage(24)).toContain('Run Away');
    });
  });

  describe('getColorForPercentage', () => {
    it('should return green for 90-100%', () => {
      expect(getColorForPercentage(95)).toBe('#00ff00');
      expect(getColorForPercentage(100)).toBe('#00ff00');
    });

    it('should return cyan for 75-89%', () => {
      expect(getColorForPercentage(80)).toBe('#00d4ff');
      expect(getColorForPercentage(75)).toBe('#00d4ff');
    });

    it('should return yellow for 50-74%', () => {
      expect(getColorForPercentage(60)).toBe('#ffff00');
      expect(getColorForPercentage(50)).toBe('#ffff00');
    });

    it('should return orange for 25-49%', () => {
      expect(getColorForPercentage(30)).toBe('#ff8800');
      expect(getColorForPercentage(25)).toBe('#ff8800');
    });

    it('should return red for 0-24%', () => {
      expect(getColorForPercentage(10)).toBe('#ff0000');
      expect(getColorForPercentage(0)).toBe('#ff0000');
    });
  });
});
