<template>
  <div class="widget-container">
    <img
      @click="togglePopup"
      class="avatar"
      alt="avatar"
      :src="
        state.member.avatar_url
        ? state.member.avatar_url
        : '/images/placeholders/avatar.png'
      "
    />
    <div v-if="state.isOpen" class="user-menu">
      <p class="user-name">
        {{ state.member.first_name_en }} {{ state.member.last_name_en }}
      </p>
      <div class="flex flex-row justify-between">
        <p v-if="state.member.type !== 0"
          class="user-info">
          <div class="badge-color"></div>
          JOSA Member
        </p>
        <p v-if="state.member.josa_member_id && state.member.type !== 0"
          class="user-info">
          #{{ state.member.type }}-{{ state.member.josa_member_id }}
        </p>
      </div>
      <div class="divider-dotted"></div>
      <NuxtLink
        v-for="link, index in widget.links"
        :key="index"
        :to="link.to"
        @click="link.onClick"
        class="nav-link">
        <i class="menu-icon" :class="link.icon"></i> {{link.title}}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const togglePopup = () => {
  state.isOpen = !state.isOpen
}

const signOut = async () => {
  togglePopup()
  await useFetch('/api/logout')
  localStorage.clear()
  useAuth().value = false
  navigateTo('/')
}

const state = reactive({
  isOpen: false,
  member: {}
})
const widget = reactive({
  links: [
    {
      title: 'Your Profile',
      to: '/members/' + userId().value,
      icon: 'ic-user',
      onClick: togglePopup
    },
    {
      title: 'Settings',
      to: '/',
      icon: 'ic-gear',
      onClick: togglePopup
    },
    {
      title: 'Sign out',
      to: '/',
      icon: 'ic-logout',
      onClick: signOut
    }
  ]
})
onMounted(() => {
  if (localStorage.getItem('member')) {
    state.member = JSON.parse(localStorage.getItem('member'))._data
    widget.links[0].to = '/members/' + state.member.id
  } else {
    //TODO: handle this case better 
    console.error('localstorage is empty')
  }
})
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