<template>
  <main class='game'>
    <div :class='{ "game-wrapper": true, over: over }' v-if='!over'>
      <details class='settings'>
        <summary>Settings</summary>
        <button class='quit' @click='quit'>End game</button>
      </details>
      <section class='cards opponent'>
        <Card v-for='(cardData, index) in opponent.hand' :key='index' :cardData='cardData' @selected='selectOpponent' :selected='opponentCard === cardData.id' :dying='cardData.dead' />
        <h4 class='name'>
          <div>{{opponent.name}}</div>
        </h4>
      </section>
      <button :class='{ play: true, visible: playerCard && opponentCard }' :disabled='!playerCard || !opponentCard' @click='fight'>FIGHT</button>
      <section class='cards player'>
        <Card v-for='(cardData, index) in player.hand' :key='index' :cardData='cardData' :selected='playerCard === cardData.id' @selected='selectPlayer' :dying='cardData.dead' isPlayerCard />
        <h4 class='name'>
          <div>{{player.name}}</div>
        </h4>
      </section>
    </div>
    <div class='game-over-notifications' v-else>
      <div v-if='winner === "Cats Game"'>
        <h1 class='winner-title'>Tie Game</h1>
        <svg viewBox="0 0 496 512" class='sad'>
          <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"></path>
        </svg>
      </div>
      <div v-else>
        <h1 class='winner-title'>The Winner Is</h1>
        <h1 class='winner-name'>{{winner.name}}</h1>
      </div>
    </div>
  </main>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Game',
  components: {
    Card
  },
  mounted() {
    if (!this.$store.state.game.players) {
      this.$store.dispatch('getGame', this.$route.params.gameId);
    }
  },
  methods: {
    selectOpponent(id) {
      this.$store.dispatch('selectOpponent', id);
    },
    selectPlayer(id) {
      this.$store.dispatch('selectPlayer', id);
    },
    fight() {
      this.$store.dispatch('fight');
    },
    quit() {
      this.$store.dispatch('deleteGame');
    }
  },
  computed: {
    game() {
      return this.$store.state.game;
    },
    opponent() {
      if (!this.$store.state.game.players) {
        return {};
      }
      return this.$store.state.game.players[1];
    },
    player() {
      if (!this.$store.state.game.players) {
        return {};
      }
      return this.$store.state.game.players[0];
    },
    playerCard() {
      return this.$store.state.playerCard;
    },
    opponentCard() {
      return this.$store.state.opponentCard;
    },
    over() {
      return this.$store.state.game.over;
    },
    winner() {
      return this.$store.state.game.winner;
    }
  }
};
</script>

<style scoped lang='scss'>
.game {
  height: 100%;

  .game-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    transition: opacity 0.3s;
    &.over {
      opacity: 0;
    }
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &.player .name {
    order: -1;
  }

  .name {
    width: 100%;
    margin: 0;
    font-size: 2rem;
    font-weight: normal;
    display: block;

    & > div {
      transition: opacity 0.2s;
      display: inline-block;
      opacity: 0.5;
      margin: 0 auto;
      &:hover {
        opacity: 1;
      }
    }
  }
}

.play {
  width: 5rem;
  height: 2rem;
  margin: 0 auto;
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
  pointer-events: none;

  &.visible {
    pointer-events: unset;
    opacity: 1;
  }
}

.settings {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 6rem;
  padding: 0.5rem;
  border-radius: 0.15rem;
  z-index: 2;
  background-color: rgba(#2c3e50, 0.8);

  transition: height 0.2s;
  height: 1.35rem;
  &[open] {
    height: 4rem;
  }
  &[open] > *:not(summary) {
    animation: fade-in 0.2s 0.2s;
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  summary {
    user-select: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
    &:focus {
      outline: none;
    }
  }
}

.game-over-notifications {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fade-in 0.3s, fade-in 0.3s 2.3s reverse forwards;

  & > div {
    display: flex;
    flex-direction: column;
  }
}

.sad {
  color: white;
  fill: white;
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
}
</style>