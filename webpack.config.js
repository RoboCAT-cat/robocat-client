module.exports = {
  devServer: {
    proxy: {
      '/_': 'http://localhost:8000'
    }
  }
};
