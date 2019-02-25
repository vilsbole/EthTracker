module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@api': './api',
          '@assets': './assets',
          '@components': './components',
          '@store': './store',
          '@screens': './screens',
        }
      }]
    ]
  };
};
