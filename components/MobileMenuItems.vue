<template>
  <div :class="props.isOpen ? 'block lg:hidden' : 'hidden lg:hidden'">
    <ul class="text-white font-medium text-base py-8">
      <li
        class="py-4 block ml-auto border-gray"
        v-if="config.public.targetEnv === 'development'"
      >
        <NuxtLink
          @click="
            () => {
              emit('toggleNav')
            }
          "
          to="/register"
          class="uppercase transition-all duration-300 ease-linear"
          >Join JOSA</NuxtLink
        >
      </li>
      <li class="py-4 block ml-auto border-gray">
        <NuxtLink
          @click="
            () => {
              emit('toggleNav')
            }
          "
          to="/members"
          class="uppercase transition-all duration-300 ease-linear"
          >JOSA Members</NuxtLink
        >
      </li>
      <li
        class="py-4 block ml-auto border-gray"
        v-if="config.public.targetEnv === 'development'"
      >
        <NuxtLink
          @click="
            () => {
              emit('toggleNav')
            }
          "
          to="/missions"
          class="uppercase transition-all duration-300 ease-linear"
          >Contribute</NuxtLink
        >
      </li>
      <li class="py-4 block ml-auto">
        <NuxtLink
          @click="
            () => {
              emit('toggleNav')
            }
          "
          id="login"
          to="/login"
          class="uppercase transition-all duration-300 ease-linear text-community-blue border-community-blue p-2 pt-1 pb-1 hover:text-community-grey-light"
          v-if="!isAuth().value"
          >Sign In</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>
<script setup>
const emit = defineEmits(['toggleNav'])
const config = useRuntimeConfig()
const props = defineProps({
  isOpen: Boolean,
})
</script>

<style scoped>
.border-gray {
  border-bottom: solid 2px #22292c;
}

#login {
  border-width: thin;
}
</style>
