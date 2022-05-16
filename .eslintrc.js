module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {
        parser: 'babel',
        trailingComma: 'none',
        arrowParens: 'avoid'
      }
    ],
    'comma-dangle': 'off',
    'react-hooks/exhaustive-deps': 0
  }
};
