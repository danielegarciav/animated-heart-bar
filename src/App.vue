<template>
  <HeartBar :health="health" :maxHealth="maxHealth" />
  <hr />
  <button @click="randomDamage">Damage</button>
  <button @click="randomHeal">Heal</button>
  <button @click="fullHeal">Heal fully</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HeartBar from './components/HeartBar.vue';

export default defineComponent({
  name: 'App',
  components: { HeartBar },
  setup() {
    const health = ref(40);
    const maxHealth = ref(40);

    const takeDamage = (amount: number) => {
      health.value = Math.max(0, health.value - amount);
    };

    const heal = (amount: number) => {
      health.value = Math.min(maxHealth.value, health.value + amount);
    };

    const randomDamage = () => takeDamage(1 + Math.floor(Math.random() * maxHealth.value - 1));
    const randomHeal = () => heal(1 + Math.round(Math.random() * maxHealth.value - 1));
    const fullHeal = () => (health.value = maxHealth.value);

    return { health, maxHealth, randomDamage, randomHeal, fullHeal };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

button {
  margin: 1rem;
  padding: 0.2rem 0.8rem;
}

hr {
  border-style: none none solid;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
