<template>
  <div class="container input-control">
    <h2 class="text-xl lg:text-2xl">Sign in to JOSA.community</h2>
    <div class="divider-slashes"></div>
    <form>
      <FormAppControlInput
        inputType="email"
        :isRequired="true"
        v-model:value="form.email"
      >
        Email
      </FormAppControlInput>
      <FormAppControlInput
        inputType="password"
        :isRequired="true"
      >
        Password
      </FormAppControlInput>
      <NuxtLink class="forgot-pw-link">Forgot Password?</NuxtLink>
      <FormAppButton
        class="signin-btn"
        btn-style="button-flat button-blue-full"
        type="submit"
      >
        Sign in
      </FormAppButton>
    </form>
  </div>
</template>
<script setup>
const form = reactive({
  email: '',
})
</script>

<style lang="postcss" scoped>
.divider-slashes {
  @apply mt-5 mb-10;
  @apply h-3;
}
div.container {
  @apply bg-white;
  @apply my-5 md:my-10;
  @apply p-5 md:p-10;
  @apply rounded-lg;
  @apply md:text-lg;
  max-width: 1024px;
}
.signin-btn {
  @apply w-full;
  @apply rounded-lg;
}
.forgot-pw-link {
  @apply block w-full;
  @apply text-right;
  @apply text-community-blue;
  @apply mb-10;
}
</style>