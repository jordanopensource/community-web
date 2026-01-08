<template>
  <div v-if="memberData?.member" class="flex flex-col items-end justify-between">
    <img
      class="w-10 h-10 object-cover rounded z-10 cursor-pointer"
      alt="avatar"
      :src="
        memberData?.member.avatar_url
          ? memberData?.member.avatar_url
          : '/images/placeholders/avatar.png'
      "
      @click="togglePopup"
    />
    <div v-if="state.isOpen" class="absolute w-52 flex flex-col rounded z-10 mt-12 p-4 bg-community-white text-community-black-darker">
      <div class="w-4 h-4 bg-community-white rotate-45 -mt-5" style="margin-left: 10.2rem"></div>
      <p class="text-lg">
        {{ memberData?.member.first_name_en }}
        {{ memberData?.member.last_name_en }}
      </p>
      <div class="flex flex-row justify-between mb-4">
        <div v-if="memberData?.member.type !== 0" class="font-light text-sm mt-1">
          <div class="w-3 h-3 inline-block mr-0.5 rounded-sm bg-community-blue"></div>
          JOSA Member
        </div>
        <div
          v-if="
            memberData?.member.josa_member_id && memberData?.member.type !== 0
          "
          class="font-light text-sm mt-1"
        >
          #{{ memberData?.member.type }}-{{ memberData?.member.josa_member_id }}
        </div>
      </div>
      <div class="divider-dotted"></div>
      <div v-for="(link, index) in widget.links" :key="index">
        <!-- A dotted line before Sign Out button -->
        <div v-if="index === 2" class="divider-dotted"></div>
        <NuxtLink :to="link.to" class="text-community-black-darker capitalize text-lg px-0 flex flex-row gap-x-2 items-center hover:text-community-blue" @click="link.onClick">
          <div class="inline-block w-4 h-4 bg-cover menu-icon" :class="link.icon"></div>
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

<style scoped>
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
