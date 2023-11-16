<template>
  <button class="button" :class="btnStyle" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  btnStyle: {
    type: String,
    default: 'button-blue',
  },
})
</script>

<style scoped lang="postcss">
.button:disabled {
  @apply bg-josa-grey;
}
</style>
