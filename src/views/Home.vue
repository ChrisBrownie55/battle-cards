<template>
  <main class='home'>
    <form @submit.prevent='newGame'>
      <label for='name'>Enter your name below.</label>
      <input id='name' placeholder='Bob' type='text' v-model='name' name='name' autocomplete='off' required />
      <button type='submit'>New Game</button>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    };
  },
  methods: {
    newGame() {
      this.$store.dispatch('createGame', this.name);
    }
  }
};
</script>

<style scoped lang='scss'>
.home {
  height: 100%;
}
form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}

label {
  margin-bottom: 4rem;
  font-size: 2rem;
  font-weight: bold;
}

input {
  background: none;
  border: none;
  border-bottom: solid #fafafa 1px;
  color: white;
  font-weight: lighter;
  font-size: 1rem;
  width: 13rem;
  padding: 0.5rem;
  text-align: center;

  &:focus {
    outline: none;
  }
  &:valid + button {
    opacity: 1;
  }
}

button {
  background: none;
  color: #eee;
  border: solid 1px var(--vue-green);
  border-radius: 0.2rem;
  padding: 0.3rem 0.75rem;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--vue-green);
  }
  &:focus {
    outline: none;
  }
}
</style>
