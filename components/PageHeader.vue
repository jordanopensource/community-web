<template>
  <header class="bg-community-black-darker">
    <nav class="bg-community-black-darker">
      <div class="container bg-community-black-darker">
        <div class="flex items-center py-6 md:py-12">
          <NuxtLink id="brand" to="/" class="flex flex-row items-end z-10">
            <img
              class="w-36 h-10 max-[400px]:h-8 max-[400px]:w-auto"
              src=" /logo/logo.svg"
              alt="Jordan Open Source Association Logo"
              width="128"
              height="40"
              loading="eager"
            />
            <span class="text-xl max-[400px]:text-lg text-community-grey-light italic">
              .community
            </span>
          </NuxtLink>
          <ul class="text-white hidden font-medium text-lg lg:text-xl lg:flex justify-end w-full items-center">
            <li
              v-if="config.public.targetEnv === 'development'"
              class="inline-block lg:mx-2"
            >
              <NuxtLink to="/register" class="uppercase transition-all duration-300 ease-linear">Join JOSA</NuxtLink>
            </li>
            <li class="inline-block lg:mx-2">
              <NuxtLink to="/members" class="uppercase transition-all duration-300 ease-linear">JOSA Members</NuxtLink>
            </li>
            <li
              v-if="config.public.targetEnv === 'development'"
              class="inline-block lg:mx-2"
            >
              <NuxtLink to="/missions" class="uppercase transition-all duration-300 ease-linear">Contribute</NuxtLink>
            </li>
            <li class="inline-block lg:mx-2">
              <NuxtLink
                v-if="!token && !isAuth().value"
                id="login"
                to="/login"
                class="uppercase transition-all duration-300 ease-linear text-community-blue border-community-blue ml-3 p-2 pt-1 pb-1 hover:text-community-grey-light"
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
<style scoped>
#login {
  border-width: thin;
}
</style>
