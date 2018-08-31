<template>
  <article :class='{ card: true, visible: visible, isPlayer: $props.isPlayerCard, selected: $props.selected }' @click='$emit("selected", cardData.id)'>
    <img class='card-img' :src='visible ? cardData.img : "cardback.jpg"' />
    <div class='attack' v-if='visible'>
      <svg class='background-icon fist' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.041 190.041">
        <path fill="brown" d="M167.628,62.478c-2.39-20.223-13.667-26.568-23.459-26.568c-1.358,0-2.688,0.121-3.961,0.346   c-0.197,0.035-0.395,0.051-0.589,0.051c-1.735,0-3.334-1.316-4.289-2.826c-5.37-8.496-12.663-10.729-18.845-10.729   c-2.823,0-5.413,0.466-7.483,1.013c-0.609,0.161-1.228,0.239-1.84,0.239c-2.178,0-4.277-0.994-5.588-2.809   c-4.01-5.556-9.915-8.502-15.725-8.502c-3.888,0-7.732,1.318-10.939,4.058c-1.74,1.487-3.103,2.601-4.502,2.601   c-0.932,0-1.879-0.493-2.964-1.697C64.071,13.908,59.091,12,54.187,12c-8.166,0-16.121,5.29-16.107,16.215   c0.023,18.355,0.089,8.394,0.109,24.996c0.003,2.803-1.673,5.352-4.258,6.432c-32.554,13.597,7.634,74.621,14.832,85.079   c0.702,1.021,1.118,2.203,1.211,3.439l1.759,23.398c0.274,3.65,3.316,6.461,6.976,6.461c0.004,0,0.006,0,0.01,0l78.623-0.086   c3.509-0.005,6.471-2.602,6.928-6.08l3.202-24.387c0.136-1.032,0.51-2.021,1.074-2.895   C169.56,112.093,170.16,83.915,167.628,62.478z" />
      </svg>
      <p>{{cardData.attack}}</p>
    </div>
    <div class='defense' v-if='visible'>
      <svg class='background-icon shield' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <path fill="saddlebrown" d="M500.7,10c0,0-142.3,281.9-434.2,206.4c0,0-3.9,425.9,243.7,621.6C478.8,963.6,468.9,965.2,502,990c0,0,6.4-3.8,190-146.5c197.9-153.8,226.8-312.1,241.5-626.4C933.5,217.1,677.8,299.3,500.7,10z" />
      </svg>
      <p>{{cardData.defense}}</p>
    </div>
    <div class='health' v-if='visible'>
      <svg class='background-icon heart' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="red" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
      </svg>
      <p>{{cardData.health}}</p>
    </div>
    <p class='name'>{{cardData.name}}</p>
  </article>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cardData: {
      type: Object,
      required: true
    },
    isPlayerCard: Boolean,
    selected: Boolean,
    dying: Boolean
  },
  computed: {
    visible() {
      return this.$props.cardData.visible || this.$props.isPlayerCard;
    }
  }
};
</script>

<style scoped lang='scss'>
.card {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  --size: 8rem;
  width: var(--size);
  height: calc(var(--size) * 1.4);
  position: relative;
  margin: 1rem;
  border-radius: 0.15rem;
  background-color: hsl(0, 0%, 98%);
  transition: transform 0.2s, background-color 0.2s;
  cursor: pointer;

  .card-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  &.visible {
    background-color: hsl(0, 0%, 55%);
    .card-img {
      transition: filter 0.2s;
      filter: brightness(80%);
    }
    &:hover,
    &.selected {
      background-color: hsl(0, 0%, 98%);
      .card-img {
        filter: brightness(100%);
      }
    }
  }

  &:hover,
  &.selected {
    transform: translateY(1.5rem);
    &.isPlayer {
      transform: translateY(-1.5rem);
    }
  }

  .attack,
  .defense,
  .health {
    position: absolute;
    margin: 0;
    width: 1.5rem;
    height: 1.5rem;
    p {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      font-size: 0.8rem;
      font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .background-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 2rem;
      height: 2rem;
    }
  }

  --dist: 0.65rem;
  .attack {
    top: var(--dist);
    left: var(--dist);
  }
  .defense {
    top: var(--dist);
    right: var(--dist);
  }
  .health {
    bottom: var(--dist);
    left: var(--dist);
  }
  .name {
    position: absolute;
    width: 100%;
    text-align: center;
    top: -2rem;
    margin: 0;
    opacity: 0;
    transition: opacity 0.2s;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    white-space: nowrap;
  }
  &.visible {
    &:hover .name,
    &.selected .name {
      opacity: 1;
    }
  }
  &.isPlayer .name {
    top: unset;
    bottom: -2rem;

    &:hover .name,
    &.selected .name {
      opacity: 1;
    }
  }
}
</style>