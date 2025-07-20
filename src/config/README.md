# Color System Documentation

## Overview

The SVE Replay application now uses a comprehensive semantic color system that provides better dark mode colors and easier customization. This system replaces the basic gray-based dark mode with a more sophisticated palette using Slate colors and semantic tokens.

## Key Improvements

### 1. Better Dark Mode Colors
- **Old**: Basic gray-800, gray-900, gray-700 palette
- **New**: Sophisticated Slate-based palette with better contrast and visual appeal
- **Background**: Slate 900 (#0F172A) instead of gray-900 (#111827)
- **Surfaces**: Slate 800 (#1E293B) instead of gray-800 (#1f2937)
- **Better contrast ratios** for improved accessibility

### 2. Semantic Color Tokens
Instead of using specific color values, components now use semantic tokens:
- `bg-primary` instead of `bg-white dark:bg-gray-900`
- `text-primary` instead of `text-gray-900 dark:text-white`
- `surface-primary` instead of `bg-white dark:bg-gray-800`

### 3. Configurable System
All colors are defined in `src/config/colors.ts` and can be easily customized without touching individual components.

## Color Categories

### Background Colors
- `bg-primary`: Main page background
- `bg-secondary`: Section backgrounds
- `bg-tertiary`: Subtle backgrounds
- `bg-elevated`: Floating elements

### Surface Colors
- `surface-primary`: Cards and containers
- `surface-secondary`: Secondary cards
- `surface-tertiary`: Subtle surfaces

### Text Colors
- `text-primary`: Main content text
- `text-secondary`: Supporting text
- `text-tertiary`: Subtle text
- `text-inverse`: Text on colored backgrounds
- `text-accent`: Highlighted text

### Border Colors
- `border-primary`: Standard borders
- `border-secondary`: Subtle borders
- `border-accent`: Highlighted borders

### Interactive Colors
- `interactive-primary`: Primary actions (green)
- `interactive-secondary`: Secondary actions (blue)
- `interactive-success`: Success states
- `interactive-warning`: Warning states
- `interactive-danger`: Danger states

### State Colors
- `state-hover`: Hover states
- `state-active`: Active/pressed states
- `state-disabled`: Disabled states
- `state-focus`: Focus states

## Usage Examples

### Before (Old System)
```tsx
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
  <h2 className="text-gray-900 dark:text-white">Title</h2>
  <p className="text-gray-600 dark:text-gray-400">Content</p>
</div>
```

### After (New System)
```tsx
<div className="bg-surface-primary border border-border-primary">
  <h2 className="text-text-primary">Title</h2>
  <p className="text-text-secondary">Content</p>
</div>
```

## Customization

### 1. Modify Colors in `src/config/colors.ts`

```typescript
export const colorPalette = {
  brand: {
    primary: {
      light: '#15A34A', // Your brand green
      dark: '#22C55E',  // Brighter green for dark mode
    },
    // ... other colors
  },
  background: {
    primary: {
      light: '#FFFFFF',
      dark: '#0F172A', // Slate 900 - much better than gray-900
    },
    // ... other backgrounds
  },
  // ... other categories
};
```

### 2. Add New Color Categories

```typescript
export const colorPalette = {
  // ... existing categories
  custom: {
    highlight: {
      light: '#FEF3C7',
      dark: '#92400E',
    },
    special: {
      light: '#DBEAFE',
      dark: '#1E40AF',
    },
  },
};
```

### 3. Update Tailwind Config

Add new semantic tokens to `tailwind.config.ts`:

```typescript
colors: {
  // ... existing colors
  'custom-highlight': 'var(--color-custom-highlight)',
  'custom-special': 'var(--color-custom-special)',
},
```

## Migration Guide

### Step 1: Replace Gray Colors
Replace these patterns in your components:

| Old | New |
|-----|-----|
| `bg-white dark:bg-gray-900` | `bg-bg-primary` |
| `bg-white dark:bg-gray-800` | `bg-surface-primary` |
| `bg-gray-50 dark:bg-gray-900` | `bg-bg-secondary` |
| `bg-gray-100 dark:bg-gray-700` | `bg-surface-secondary` |

### Step 2: Replace Text Colors
| Old | New |
|-----|-----|
| `text-gray-900 dark:text-white` | `text-text-primary` |
| `text-gray-600 dark:text-gray-400` | `text-text-secondary` |
| `text-gray-500 dark:text-gray-500` | `text-text-tertiary` |

### Step 3: Replace Border Colors
| Old | New |
|-----|-----|
| `border-gray-200 dark:border-gray-700` | `border-border-primary` |
| `border-gray-300 dark:border-gray-600` | `border-border-secondary` |

### Step 4: Replace Interactive Colors
| Old | New |
|-----|-----|
| `bg-green-600` | `bg-interactive-primary` |
| `bg-blue-600` | `bg-interactive-secondary` |
| `bg-red-600` | `bg-interactive-danger` |

## Demo

Visit `/colors` to see a live demo of the new color system and compare it with the old gray-based system.

## Benefits

1. **Better Visual Appeal**: Slate colors provide a more sophisticated look
2. **Improved Accessibility**: Better contrast ratios
3. **Easier Maintenance**: Centralized color configuration
4. **Semantic Meaning**: Colors have clear purposes
5. **Consistent Theming**: All components use the same color tokens
6. **Easy Customization**: Change colors in one place

## Technical Details

- Uses CSS Custom Properties (CSS Variables)
- Automatically applied by the ThemeProvider
- Backward compatible with existing gray colors
- Type-safe with TypeScript
- Works with Tailwind's dark mode system

## Troubleshooting

### Colors Not Updating
1. Check that the ThemeProvider is wrapping your app
2. Verify CSS variables are being applied to `:root`
3. Ensure Tailwind config includes the new color tokens

### TypeScript Errors
1. Make sure `src/config/colors.ts` is properly imported
2. Check that color paths match the palette structure
3. Verify type annotations are correct

### Build Issues
1. Clear Tailwind cache: `npx tailwindcss --clear`
2. Restart development server
3. Check for circular imports 