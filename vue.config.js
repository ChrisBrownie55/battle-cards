module.exports = {
  lintOnSave: false,
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/battle-cards/'
    : '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,

  pwa: {
    name: 'Battle Cards'
  }
}
