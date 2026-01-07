import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Bachatorial',
  description: 'Embrace',
  icon: '/rspress-icon.png',
  logoText: 'Bachatorial',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
  head: [
    // Design System CSS
    ['link', { rel: 'stylesheet', href: '/design-system.css' }],
    // OpenGraph meta tags for social media sharing
    ['meta', { property: 'og:title', content: 'Bachatorial' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Embrace life thru a bachata dance lesson',
      },
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://bachatorial.com/logo.png' },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://bachatorial.com' }],
    // Twitter Card meta tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Bachatorial' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: 'Embrace life thru a bachata dance lesson',
      },
    ],
    [
      'meta',
      { name: 'twitter:image', content: 'https://bachatorial.com/logo.png' },
    ],
  ],
  themeConfig: {},
});
