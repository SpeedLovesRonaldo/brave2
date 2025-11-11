# Design Guidelines for areyoureally.brave

## Design Approach
**Reference-Based**: Brave browser branding with modern, bold, slightly playful aesthetic. Minimal clutter with strategic microanimations.

## Color Palette (Exact Specifications)
- **Brave Orange/Accent**: `#FB542B` (primary CTA, focus states)
- **Deep Navy**: `#071023` (hero gradient start)
- **Midnight Blue**: `#0B1220` (hero gradient end)
- **Card/Surface**: `#0F1724`
- **Muted Teal**: `#8EF3C5` (sparingly for accents)
- **Text Primary**: `#E6F0EF`
- **Text Secondary**: `#C9E8DF`
- **Borders/Dividers**: `rgba(255,255,255,0.06)`

## Typography
- **Font Stack**: `'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`
- **H1**: 34px desktop / 28px mobile
- **H2**: 20-22px
- **Body**: 16px desktop / 15px mobile
- **Line Height**: 1.45
- **CTA Buttons**: Font-weight 600

## Layout System
- **Hero Card**: Centered, max-width 900px
- **Padding**: 28px desktop / 18px mobile
- **Border Radius**: 14-16px on cards
- **Spacing Units**: Use Tailwind units of 4, 6, 8 for consistent rhythm
- **Drop Shadow**: `0 8px 30px rgba(2,6,23,0.6)`

## Hero Section
- **Background**: Diagonal gradient `linear-gradient(135deg, #071023 0%, #0B1220 60%)`
- **Enhancement**: Subtle noise overlay or animated star particles (low CPU)
- **No Hero Image**: Focus on gradient + particles for depth
- **Content**: H1 "Are You Really Brave?", intro paragraph, immediate quiz entry point

## Component Library

### Buttons
**Primary CTA**:
- Fill: `#FB542B`
- Text: White
- Border-radius: 10px
- Padding: 12px 18px
- Font-weight: 600
- Hover: `translateY(-2px)` + increased box-shadow

**Secondary (Ghost)**:
- Transparent background
- Border: `1px solid rgba(255,255,255,0.08)`
- Same hover treatment

### Quiz Interface
- **Progress Indicator**: Visible "Question X of 4" text + progress bar
- **Question Cards**: Use card surface color `#0F1724`
- **Multiple Choice Options**: Clear hover states, selected state uses orange accent
- **Transitions**: Slide/fade between questions (0.3s ease)

### Result Display
- **Score Badge**: Large, centered, animated reveal
- **Tier Badges**: 
  - 7-8: "Brave Legend"
  - 5-6: "Bold Spirit"
  - 3-4: "Curious & Cautious"
  - 0-2: "Cautious Starter"
- **Animation**: Pulse effect + subtle confetti for high scores
- **Badge SVG**: Prominent display with glow effect

### Wallet Connection
- **Connected State**: Show shortened address in header/card
- **Connect Button**: Primary CTA style when disconnected
- **Status Indicator**: Clear visual feedback for connection state

### IPFS Section
- **CID Display**: Monospace font, copyable field
- **Preview Link**: Secondary button style
- **Upload Status**: Loading state with progress indication

## Animations & Microinteractions
- **Global Transition**: `all 0.18s ease` on interactive elements
- **Quiz Transitions**: 0.3s slide/fade between questions
- **Result Reveal**: Pulse + subtle confetti (high scores only)
- **Button Hovers**: Smooth lift effect
- **Keep Minimal**: Animations should enhance, not distract

## Accessibility
- **Keyboard Navigation**: All quiz inputs tabbable
- **Focus Ring**: `outline: 3px solid rgba(251,84,43,0.22)`
- **ARIA Live Region**: Dynamic result announcements
- **Color Contrast**: All text meets WCAG AA standards
- **Mobile Touch Targets**: Minimum 44px tap areas

## Content Sections (Order)

1. **Hero/Quiz Entry**: Gradient background, H1, intro copy, start button
2. **Quiz Interface**: 4 questions with progress tracking
3. **Results Display**: Score, badge, personalized message
4. **Wallet Connect/Mint**: Demo mint flow with clear CTAs
5. **IPFS Snapshot**: Save result section with CID display
6. **How It Uses .brave**: Short explanation section with key benefits
7. **Footer**: Links to vibecheck.brave, highkey.brave, sigmaboy.brave + contest disclosure

## Responsive Strategy
- **Mobile (<768px)**: Single column, larger touch targets, stacked layout
- **Desktop (≥768px)**: Centered card layout, more generous spacing
- **All Viewports**: Quiz remains centered and focused, no distracting sidebars

## Images
**No traditional hero image required**. The design relies on:
- Diagonal gradient background with depth
- Subtle animated particles/stars
- Badge SVG for results display
- Keep visual focus on interactive quiz flow