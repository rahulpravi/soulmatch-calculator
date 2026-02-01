import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function SplashScreen() {
  const router = useRouter();
  const colors = useColors();
  
  const scaleValue = useSharedValue(0.8);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    scaleValue.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
    opacityValue.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    // Navigate to home after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, scaleValue, opacityValue]);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: opacityValue.value,
    };
  });

  return (
    <ScreenContainer className="items-center justify-center" containerClassName="bg-background">
      <View className="flex-1 items-center justify-center">
        {/* Logo Animation */}
        <Animated.View style={logoAnimatedStyle}>
          <View
            className="rounded-full items-center justify-center mb-6"
            style={{
              width: 120,
              height: 120,
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <Text
              className="font-bold"
              style={{
                fontSize: 48,
                color: colors.accent,
              }}
            >
              ♡
            </Text>
          </View>
        </Animated.View>

        {/* App Name */}
        <Text className="text-4xl font-bold text-primary mb-2">
          SoulMatch
        </Text>
        <Text className="text-sm text-muted">
          Calculate Your Connection
        </Text>
      </View>

      {/* Developer Credit at Bottom */}
      <View className="pb-8">
        <Text className="text-xs text-muted text-center" style={{ opacity: 0.5 }}>
          App Developed by Rahul PR
        </Text>
      </View>
    </ScreenContainer>
  );
}
