# SoulMatch Calculator - Mobile App Design

## Overview
A relationship compatibility calculator with a neon dark theme and terminal-style calculation animations. The app uses a pyramid addition algorithm to generate a compatibility percentage based on names and relationship conditions.

## Design Philosophy
- **Primary Aesthetic:** Dark mode with neon accents (Hacker/Terminal vibe)
- **Typography:** Modern sans-serif for UI; Monospace for terminal screens
- **Interaction:** Smooth transitions, haptic feedback on key actions
- **Accessibility:** Clear error states, readable contrast ratios

## Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|----------|-------|
| Primary | #0a7ea4 | #00d4ff | Neon Blue accents |
| Accent | #ff1493 | #ff1493 | Deep Pink highlights |
| Highlight | #ff0000 | #ff6b6b | Vibrant Red accents |
| Background | #ffffff | #0a0e27 | Screen background |
| Surface | #f5f5f5 | #1a1f3a | Card/elevated surfaces |
| Foreground | #11181c | #ecedee | Primary text |
| Muted | #687076 | #9ba1a6 | Secondary text |
| Terminal | N/A | #00ff00 | Terminal text (dark mode only) |

## Screen List

### 1. Splash Screen
- **Content:** SoulMatch logo (neon blue/pink gradient)
- **Duration:** 2 seconds, then auto-navigate to Home
- **Purpose:** Brand introduction

### 2. Home Screen
- **Primary Content:**
  - Input field: "Person 1 Name"
  - Dropdown selector: "Relationship Condition" (Love, Friend, Bestie, Hate, Marriage, Trust, Crush)
  - Input field: "Person 2 Name"
  - Large gradient button: "Calculate Match"
  - Settings icon (top-right corner)
- **Functionality:**
  - Validate inputs (non-empty names)
  - Show error toast if inputs invalid
  - Navigate to Calculation screen on valid submit
- **Layout:** Portrait, centered, with spacing for comfortable one-handed use

### 3. Calculation Screen
- **Primary Content:**
  - Black terminal background
  - Scrolling code-like text showing algorithm steps (green/blue text)
  - Progress bar (0-100%) animating over 3-5 seconds
  - Matrix-style visual effect
- **Functionality:**
  - Execute algorithm in real-time, displaying steps
  - Auto-navigate to Result screen when complete
- **Duration:** 3-5 seconds

### 4. Result Screen
- **Primary Content:**
  - Large percentage display (e.g., "75%")
  - Fun quote based on percentage range
  - "Try Again" button (returns to Home)
- **Quote Ranges:**
  - 90-100%: "Made in Heaven!"
  - 75-89%: "Perfect Match!"
  - 50-74%: "Good Vibes!"
  - 25-49%: "It Could Work..."
  - 0-24%: "Run Away!"
- **Layout:** Centered, bold typography, celebratory colors

### 5. Settings Screen
- **Primary Content:**
  - Theme toggle (Dark/Light mode)
  - "How It Works" section (static text explaining pyramid addition)
  - Disclaimer section (prominent, red/pink text)
  - Back button or gesture to return to Home
- **Functionality:**
  - Theme toggle persists to AsyncStorage
  - Read-only information sections

## Key User Flows

### Flow 1: Calculate Compatibility
1. User lands on Home screen
2. Enters "Person 1 Name" (e.g., "Alice")
3. Selects relationship condition from dropdown (e.g., "Love")
4. Enters "Person 2 Name" (e.g., "Bob")
5. Taps "Calculate Match" button
6. Transitions to Calculation screen with terminal effect
7. Algorithm runs for 3-5 seconds, displaying steps
8. Auto-navigates to Result screen
9. Displays percentage and fun quote
10. User taps "Try Again" to return to Home

### Flow 2: Access Settings
1. From Home screen, tap Settings icon (top-right)
2. Navigate to Settings screen
3. View theme toggle, "How It Works", and disclaimer
4. Toggle theme if desired (persists)
5. Tap back to return to Home

### Flow 3: Error Handling
1. User attempts to calculate without entering names
2. Toast error appears: "Please enter both names"
3. Focus returns to first input field
4. User corrects and retries

## Animation & Interaction Details

### Transitions
- **Home → Calculation:** Fade + slide-up animation (200ms)
- **Calculation → Result:** Fade-in animation (300ms)
- **Result → Home:** Slide-down animation (200ms)

### Terminal Effect (Calculation Screen)
- Green/blue monospace text scrolling from top to bottom
- Each algorithm step displayed as a line of "code"
- Progress bar fills smoothly over 3-5 seconds
- Matrix-style background (optional: subtle rain effect)

### Button Feedback
- Primary buttons: Scale 0.97 on press + haptic feedback
- Secondary buttons: Opacity 0.7 on press
- Dropdown: Opacity 0.6 on press

## Branding

### Logo
- **Style:** Neon gradient (Blue → Pink)
- **Shape:** Geometric, modern, app-launcher friendly
- **Usage:** Splash screen, app icon, favicon

### App Name
- **Display Name:** "SoulMatch"
- **Slug:** soulmatch-calculator
- **Tagline:** "Calculate Your Connection"

## Accessibility Considerations

- **Color Contrast:** All text meets WCAG AA standards
- **Touch Targets:** Minimum 48x48 pt for interactive elements
- **Typography:** Clear hierarchy with readable font sizes
- **Error States:** Visual + text feedback (not color-only)
- **Theme Support:** Respects system dark/light preference on first launch

## Technical Notes

- **State Management:** React Context + AsyncStorage for theme persistence
- **Animation Library:** React Native Reanimated for smooth transitions
- **Algorithm:** Pure JavaScript, no external dependencies
- **Platform Support:** iOS, Android, Web (via Expo)
