//Konfiguracja Webpack


module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "app.js",
        path: __dirname + "/docs"
    },
    module: {
        rules: [
            {

                test: /.jsx?/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"]
                }
            }
        ]
    }
}