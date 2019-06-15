var path = require('path');

module.exports = {
    entry: './test.js',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '/twcheese': '../'
        }
    },
    optimization: {
        minimize: false
    }
};