/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        'primary': '#A6E2E2',
        'secondary' : '#3B58BE',
        'success' : '#73CA5C',
        'error': '#FA2C5A',
        'info': '#09A6FF'
      },
      borderRadius: {
        'large': '3.5rem'
      },
      letterSpacing: {
        'widest': '0.235em'
      },
      translate: {
        '-50%' : '-50%, -50%'
      },
      height: {
        '100': '33rem'
      }

    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

