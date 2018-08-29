<template>
  <main :class='{ game: true, over: over }'>
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
    }
  }
};
</script>

<style scoped lang='scss'>
.game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: opacity 0.3s;

  &.over {
    opacity: 0;
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &.opponent .name {
    order: 5;
  }

  .name {
    width: 100%;
    margin: 0;
    font-size: 2rem;
    font-weight: normal;
    font-style: italic;
  }
}

.play {
  width: 5rem;
  height: 2rem;
  margin: 0 auto;
}
</style>