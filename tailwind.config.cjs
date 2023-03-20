/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{js,ts,jsx,tsx}", // New
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "640px",
      md: "767px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'grey': '#716e67',
      'header-divider-color': '#f7edd9',
      'bg-color': '#fff',
      'text-color': '#014C6B',
      'content-text-color': '#231F20',
      'menu-items-text-color': '#373a36',
      'header-bg-color': '#fff',
      'header-cta-bg-color': '#f7edd9',
      'header-text-color': '#231F20',
      'header-cta-text-color': '#373a36',
      'footer-bg-color': '#F7F8F9',
      'footer-text-color': '#828282',
      'footer-link-color': '#231F20',
      'footer-link-hover-color': '#00A9D5',
      'nav-button-text-color': '#f7edd9',
      'nav-button-bg-color': '#373a36',
      'title-text-color': '#215732',
      'coloured-text-color': '#00A9D5',
      'button-border-color': '#014C6B',
      'primary-btn-bg-color': '#014C6B',
      'primary-btn-bg-hover-color': '#CFEBF6',
      'primary-btn-text-color': '#fff',
      'primary-btn-text-hover-color': '#fff',
      'boxed-primary-btn-text-color': '#215732',
      'boxed-primary-btn-bg-color': '#f7edd9',
      'full-bleed-bg-color': '#89a84f',
      'dividing-line-color': '#215732',
      'dietary-requirements-bg-color': '#89a84f',
      'additional-toppings-border-color': '#215732',
      'link-text-color': '#89a84f',
      'search-bg': '#00A9D5',
      'search-text-color': '#fff',
      'search-btn-bg': '#0F425C',
      'search-btn-bg-hover': '#0F425C',
      'location-card-bg': '#CFEBF6',
      'location-card-bg-hover': '#CFEBF6',
      'light-yellow': '#FFECCF',
      'scroll-bar': '#cfebf6',
      'scroll-thumb': '#001F46',
      'tab-content-color': '#115b7a',

    },
    fontFamily: {
      'main-text-font': ['"Gilroy_Alt", Georgia, Arial, sans-serif'],

    },
    extend: {
      backgroundImage: {
        'closeIcon': "url('images/close.svg')",
        'listIcon': "url('images/dot-circle.svg')",
      }
    },
  },
  plugins: [],
};