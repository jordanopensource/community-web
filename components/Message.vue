<template>
  <div
    v-if="state.shown"
    class="w-full flex flex-col justify-start border m-4 p-4"
    :class="props.type">
    <div class="flex flex-row justify-between items-center mb-2">
      <i
        class="msg-icon w-5 h-5 bg-contain"
        :style="`background-image: url('/assets/icons/message/${props.type}.svg')`">
      </i>
      <i
        class="close-icon w-5 h-5 bg-contain"
        @click="state.shown = false">
      </i>
    </div>
    <p class="msg-title font-bold">{{ props.title }}</p>
    <p class="msg-body"> <slot/> </p>
  </div>
</template>
<script setup>
const props = defineProps({
  type: { type: String, default: 'info' },
  title: { type: String, default: '' },
})
const state = reactive({
  shown: true
})
</script>
<style scoped>
.success {
  background-color: rgba(109, 185, 129, 0.1);
  border-color: #6DB981;
  color: #6DB981;
}
.error {
  background-color: rgba(242, 111, 84, 0.1);
  border-color: #F26F54;
  color: #F26F54;
}
.info {
  background-color: rgba(11, 150, 171, 0.1);
  border-color: #0B96AB;
  color: #0B96AB;
}
.close-icon {
  background-image: url('/assets/icons/message/close.svg');
}
.close-icon:hover {
  cursor: pointer;
}
</style>
