<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  --vue-green: #42b983;
  --vue-black: #2c3e50;
  --vue-black-dark: #222f3d;
  margin: 0;
  background-color: var(--vue-black-dark);
  color: white;
  overflow: hidden;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
