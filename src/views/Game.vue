<template>
  <main class='game'>
    <section class='cards opponent'>
      <h4 class='name'>{{opponent.name}}</h4>
      <Card v-for='(cardData, index) in opponent.hand' :key='index' :cardData='cardData' />
    </section>
    <section class='cards player'>
      <h4 class='name'>{{player.name}}</h4>
      <Card class='card' v-for='(cardData, index) in player.hand' :key='index' :cardData='cardData' isPlayerCard />
    </section>
  </main>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    Card
  },
  mounted() {
    if (!this.$store.state.game.players) {
      this.$router.push('/');
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
</style>