module.exports = {
    // cacheDirectory: true,
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                targets: { node: 'current' }
            }
        ],
        '@babel/preset-typescript'
    ],
};