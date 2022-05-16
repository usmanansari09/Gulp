module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true
      }
    ],
    'import-glob',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '/index.ts',
          '/index.tsx',
          '/index.js',
          '/index.jsx',
          '.json',
          ''
        ],
        alias: {
          Theme: './src/theme',
          Store: './src/store',
          Services: './src/services',
          Scenes: './src/scenes',
          Navigators: './src/navigators',
          Components: './src/components',
          Config: './src/config',
          Assets: './src/assets',
          Hooks: './src/hooks'
        }
      }
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg']
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
