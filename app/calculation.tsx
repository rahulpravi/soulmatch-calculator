import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { ScreenContainer } from '@/components/screen-container';
import { useCalculation } from '@/lib/calculation-context';

export default function CalculationScreen() {
  const router = useRouter();
  const { calculationData } = useCalculation();
  const [percent, setPercent] = useState(0);

  // Animation Values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Safety check: If no data, go back
    if (!calculationData) {
      router.back();
      return;
    }

    // 1. Heartbeat Animation (Scale Up & Down)
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 400, easing: Easing.ease }), // Expand
        withTiming(1, { duration: 400, easing: Easing.ease })    // Shrink
      ),
      -1, // Loop forever
      true // Reverse
    );

    // 2. Text Fade Animation
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );

    // 3. Percentage Counter (0% to 100%)
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setPercent(current);
      
      if (current >= 100) {
        clearInterval(interval);
        // Navigate to Result screen after a short delay
        setTimeout(() => {
          router.replace('/result');
        }, 500);
      }
    }, 30); // Speed of counting (Total approx 3 seconds)

    return () => clearInterval(interval);
  }, []);

  // Animated Styles
  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <ScreenContainer>
      <View style={styles.container}>
        
        {/* Pulsing Heart */}
        <Animated.View style={[styles.heartContainer, heartStyle]}>
          <Text style={styles.heartIcon}>❤️</Text>
        </Animated.View>

        {/* Percentage Text */}
        <Text style={styles.percentText}>{percent}%</Text>

        {/* Status Text */}
        <Animated.Text style={[styles.statusText, textStyle]}>
          Analyzing connection...
        </Animated.Text>
        
        <Text style={styles.namesText}>
          {calculationData?.name1} + {calculationData?.name2}
        </Text>

      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a', // Dark background
  },
  heartContainer: {
    marginBottom: 20,
    shadowColor: '#ff007f',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  heartIcon: {
    fontSize: 100, // Big Heart
  },
  percentText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    fontVariant: ['tabular-nums'], // Keeps numbers steady
  },
  statusText: {
    fontSize: 18,
    color: '#38bdf8', // Light Blue
    marginBottom: 30,
    letterSpacing: 1,
  },
  namesText: {
    fontSize: 14,
    color: '#64748b',
    textTransform: 'capitalize',
  }
});
