/**
 * Centralized styles entry point for Bachatorial theme
 *
 * This file imports all CSS files directly to ensure they are bundled
 * with the theme code and work consistently in both development and production builds.
 *
 * Following RSPress theme best practices:
 * - CSS must be imported in TypeScript/JavaScript files, not via @import in CSS
 * - This ensures proper bundling and consistent behavior across build modes
 */

// Design System - Core variables, colors, typography, spacing, animations
import '../docs/public/design-system.css';

// Global Theme - RSPress-specific overrides for navigation, content, etc.
import '../docs/public/global-theme.css';

// Shared Styles - Common styles for story components
import './shared-styles.css';
