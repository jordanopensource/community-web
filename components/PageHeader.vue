<template>
  <header>
    <nav>
      <div class="container">
        <div class="nav-bar">
          <NuxtLink id="brand" to="/" class="flex flex-row items-end z-10">
            <img
              class="w-36 h-10"
              src=" /logo/logo.svg"
              alt="Jordan Open Source Association Logo"
              width="128"
              height="40"
              loading="eager"
            />
            <span class="community text-xl text-community-grey-light italic">
              .community
            </span>
          </NuxtLink>
          <ul class="menu">
            <li
              v-if="config.public.targetEnv === 'development'"
              class="menu-item"
            >
              <NuxtLink to="/register" class="nav-link">Join JOSA</NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink to="/members" class="nav-link">JOSA Members</NuxtLink>
            </li>
            <li
              v-if="config.public.targetEnv === 'development'"
              class="menu-item"
            >
              <NuxtLink to="/missions" class="nav-link">Contribute</NuxtLink>
            </li>
            <li class="menu-item">
              <NuxtLink
                v-if="!token && !isAuth().value"
                id="login"
                to="/login"
                class="nav-link"
                >Sign In</NuxtLink
              >
              <UserWidget v-else />
            </li>
          </ul>
          <MobileMenuButton :is-open="state.isOpen" @toggle="ToggleIsOpen()" />
        </div>
        <MobileMenuItems
          :is-open="state.isOpen"
          ()
          @toggle-nav="ToggleIsOpen()"
        />
      </div>
    </nav>
  </header>
</template>
<script setup>
import { reactive } from 'vue'
const config = useRuntimeConfig()
const { token } = useAuth()

const state = reactive({
  isOpen: false,
})
const ToggleIsOpen = () => (state.isOpen = !state.isOpen)
onMounted(() => {
  state.isOpen = false
})
</script>
<style lang="postcss" scoped>
* {
  @apply bg-community-black-darker;
}

li a {
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
}

.nav-bar {
  @apply flex items-center;
  @apply py-6 md:py-12;
}

.menu {
  @apply text-white hidden font-medium text-lg lg:text-xl;
  @apply lg:flex justify-end w-full items-center;

  .menu-item {
    @apply inline-block lg:mx-2;
  }
}

#login {
  @apply text-community-blue border-community-blue ml-3 p-2 pt-1 pb-1;
  border-width: thin;
}

#login:hover {
  @apply text-community-grey-light;
}

@media screen and (max-width: 400px) {
  img {
    @apply h-8 w-auto;
  }

  .community {
    @apply text-lg;
  }
}
</style>
