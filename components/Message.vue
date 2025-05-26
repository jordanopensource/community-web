<template>
  <div
    v-if="state.shown"
    class="flex flex-col justify-start border p-4"
    :class="props.type"
  >
    <div class="flex flex-row justify-between items-center mb-2">
      <img
        class="msg-icon w-5 h-5 bg-contain"
        :src="`/icons/message/${props.type}.svg`"
      />
      <i
        v-if="props.showCloseBtn"
        class="close-icon w-5 h-5 bg-contain"
        @click="state.shown = false"
      >
      </i>
    </div>
    <p class="msg-title font-bold">{{ props.title }}</p>
    <p class="msg-body"><slot /></p>
  </div>
</template>
<script setup>
const props = defineProps({
  type: { type: String, default: 'info' },
  title: { type: String, default: '' },
  showCloseBtn: { type: Boolean, default: true },
})
const state = reactive({
  shown: true,
})
</script>
<style scoped>
.success {
  background-color: rgba(109, 185, 129, 0.1);
  border-color: #6db981;
  color: #6db981;
}
.error {
  background-color: rgba(242, 111, 84, 0.1);
  border-color: #f26f54;
  color: #f26f54;
}
.info {
  background-color: rgba(11, 150, 171, 0.1);
  border-color: #0b96ab;
  color: #0b96ab;
}
.close-icon {
  @apply bg-xIcon;
}
.close-icon:hover {
  cursor: pointer;
}
</style>
