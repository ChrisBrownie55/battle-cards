<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view />
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

button {
  background: none;
  color: #eee;
  border: solid 1px var(--vue-green);
  border-radius: 0.2rem;
  padding: 0.3rem 0.75rem;
  margin-top: 1rem;
  transition: opacity 0.2s, background-color 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: var(--vue-green);
  }
  &::after {
    content: '';
    border: solid 0rem;
    border-color: var(--vue-green);
    opacity: 0.5;
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: border-width 0.2s;
  }
  &:focus {
    background-color: var(--vue-green);
    outline: none;
    &::after {
      border-width: 0.3rem 0.3rem;
    }
  }
}
</style>
