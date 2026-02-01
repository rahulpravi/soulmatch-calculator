import { ScrollView, Text, View, Pressable, Switch } from 'react-native';
import { useNavigation } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useThemeContext } from '@/lib/theme-provider';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const colors = useColors();
  const { colorScheme, setColorScheme } = useThemeContext();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const handleThemeToggle = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsDarkMode(value);
    const newTheme = value ? 'dark' : 'light';
    setColorScheme(newTheme);
  };

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-primary">Settings</Text>
        <Pressable onPress={handleBackPress} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Ionicons name="close" size={24} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Theme Toggle Section */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center gap-3 flex-1">
                <Ionicons
                  name={isDarkMode ? 'moon' : 'sunny'}
                  size={20}
                  color={colors.primary}
                />
                <Text className="text-foreground font-semibold flex-1">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={isDarkMode ? colors.accent : colors.muted}
              />
            </View>
            <Text className="text-xs text-muted">
              Switch between dark and light themes
            </Text>
          </View>

          {/* How It Works Section */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="help-circle" size={20} color={colors.primary} />
              <Text className="text-foreground font-semibold">How It Works</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              We take the names + the relationship keyword, count the letters, and pyramid-add the numbers from ends to center until 2 digits remain. This final 2-digit number is your compatibility percentage.
            </Text>
            <View className="mt-3 bg-background rounded p-3">
              <Text className="text-xs text-muted font-mono">
                Example:{'\n'}
                Names: "Alice" + "Love" + "Bob"{'\n'}
                Character counts: [1, 1, 1, 1, 1, 1, 1, 1, 1]{'\n'}
                Pyramid reduction: [2, 2, 2, 2, 1]{'\n'}
                ... → Final: 75%
              </Text>
            </View>
          </View>

          {/* Disclaimer Section */}
          <View className="bg-surface rounded-lg p-4 border border-highlight">
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="warning" size={20} color={colors.highlight} />
              <Text className="text-highlight font-semibold">Important Disclaimer</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              This app is purely for entertainment purposes. The results are generated based on a character-counting algorithm and do not reflect real-life relationships or human emotions. Values in names do not define the value of hearts.
            </Text>
            <Text className="text-xs text-muted mt-3 italic">
              Have fun, but remember: real connections are built on trust, communication, and genuine care. 💕
            </Text>
          </View>

          {/* About Section */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="information-circle" size={20} color={colors.primary} />
              <Text className="text-foreground font-semibold">About</Text>
            </View>
            <Text className="text-xs text-muted">
              SoulMatch Calculator v1.0.0{'\n'}
              Calculate Your Connection
            </Text>
          </View>

          {/* Developer Credit */}
          <View className="items-center pt-4">
            <Text className="text-xs text-muted" style={{ opacity: 0.6 }}>
              App Developed by Rahul PR
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
