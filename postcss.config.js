module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    '@csstools/postcss-global-data': {
      files: ['./src/app/globals.css'],
    },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': {
          preserve: true,
        },
      },
    },
  },
};
