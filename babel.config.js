module.exports = function(api) {
  api.cache(true);
  return {
    // 1. presets에는 Expo 기본 설정만 남겨둡니다.
    presets: ['babel-preset-expo','nativewind/babel'],
    
    // 2. plugins 배열 안에 모든 플러그인을 올바른 순서로 넣어줍니다.
    plugins: ['react-native-reanimated/plugin'],
  };
};