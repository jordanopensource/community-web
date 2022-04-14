<template>
  <div class="lg:hidden flex items-center w-full justify-end">
    <button class="outline-none" aria-label="Mobile Menu" @click="OnClick">
      <img
        v-if="props.isOpen"
        class="w-9 h-9"
        src=" /icons/x-circle.svg"
        alt=""
      />
      <img v-else class="w-9 h-9" src=" /icons/bars-solid.svg" alt="" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['toggle'])

const OnClick = () => {
  emit('toggle')
}
</script>
