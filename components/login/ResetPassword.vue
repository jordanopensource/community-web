<template>
  <div class="container input-control">
    <h2 class="text-xl lg:text-2xl">Reset your Password</h2>
    <div class="divider-slashes"></div>
    <form>
      <p>
        Enter your user account's verified email address and we will send you a
        password reset link
      </p>
      <FormAppControlInput
        inputType="email"
        :isRequired="true"
        v-model:value="form.email"
      >
        Email
      </FormAppControlInput>
      <FormAppButton
        class="form-submit"
        btn-style="button-flat button-blue-full"
        type="submit"
        @click.prevent="sendEmail"
      >
        Send password reset email
      </FormAppButton>
      <NuxtLink @click="$emit('forgotPassword', false)">
        Back to sign in
      </NuxtLink>
    </form>
  </div>
</template>
<script setup>
const emit = defineEmits(['forgotPassword'])

const form = reactive({
  email: '',
})

const sendEmail = async () => {
  await $fetch.raw('/api/forgot-password/send-email', {
    method: 'POST',
    body: JSON.stringify({
      'email': form.email
    })
  });
}

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
  max-width: 480px;
}
.form-submit {
  @apply w-full;
  @apply rounded-lg;
}
form a {
  @apply block w-full;
  @apply text-right;
  @apply text-community-blue;
  @apply mb-5 mt-3;
}
form p {
  @apply font-medium mb-5;
}
</style>
