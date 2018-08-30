<template>
  <main class='game'>
    <div :class='{ "game-wrapper": true, over: over }'>
      <details class='settings'>
        <summary>Settings</summary>
        <button class='quit' @click='quit'>End game</button>
      </details>
      <section class='cards opponent'>
        <h4 class='name'>{{opponent.name}}</h4>
        <Card v-for='(cardData, index) in opponent.hand' :key='index' :cardData='cardData' @selected='selectOpponent' :selected='opponentCard === cardData.id' />
      </section>
      <button class='play' v-if='playerCard && opponentCard' @click='fight'>FIGHT</button>
      <section class='cards player'>
        <h4 class='name'>{{player.name}}</h4>
        <Card class='card' v-for='(cardData, index) in player.hand' :key='index' :cardData='cardData' :selected='playerCard === cardData.id' @selected='selectPlayer' isPlayerCard />
      </section>
    </div>
    <div class='game-over-notifications' v-if='over'>
      <div v-if='winner === "Cats Game"'>
        <h1 class='winner-title'>Tie Game</h1>
        <div class='sad'>
          <i></i>
        </div>
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

  &.opponent .name {
    order: 5;
    transform-origin: center;
    transform: rotate(180deg);
  }

  .name {
    width: 100%;
    margin: 0;
    font-size: 2rem;
    font-weight: normal;
    opacity: 0.75;
    transition: opacity 0.2s;
    &:hover {
      opacity: 1;
    }
  }
}

.play {
  width: 5rem;
  height: 2rem;
  margin: 0 auto;
}

.settings {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 10rem;

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

.sad.icon {
  color: #000;
  position: absolute;
  margin-left: 2px;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: solid 1px currentColor;
}

.sad.icon:before {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  border: solid 1px currentColor;
}

.sad.icon:after {
  content: '';
  position: absolute;
  right: 3px;
  top: 3px;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  border: solid 1px currentColor;
}

.sad.icon i {
  position: absolute;
  left: 3px;
  top: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border-bottom: solid 1px transparent;
  border-top: solid 1px currentColor;
  border-left: solid 1px transparent;
  border-right: solid 1px transparent;
}

.game-over-notifications {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > div {
    display: flex;
    flex-direction: column;
  }
}
</style>