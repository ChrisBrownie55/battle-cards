import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from './router';

Vue.use(Vuex);

const gameAPI = Axios.create({
  baseURL: 'https://inspire-server.herokuapp.com/cards/',
  timeout: 3000
});

export default new Vuex.Store({
  state: {
    game: {},
    opponentCard: '',
    playerCard: ''
  },
  mutations: {
    setGame(state, game) {
      state.game = game;
    },
    selectPlayerCard(state, id) {
      state.playerCard = id;
    },
    selectOpponentCard(state, id) {
      state.opponentCard = id;
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
        router.push({
          name: 'game',
          params: { gameId: game.data.id }
        });
      } catch (error) {
        console.error(error);
      }
    },

    selectOpponent({ commit, state }, id) {
      if (!id) {
        return;
      }
      commit('selectOpponentCard', state.opponentCard === id ? '' : id);
    },
    selectPlayer({ commit, state }, id) {
      if (!id) {
        return;
      }
      commit('selectPlayerCard', state.playerCard === id ? '' : id);
    },

    async fight({ commit, state }) {
      if (!state.playerCard || !state.opponentCard || !state.game.players) {
        return;
      }
      try {
        await gameAPI.put(state.game.id, {
          playerId: state.game.players[0].id,
          opponentId: state.game.players[1].id,
          playerCardId: state.playerCard,
          opponentCardId: state.opponentCard
        });
        const game = await gameAPI.get(state.game.id);
        commit('setGame', game.data.data);
        commit('selectPlayerCard', '');
        commit('selectOpponentCard', '');
      } catch (error) {
        console.error(error);
      }
    },

    async getGame({ dispatch, commit }, gameId) {
      try {
        const game = await gameAPI.get(gameId);
        commit('setGame', game.data.data);
        if (game.data.data.over) {
          setTimeout(() => dispatch('deleteGame'), 2600);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteGame({ commit, state }) {
      if (!state.game.id) {
        return;
      }
      try {
        await gameAPI.delete(state.game.id);
        commit('setGame', {});
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
});
