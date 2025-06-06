module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss/nesting',
    'tailwindcss',
    ['autoprefixer', { grid: true }],
    ...(process.env.NODE_ENV === 'production' ? ['cssnano'] : []),
  ],
};
