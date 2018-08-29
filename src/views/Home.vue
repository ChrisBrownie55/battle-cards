<template>
  <main class='home'>
    <form @submit.prevent='newGame'>
      <label for='name'>Enter your name below.</label>
      <input id='name' placeholder='Bob' type='text' v-model='name' name='name' autocomplete='off' required />
      <button type='submit' :disabled='creatingGame'>New Game</button>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      name: '',
      creatingGame: false
    };
  },
  methods: {
    async newGame() {
      this.creatingGame = true;
      await this.$store.dispatch('createGame', this.name);
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
  opacity: 0;
}
</style>
