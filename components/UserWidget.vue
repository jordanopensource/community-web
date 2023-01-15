<template>
  <div>
    <img
      @click="openPopup"
      class="avatar"
      alt="avatar"
      :src="
        props.member.avatar_url
        ? props.member.avatar_url
        : '/images/placeholders/avatar.png'
      "
    />
    <div v-if="state.isOpen" class="user-menu">
      <div class="user-menu-item">
        {{ props.member.first_name_en }} {{ props.member.last_name_en }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
})
const state = reactive({
    isOpen: false
})
const openPopup = () => {
  state.isOpen = !state.isOpen
}
</script>

<style lang="postcss" scoped>
.avatar {
  @apply w-10 rounded;
}
.avatar:hover {
  @apply cursor-pointer
}
.user-menu {
  @apply absolute flex flex-col rounded;
  @apply mt-4 p-4;
  @apply bg-community-white text-community-black-darker;
  margin-left: -4.5rem;
}
</style>