<template>
  <main class='home'>
    <div class='logo'>
      <svg class='cards' xmlns="http://www.w3.org/2000/svg" viewBox="6.35532808303833 11.574420928955078 83.5102767944336 75.56097412109375">
        <path fill='currentColor' d="M79.284,11.575l-26.694,0.3c-1.851,0.021-3.636,0.565-5.169,1.534l-12.344,3.357c-0.046,0.013-0.092,0.027-0.137,0.043   l-4.215,1.464l-0.002-0.004l-0.022,0.012l-0.485,0.168c-1.197,0.416-2.288,1.053-3.228,1.867l-3.631,1.99l-2.49,1.387l-0.04-0.054   l-0.396,0.297l-1.217,0.677c-1.076,0.6-2.02,1.391-2.794,2.325l-6.303,4.717c-0.018,0.013-0.034,0.026-0.051,0.04   c-2.062,1.648-3.357,4-3.649,6.621c-0.288,2.594,0.439,5.146,2.051,7.194l25.596,37.792c0.029,0.043,0.062,0.086,0.095,0.128   c2.007,2.511,4.998,3.78,7.986,3.702c2.064-0.055,4.127-0.752,5.864-2.131l7.094-5.229l8.012-1.512l4.088-0.767l-0.021,0.32   l12.929,0.358c0.052-0.002,0.102-0.003,0.154-0.004c5.361-0.141,9.66-5.125,9.6-10.491L89.28,21.594   C89.219,16.147,84.731,11.515,79.284,11.575z M28.346,24.97c0.273-0.499,0.617-0.949,1.015-1.341l2.988-1.638l1.491-0.518   c-0.788,1.802-1.033,3.817-0.666,5.776l7.825,45.08l-13.03-42.562c-0.007-0.024-0.015-0.047-0.023-0.072   C27.405,28.139,27.551,26.417,28.346,24.97z M42.822,21.866l0.508,40.243l-6.174-35.565c-0.002-0.01-0.004-0.02-0.006-0.03   c-0.302-1.603,0.086-3.272,1.065-4.58c0.875-1.169,2.149-1.963,3.586-2.234l1.286-0.242C42.902,20.238,42.812,21.044,42.822,21.866   z M23.634,26.783c-0.144,1.405,0.011,2.84,0.479,4.202l13.082,42.733L18.978,36.185c-0.017-0.034-0.035-0.068-0.053-0.101   c-0.815-1.464-0.961-3.212-0.397-4.795c0.184-0.517,0.438-1,0.752-1.438l3.356-2.512L23.634,26.783z M11.679,43.051   c-0.974-1.217-1.414-2.739-1.241-4.287c0.17-1.538,0.928-2.918,2.131-3.891l1.59-1.189c0.065,1.497,0.469,2.975,1.204,4.314   l17.951,36.985l-21.54-31.803C11.743,43.136,11.712,43.093,11.679,43.051z M85.807,67.224c0.035,3.168-2.51,5.813-5.675,5.896   l-26.788,0.304c-3.217,0.035-5.863-2.553-5.899-5.771l-0.578-45.834c-0.015-1.289,0.385-2.516,1.154-3.547   c0.103-0.141,0.209-0.271,0.312-0.387c1.085-1.223,2.58-1.92,4.21-1.963l26.787-0.302c3.217-0.036,5.864,2.552,5.899,5.771   L85.807,67.224z"></path>
      </svg>
      <h1 class='text'>Battle Cards</h1>
    </div>
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
<style lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;

  .cards {
    height: 6rem;
    margin-top: 0.5rem;
    margin-right: 1.25rem;
  }
  .text {
    font-size: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
  }
}
</style>

<style scoped lang='scss'>
.logo {
  position: absolute;
  top: 50%;
  left: 50%;

  animation: fade-from-top 2.3s forwards cubic-bezier(0.445, 0.05, 0.55, 0.95);

  @keyframes fade-from-top {
    from {
      opacity: 0;
      transform: translateY(-250%) translateX(-50%);
    }
    50% {
      opacity: 1;
      transform: translateY(-50%) translateX(-50%);
    }
    to {
      opacity: 0;
      transform: translateY(-50%) translateX(-50%);
    }
  }

  .cards,
  .text {
    color: rgba(255, 255, 255, 0.35);
  }
}
.home {
  height: 100%;
}
form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  animation: fade-in 0.5s 2.3s forwards cubic-bezier(0.445, 0.05, 0.55, 0.95);
  opacity: 0;

  @keyframes fade-in {
    to {
      opacity: 1;
    }
  }
}

label {
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: 600;
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
  transition: background-color 0.2s;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  &::placeholder {
    transition: color 0.2s;
    color: rgba(white, 0.3);
  }
  &:focus {
    outline: none;
    background-color: var(--vue-black);
    &::placeholder {
      color: transparent;
    }
  }
  & + button {
    pointer-events: none;
  }
  &:valid + button {
    opacity: 1;
    pointer-events: unset;
  }
}

button {
  opacity: 0;
}
</style>
