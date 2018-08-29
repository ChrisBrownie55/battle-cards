import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from './router';

Vue.use(Vuex);

const gameAPI = Axios.create({
  baseURL: 'https://inspire-server.herokuapp.com/cards',
  timeout: 3000
});

export default new Vuex.Store({
  state: {
    game: {}
  },
  mutations: {
    setGame(state, game) {
      state.game = game;
    }
  },
  actions: {
    async createGame({ commit }, name) {
      if (!name) {
        return;
      }
      try {
        const game = await gameAPI.post('', {
          gameConfig: {
            playerName: name,
            opponents: 1,
            set: Math.floor(Math.random() * 4) + 1
          }
        });
        commit('setGame', game.data);
        router.push('/game');
      } catch (error) {
        console.error(error);
      }
    }
  }
});
