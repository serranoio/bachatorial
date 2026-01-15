export type AccentColor = 'coral' | 'gold' | 'peach' | 'bronze' | 'gold-peachy' | 'purple';

export interface AnimatedBackgroundProps {
  accentColor?: AccentColor;
  className?: string;
}

export interface ColorPalette {
  primary: string;
  primary30: string;
  primary50: string;
  secondary: string;
  secondary30: string;
  secondary50: string;
  tertiary: string;
  tertiary30: string;
  tertiary50: string;
  small1: string;
  small1_40: string;
  small2: string;
  small2_40: string;
}
