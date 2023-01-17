<template>
  <div class="widget-container">
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
      <p class="user-name">
        {{ props.member.first_name_en }} {{ props.member.last_name_en }}
      </p>
      <div class="flex flex-row justify-between">
        <p class="user-info">
          <div class="badge-color"></div>
          JOSA Member
        </p>
        <p class="user-info">
          #{{ props.member.type }}-{{ props.member.josa_member_id }}
        </p>
      </div>
      <div class="divider-dotted"></div>
      <NuxtLink to="/members" class="nav-link">
        <i class="menu-icon ic-user"></i> Your Profile
      </NuxtLink>
      <NuxtLink to="/" class="nav-link">
        <i class="menu-icon ic-gear"></i> Settings
      </NuxtLink>
      <div class="divider-dotted"></div>
      <NuxtLink to="/" class="nav-link" @click="signOut">
        <i class="menu-icon ic-logout"></i> Sign out
      </NuxtLink>
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
const signOut = () => {
  useCookie('auth').value = null;
}
</script>

<style lang="postcss" scoped>
.widget-container {
  @apply flex flex-col items-end justify-between;
}
.avatar {
  @apply w-10 rounded;
}
.avatar:hover {
  @apply cursor-pointer
}
.user-menu {
  @apply absolute w-52 flex flex-col rounded z-10;
  @apply mt-12 p-4;
  @apply bg-community-white text-community-black-darker;
}
.user-name {
  @apply text-xl;
}
.user-info {
  @apply font-light text-sm;
  @apply mt-2;
}
.badge-color {
  @apply w-3 h-3 inline-block mr-0.5;
  @apply rounded-sm;
  @apply bg-community-blue;
}
.nav-link {
  @apply text-community-black-darker capitalize text-lg px-0;
}
.nav-link:hover {
  @apply text-community-blue;
}
.menu-icon {
  @apply inline-block w-4 h-4;
  @apply bg-cover;
}
.ic-user {
  background-image: url('~/assets/icons/icon-user.svg');
}
.ic-gear {
  background-image: url('~/assets/icons/icon-settings.svg');
}
.ic-logout {
  background-image: url('~/assets/icons/icon-logout.svg');
}
</style>