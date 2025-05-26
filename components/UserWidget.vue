<template>
  <div v-if="memberData?.member" class="widget-container">
    <img
      class="avatar z-10"
      alt="avatar"
      :src="
        memberData?.member.avatar_url
          ? memberData?.member.avatar_url
          : '/images/placeholders/avatar.png'
      "
      @click="togglePopup"
    />
    <div v-if="state.isOpen" class="user-menu">
      <div class="widget-arrow"></div>
      <p class="user-name">
        {{ memberData?.member.first_name_en }}
        {{ memberData?.member.last_name_en }}
      </p>
      <div class="flex flex-row justify-between mb-4">
        <div v-if="memberData?.member.type !== 0" class="user-info">
          <div class="badge-color"></div>
          JOSA Member
        </div>
        <div
          v-if="
            memberData?.member.josa_member_id && memberData?.member.type !== 0
          "
          class="user-info"
        >
          #{{ memberData?.member.type }}-{{ memberData?.member.josa_member_id }}
        </div>
      </div>
      <div class="divider-dotted"></div>
      <div v-for="(link, index) in widget.links" :key="index">
        <!-- A dotted line before Sign Out button -->
        <div v-if="index === 2" class="divider-dotted"></div>
        <NuxtLink :to="link.to" class="nav-link" @click="link.onClick">
          <div class="menu-icon" :class="link.icon"></div>
          <div class="inline">{{ link.title }}</div>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div v-else class="loader"></div>
</template>

<script setup>
const memberData = useMemberData()
const togglePopup = () => {
  state.isOpen = !state.isOpen
}

const logout = async () => {
  togglePopup()
  logoutMember()
}

const state = reactive({
  isOpen: false,
  member: {},
})
const widget = reactive({
  links: [
    {
      title: 'Your Profile',
      to: computed(() => '/members/' + userId().value),
      icon: 'ic-user',
      onClick: togglePopup,
    },
    {
      title: 'Settings',
      to: '/members/settings/',
      icon: 'ic-gear',
      onClick: togglePopup,
    },
    {
      title: 'Sign out',
      to: '/',
      icon: 'ic-logout',
      onClick: logout,
    },
  ],
})
</script>

<style lang="postcss" scoped>
.widget-container {
  @apply flex flex-col items-end justify-between;
}
.avatar {
  @apply w-10 h-10 object-cover rounded;
}
.avatar:hover {
  @apply cursor-pointer;
}
.user-menu {
  @apply absolute w-52 flex flex-col rounded z-10;
  @apply mt-12 p-4;
  @apply bg-community-white text-community-black-darker;
  .widget-arrow {
    @apply w-4 h-4 bg-community-white rotate-45 -mt-5;
    margin-left: 10.2rem;
  }
}
.user-name {
  @apply text-lg;
}
.user-info {
  @apply font-light text-sm;
  @apply mt-1;
}
.badge-color {
  @apply w-3 h-3 inline-block mr-0.5;
  @apply rounded-sm;
  @apply bg-community-blue;
}
.nav-link {
  @apply text-community-black-darker capitalize text-lg px-0;
  @apply flex flex-row gap-x-2 items-center;
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
