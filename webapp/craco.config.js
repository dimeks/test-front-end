const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@ui': path.resolve(__dirname, 'src/ui'),
            '@styles': path.resolve(__dirname, 'src/ui/styles'),
            '@theme': path.resolve(__dirname, 'src/theme'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@errors': path.resolve(__dirname, 'src/errors'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@state': path.resolve(__dirname, 'src/state'),
        }
    },
};