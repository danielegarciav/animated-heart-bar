<template>
  <div class="heart-bar">
    <HealthHeart v-for="n in totalHearts" :key="n" :fill="getFillAmount(n)" />
  </div>
  <p>HP: {{ health }} / {{ maxHealth }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useTransition } from '@vueuse/core';
import HealthHeart from './HealthHeart.vue';

const healthPerHeart = 4;

export default defineComponent({
  name: 'HeartBar',
  components: { HealthHeart },

  props: {
    health: {
      type: Number,
      required: true,
    },
    maxHealth: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const health = computed(() => props.health);
    const totalHearts = computed(() => Math.ceil(props.maxHealth / healthPerHeart));

    /** The current health, smoothed over time. */
    const visualHealth = useTransition(health, {
      duration: 2000,
      transition: [0.15, 0.86, 0, 1],
    });

    /** The amount of fully filled hearts. */
    const filledHearts = computed(() => Math.floor(visualHealth.value / healthPerHeart));

    /** Gets the fill amount for the nth heart, zero-indexed, from 0 to 1. */
    const getFillAmount = (n: number) => {
      if (n <= filledHearts.value) return 1;
      if (n > filledHearts.value + 1) return 0;
      return (visualHealth.value % healthPerHeart) / healthPerHeart;
    };

    return { totalHearts, getFillAmount, visualHealth, filledHearts };
  },
});
</script>

<style>
.heart-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
