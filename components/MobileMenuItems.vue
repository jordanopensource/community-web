<template>
  <div :class="props.isOpen ? 'block lg:hidden' : 'hidden lg:hidden'">
    <ul class="mobile-menu">
      <li
        class="py-4 border-gray"
        v-if="config.public.TARGET_ENV === 'development'"
      >
        <NuxtLink to="/register" class="nav-link">Join JOSA</NuxtLink>
      </li>
      <li class="py-4 border-gray">
        <NuxtLink to="/members" class="nav-link">JOSA Members</NuxtLink>
      </li>
      <li
        class="py-4 border-gray"
        v-if="config.public.TARGET_ENV === 'development'"
      >
        <NuxtLink to="/missions" class="nav-link">Contribute</NuxtLink>
      </li>
      <li class="py-4">
        <NuxtLink
          id="login"
          to="/login"
          class="nav-link"
          v-if="!useAuth().value"
          >Sign In</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
const props = defineProps({
  isOpen: Boolean,
})
</script>

<style lang="postcss" scoped>
.mobile-menu {
  @apply text-white;
  @apply font-medium text-base;
  @apply py-8;
}

.border-gray {
  border-bottom: solid 2px #22292c;
}

ul > li {
  @apply block;
  @apply ml-auto;
}

li a {
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
}

#login {
  @apply text-community-blue border-community-blue p-2 pt-1 pb-1;
  border-width: thin;
}

#login:hover {
  @apply text-community-grey-light;
}
</style>
