<template>
  <div class="health-heart-container">
    <div class="heart-foreground" :style="{ clipPath: `path('${clipPath}')` }">
      <span>🧡</span>
    </div>
    <div class="heart-background" :style="{ clipPath: `path('${maxClipPath}')` }">
      <span>🖤</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getArcPath } from '../util/svg-arc-path';

export default defineComponent({
  name: 'HealthHeart',

  props: {
    fill: {
      type: Number,
      required: true,
    },
    maxFill: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    // The size of the entire bounding box - must match with CSS
    const size = 64;
    const halfSize = size / 2;

    // We want to create a circle that contains our whole bounding box
    // The diameter of this circle must be equal to the side of the box -> use pythagora's
    const circleSize = halfSize * Math.sqrt(2);

    const clipPath = computed(() =>
      // This function can't return data for a full circle yet, so we get as close as full as we can
      getArcPath(halfSize, halfSize, circleSize, 0, props.fill * 359.999),
    );

    const maxClipPath = computed(() =>
      // This function can't return data for a full circle yet, so we get as close as full as we can
      getArcPath(halfSize, halfSize, circleSize, 0, props.maxFill * 359.999),
    );

    return { clipPath, maxClipPath };
  },
});
</script>

<style>
.health-heart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  font-size: 3rem;
}

.heart-foreground {
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.heart-foreground span {
  text-shadow: 0 0 8px rgba(255, 100, 100, 0.2);
}

.silhouette .heart-foreground {
  filter: invert(0.5) sepia(1) saturate(20) hue-rotate(-40deg);
}

.heart-background {
  position: absolute;
  z-index: -1;
  filter: invert(0.8) opacity(0.4);
}

:root.dark .silhouette .heart-background {
  filter: invert(0.5) opacity(0.2);
}
</style>
