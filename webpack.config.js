module.exports = {
    // other webpack configuration
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'svg-url-loader'],
        },
      ],
    },
  };