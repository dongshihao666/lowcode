module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader"
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader"
        },
      ],
    },
  },
};
