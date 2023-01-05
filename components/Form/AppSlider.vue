<template>
  <p>
    <span>{{ state.range }}</span>
  </p>
  <div class="slide-container">
    <input @input="($event) => onChange($event.target.value)" class="slider" type="range" :min="props.min"
      :max="props.max" :value="state.range" />
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['emitRange'])

const props = defineProps({
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 100,
  },
})

const state = reactive({
  range: props.max,
})

const onChange = (value) => {
  state.range = value
  emit('emitRange', value)
}
</script>
<style lang="postcss" scoped>
.slider {
  @apply bg-community-blue;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  @apply bg-community-blue;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  @apply bg-community-blue;
  cursor: pointer;
}
</style>
