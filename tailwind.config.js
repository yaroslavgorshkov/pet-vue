/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,vue,ts}", // Добавляем путь к твоей папке app
    "./app.vue",              // Если вдруг вынесешь его обратно
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

