module.exports = {
  presets: ['react-native'],
  plugins: ['transform-decorators-legacy'],
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
};
