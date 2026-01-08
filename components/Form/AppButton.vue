<template>
  <button class="button disabled:bg-josa-grey" :class="btnStyle" v-bind="$attrs">
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
