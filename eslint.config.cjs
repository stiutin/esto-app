module.exports = (async () => {
  const componentPrefixes = ['app'];
  const baseConfig = await require('./eslint.baseConfig.cjs')(componentPrefixes);

  return [
    ...baseConfig,
    {
      files: ['**/*.ts'],
      rules: {
        '@angular-eslint/prefer-standalone': ['off'],
        '@angular-eslint/prefer-signals': ['off'],
      },
    },
    {ignores: ['**/*.spec.ts']},
  ];
})();
