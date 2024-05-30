<template>
  <div class="lg:hidden flex items-center w-full justify-end">
    <button class="outline-none mr-4" aria-label="Mobile Menu" @click="OnClick">
      <img
        v-if="props.isOpen"
        class="w-9 h-9"
        src=" /icons/x-circle.svg"
        alt="burger-menu"
      />
      <img v-else class="w-9 h-9" src=" /icons/bars-solid.svg" alt="" />
    </button>
    <UserWidget v-if="useAuthenticated().value" />
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
