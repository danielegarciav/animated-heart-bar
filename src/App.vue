<template>
  <HeartBar :health="health" :maxHealth="maxHealth" :healthPerHeart="healthPerHeart" />
  <hr />
  <button @click="randomDamage">Damage</button>
  <button @click="randomHeal">Heal</button>
  <button @click="fullHeal">Heal fully</button>
  <br />
  <button @click="addMaxHealth(-1)">Decrease max HP</button>
  <button @click="addMaxHealth(1)">Increase max HP</button>
  <br />
  <p>1 × 🧡 = {{ healthPerHeart }} HP</p>
  <button @click="addHealthPerHeart(-1)">Decrease HP per 🧡</button>
  <button @click="addHealthPerHeart(1)">Increase HP per 🧡</button>
  <footer>
    <p>Made with 💛 by <a href="https://danielegarciav.me" target="_blank">Daniel Garcia</a></p>
    <p><a href="https://github.com/danielegarciav/animated-heart-bar" target="_blank">view source</a></p>
  </footer>
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
    const healthPerHeart = ref(4);

    const takeDamage = (amount: number) => {
      health.value = Math.max(0, health.value - amount);
    };

    const heal = (amount: number) => {
      health.value = Math.min(maxHealth.value, health.value + amount);
    };

    const randomDamage = () => takeDamage(1 + Math.floor(Math.random() * maxHealth.value - 1));
    const randomHeal = () => heal(1 + Math.round(Math.random() * maxHealth.value - 1));
    const fullHeal = () => (health.value = maxHealth.value);

    const addMaxHealth = (amount: number) => {
      const newMax = Math.max(0, maxHealth.value + amount);
      maxHealth.value = newMax;
      health.value = Math.min(health.value, newMax);
    };

    const addHealthPerHeart = (amount: number) => {
      healthPerHeart.value = Math.max(1, healthPerHeart.value + amount);
    };

    return {
      health,
      maxHealth,
      healthPerHeart,
      randomDamage,
      randomHeal,
      fullHeal,
      addMaxHealth,
      addHealthPerHeart,
    };
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

footer {
  color: rgb(22, 22, 53);
  font-size: 0.9rem;
  font-family: Consolas, 'Courier New', Courier, monospace;
}

footer a {
  color: rgb(42, 42, 82);
}
</style>
