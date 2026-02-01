import { useEffect } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '@/components/screen-container';
import { useCalculation } from '@/lib/calculation-context';
import { getQuoteForPercentage, getColorForPercentage } from '@/lib/compatibility-algorithm';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen() {
  const navigation = useNavigation();
  const colors = useColors();
  const { calculationData, reset } = useCalculation();

  const scaleValue = useSharedValue(0.5);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    if (!calculationData) {
      navigation.goBack();
      return;
    }

    // Animate percentage display
    scaleValue.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
    opacityValue.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });

    // Haptic feedback on result
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [calculationData, scaleValue, opacityValue, navigation]);

  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: opacityValue.value,
    };
  });

  if (!calculationData) {
    return null;
  }

  const quote = getQuoteForPercentage(calculationData.percentage);
  const percentageColor = getColorForPercentage(calculationData.percentage);

  const handleTryAgain = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    reset();
    navigation.goBack();
  };

  const getPercentageDescription = (percentage: number): string => {
    if (percentage >= 90) return 'Perfect Match';
    if (percentage >= 75) return 'Excellent';
    if (percentage >= 50) return 'Good';
    if (percentage >= 25) return 'Possible';
    return 'Unlikely';
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-8 justify-center items-center">
          {/* Result Card */}
          <Animated.View
            style={[
              {
                width: '100%',
                alignItems: 'center',
              },
              scaleAnimatedStyle,
            ]}
          >
            {/* Names Display */}
            <View className="gap-2 mb-6 items-center">
              <Text className="text-lg text-muted">
                {calculationData.name1} × {calculationData.condition}
              </Text>
              <Ionicons name="heart" size={24} color={colors.accent} />
              <Text className="text-lg text-muted">
                {calculationData.name2}
              </Text>
            </View>

            {/* Percentage Circle */}
            <View
              className="rounded-full items-center justify-center mb-6"
              style={{
                width: 200,
                height: 200,
                borderWidth: 3,
                borderColor: percentageColor,
                backgroundColor: colors.surface,
              }}
            >
              <View className="items-center">
                <Text
                  className="font-bold"
                  style={{
                    fontSize: 72,
                    color: percentageColor,
                  }}
                >
                  {calculationData.percentage}
                </Text>
                <Text className="text-foreground font-semibold text-sm">
                  {getPercentageDescription(calculationData.percentage)}
                </Text>
              </View>
            </View>

            {/* Quote */}
            <View className="bg-surface rounded-lg p-4 border border-border mb-8 items-center">
              <Text
                className="text-center font-semibold text-lg"
                style={{ color: percentageColor }}
              >
                {quote}
              </Text>
            </View>
          </Animated.View>

          {/* Disclaimer */}
          <View className="bg-surface rounded-lg p-3 border border-border mb-6 w-full">
            <Text className="text-xs text-muted text-center italic">
              Remember: Real connections are built on trust, communication, and genuine care. 💕
            </Text>
          </View>

          {/* Try Again Button */}
          <Pressable
            onPress={handleTryAgain}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
            className="w-full"
          >
            <View
              className="rounded-lg px-6 py-4 items-center border-2"
              style={{
                borderColor: colors.accent,
                backgroundColor: colors.accent + '20',
              }}
            >
              <Text className="text-accent font-bold text-lg">
                Try Again
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
