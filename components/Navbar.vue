<template>
  <nav>
    <div class="inline-block links">
      <NuxtLink to="/register" class="nav-link">Join JOSA</NuxtLink>
      <NuxtLink to="/members" class="nav-link">JOSA Members</NuxtLink>
      <NuxtLink to="/login" class="nav-link" id="login">Sign In</NuxtLink>
    </div>
  </nav>
</template>
<style lang="postcss" scoped>
#login {
  @apply text-josa-blue border-josa-blue p-2 pt-1 pb-1;
  border-width: thin;
}

#login:hover {
  @apply text-josa-warm-grey-light;
}
</style>