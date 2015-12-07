module.exports = {
    cache: true,

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    resolve: {
        modulesDirectories: [
            'src',
            'src/features',
            'src/services',
            'node_modules',
            'test',
            'shims'
        ],
        extensions: ['', '.js', '.jsx', '.json']
    },

    stats: {
        colors: true
    }
};