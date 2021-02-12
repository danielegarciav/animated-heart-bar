<template>
  <div class="heart-bar silhouette">
    <HealthHeart v-for="n in totalHearts" :key="n" :fill="getFillAmount(n)" :maxFill="getMaxFillAmount(n)" />
  </div>
  <p>HP: {{ health }} / {{ maxHealth }}</p>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue';
import { useTransition } from '@vueuse/core';
import HealthHeart from './HealthHeart.vue';

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
    healthPerHeart: {
      type: Number,
      default: 4,
    },
  },

  setup(props) {
    const health = toRef(props, 'health');

    /** The current health, smoothed over time. */
    const visualHealth = useTransition(health, {
      duration: 2000,
      transition: [0.15, 0.86, 0, 1],
    });

    const totalHearts = computed(() => Math.ceil(props.maxHealth / props.healthPerHeart));
    const filledHearts = computed(() => Math.floor(visualHealth.value / props.healthPerHeart));

    /** Gets the fill amount for the nth heart, zero-indexed, from 0 to 1. */
    const getFillAmount = (n: number) => {
      if (n <= filledHearts.value) return 1;
      if (n > filledHearts.value + 1) return 0;
      const healthPerHeart = props.healthPerHeart;
      return (visualHealth.value % healthPerHeart) / healthPerHeart;
    };

    /** Gets the fill amount for the nth heart, zero-indexed, from 0 to 1. */
    const getMaxFillAmount = (n: number) => {
      if (n < totalHearts.value) return 1;
      if (n > totalHearts.value) return 0;
      const healthPerHeart = props.healthPerHeart;
      const modulo = props.maxHealth % healthPerHeart;
      if (modulo === 0) return 1;
      return modulo / healthPerHeart;
    };

    return { totalHearts, getFillAmount, getMaxFillAmount };
  },
});
</script>

<style>
.heart-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
