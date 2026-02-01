import { useEffect, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ScreenContainer } from '@/components/screen-container';
import { useCalculation } from '@/lib/calculation-context';
import { useColors } from '@/hooks/use-colors';

const ANIMATION_DURATION = 4000; // 4 seconds

export default function CalculationScreen() {
  const navigation = useNavigation();
  const colors = useColors();
  const { calculationData } = useCalculation();
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const progressValue = useSharedValue(0);

  useEffect(() => {
    if (!calculationData) {
      navigation.goBack();
      return;
    }

    // Animate progress bar
    progressValue.value = withTiming(100, {
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
    });

    // Simulate terminal text scrolling
    const totalSteps = calculationData.steps.length + 3;
    const stepDuration = ANIMATION_DURATION / totalSteps;

    const steps: string[] = [];
    let stepIndex = 0;

    // Initial line
    steps.push('$ soulmatch-calc --calculate');
    steps.push(`> Input: "${calculationData.name1}" + "${calculationData.condition}" + "${calculationData.name2}"`);
    steps.push('> Processing...');

    setDisplayedSteps([...steps]);

    // Add algorithm steps
    const stepInterval = setInterval(() => {
      if (stepIndex < calculationData.steps.length) {
        const step = calculationData.steps[stepIndex];
        const newStep = `> ${step.description}: [${step.array.join(', ')}]`;
        steps.push(newStep);
        setDisplayedSteps([...steps]);
        stepIndex++;
      } else {
        clearInterval(stepInterval);
        // Final result
        setTimeout(() => {
          steps.push(`> Result: ${calculationData.percentage}%`);
          steps.push('$ Complete!');
          setDisplayedSteps([...steps]);
          setIsComplete(true);

          // Auto-navigate to result after animation completes
          setTimeout(() => {
            (navigation as any).navigate('result');
          }, 500);
        }, stepDuration);
      }
    }, stepDuration);

    return () => clearInterval(stepInterval);
  }, [calculationData, navigation, progressValue]);

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  return (
    <ScreenContainer className="p-6" containerClassName="bg-black">
      <View className="flex-1 gap-4">
        {/* Terminal Header */}
        <View className="border-b border-terminal pb-2">
          <Text className="text-terminal font-mono text-xs">
            SoulMatch Terminal v1.0
          </Text>
        </View>

        {/* Terminal Output */}
        <ScrollView className="flex-1 bg-black rounded">
          <View className="p-3 gap-1">
            {displayedSteps.map((step, index) => (
              <Text
                key={index}
                className="text-terminal font-mono text-xs leading-relaxed"
              >
                {step}
              </Text>
            ))}
            {isComplete && (
              <Text className="text-terminal font-mono text-xs mt-2">
                ▌
              </Text>
            )}
          </View>
        </ScrollView>

        {/* Progress Bar */}
        <View className="gap-2">
          <View className="bg-surface rounded-full h-2 overflow-hidden border border-border">
            <Animated.View
              style={[
                {
                  height: '100%',
                  backgroundColor: colors.primary,
                  borderRadius: 999,
                },
                progressAnimatedStyle,
              ]}
            />
          </View>
          <Text className="text-xs text-muted text-center">
            Calculating compatibility...
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
