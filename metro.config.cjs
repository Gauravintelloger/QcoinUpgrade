const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
    resolver: { sourceExts, assetExts }
} = defaultConfig;

const config = {
    resolver: {
        // Keep your existing extensions
        assetExts: [...assetExts, 'png', 'jpg', 'jpeg'],
        sourceExts: [...sourceExts],

        // ← This is the important part
        unstable_conditionNames: ['browser', 'require', 'react-native', 'default'],
        // Alternative ordering that sometimes works even better:
        // unstable_conditionNames: ['require', 'react-native', 'browser', 'default'],
    },
};

module.exports = mergeConfig(defaultConfig, config);