<template>
  <header>
    <nav>
      <div class="container">
        <!-- <div
        class="px-6 md:px-12 flex justify-between flex-wrap lg:flex-nowrap items-center"
      > -->
        <div class="nav-bar">
          <NuxtLink
            id="brand"
            to="/"
            class="flex flex-col md:flex-row items-end z-10"
          >
            <img
              class="w-36 h-10"
              src="@/static/logo/logo.svg"
              alt="Jordan Open Source Association Logo"
              width="128"
              height="40"
              loading="eager"
            />
            <span class="text-xl text-josa-warm-grey-light italic">
              .community
            </span>
          </NuxtLink>
          <ul class="menu">
            <li class="menu-item">
              <NuxtLink to="/register" class="nav-link">Join JOSA</NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink to="/members" class="nav-link">JOSA Members</NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink id="login" to="/login" class="nav-link"
                >Sign In</NuxtLink
              >
            </li>
          </ul>
          <MobileMenuButton :is-open="state.isOpen" @toggle="ToggleIsOpen()" />
        </div>
        <MobileMenuItems :is-open="state.isOpen" />
      </div>
    </nav>
  </header>
</template>
<script setup>
import { reactive } from 'vue'

const state = reactive({
  isOpen: false,
})
const ToggleIsOpen = () => (state.isOpen = !state.isOpen)
</script>
<style lang="postcss" scoped>
* {
  @apply bg-josa-black-darker;
}

li a {
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
}

.nav-bar {
  @apply flex items-center py-6 mx-11 md:mx-11 lg:ml-24 md:py-11;
}
.menu-item {
  @apply inline-block lg:mx-7;
}

.menu {
  @apply text-white hidden lg:flex font-medium text-lg lg:text-xl w-full justify-end;
}

.nav-bar {
  @apply flex items-center py-6 mx-8 md:mx-11 lg:ml-24 md:py-11;
}

#login {
  @apply text-josa-blue border-josa-blue p-2 pt-1 pb-1;
  border-width: thin;
}

#login:hover {
  @apply text-josa-warm-grey-light;
}

@screen sm {
  .menu-icon {
    @apply w-8 h-8 !important;
  }
}
</style>
