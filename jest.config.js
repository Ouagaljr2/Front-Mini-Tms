module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!react-native|react-navigation|@react-navigation|@babel|some-other-library).*/',
    ],
};
