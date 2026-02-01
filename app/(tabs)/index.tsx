import { useState } from 'react';
import { ScrollView, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '@/components/screen-container';
import { useCalculation } from '@/lib/calculation-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';

const RELATIONSHIP_CONDITIONS = [
  'Love',
  'Friend',
  'Bestie',
  'Hate',
  'Marriage',
  'Trust',
  'Crush',
];

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const colors = useColors();
  const { calculate } = useCalculation();
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('Love');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    // Validate inputs
    if (!name1.trim() || !name2.trim()) {
      Alert.alert('Missing Input', 'Please enter both names');
      return;
    }

    try {
      setIsLoading(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      // Calculate compatibility
      await calculate(name1.trim(), selectedCondition, name2.trim());
      
      // Navigate to calculation screen
      (navigation as any).navigate('calculation');
    } catch (error) {
      Alert.alert('Error', 'Failed to calculate compatibility');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    (navigation as any).navigate('settings');
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header with Settings */}
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold text-primary">SoulMatch</Text>
            <Pressable
              onPress={handleSettingsPress}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Ionicons name="settings" size={24} color={colors.primary} />
            </Pressable>
          </View>

          {/* Tagline */}
          <Text className="text-sm text-muted text-center">
            Calculate Your Connection
          </Text>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Name 1 Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Person 1 Name</Text>
            <TextInput
              value={name1}
              onChangeText={setName1}
              placeholder="Enter name"
              placeholderTextColor={colors.muted}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              editable={!isLoading}
            />
          </View>

          {/* Condition Dropdown */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Relationship</Text>
            <Pressable
              onPress={() => setShowDropdown(!showDropdown)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                },
              ]}
              disabled={isLoading}
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-foreground font-medium">{selectedCondition}</Text>
                <Ionicons
                  name={showDropdown ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.primary}
                />
              </View>
            </Pressable>

            {/* Dropdown Menu */}
            {showDropdown && (
              <View className="bg-surface border border-primary rounded-lg overflow-hidden mt-1">
                {RELATIONSHIP_CONDITIONS.map((condition) => (
                  <Pressable
                    key={condition}
                    onPress={() => {
                      setSelectedCondition(condition);
                      setShowDropdown(false);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.7 : 1,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor:
                          selectedCondition === condition
                            ? colors.primary + '20'
                            : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      className={
                        selectedCondition === condition
                          ? 'text-primary font-semibold'
                          : 'text-foreground'
                      }
                    >
                      {condition}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Name 2 Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Person 2 Name</Text>
            <TextInput
              value={name2}
              onChangeText={setName2}
              placeholder="Enter name"
              placeholderTextColor={colors.muted}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              editable={!isLoading}
            />
          </View>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Calculate Button */}
          <Pressable
            onPress={handleCalculate}
            disabled={isLoading}
            style={({ pressed }) => [
              {
                opacity: isLoading ? 0.6 : pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View
              className="bg-gradient-to-r rounded-lg px-6 py-4 items-center"
              style={{
                backgroundColor: colors.accent,
              }}
            >
              <Text className="text-background font-bold text-lg">
                {isLoading ? 'Calculating...' : 'Calculate Match'}
              </Text>
            </View>
          </Pressable>

          {/* Disclaimer Footer */}
          <Text className="text-xs text-muted text-center">
            For entertainment purposes only
          </Text>

          {/* Developer Credit */}
          <Text className="text-xs text-muted text-center" style={{ opacity: 0.5 }}>
            App Developed by Rahul PR
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
