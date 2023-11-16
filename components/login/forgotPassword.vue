<template>
  <div class="container input-control">
    <h2 class="text-xl lg:text-2xl">Reset your Password</h2>
    <div class="divider-slashes"></div>
    <form
      v-if="!state.success"
      @submit.prevent="sendEmail"
    >
      <Message
        v-if="state.error && !state.loading"
        title="Error"
        type="error"
        class="mb-4"
      >
        Reset email was not sent. Make sure the email address you used is registered on JOSA.community.
      </Message>
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
        :disabled="state.loading"
      >
        <div class="flex flex-row justify-center gap-x-4">
          <div v-if="state.loading" class="loader"></div>
          <div>Send password reset email</div>
        </div>
      </FormAppButton>
      <NuxtLink @click="$emit('forgotPassword', false)">
        Back to sign in
      </NuxtLink>
    </form>
    <div v-else class="success-container">
      <Message title="Success" type="success" :showCloseBtn="false">
        An email with a link to reset your password was sent to {{ form.email }}
      </Message>
      <div class="flex flex-row justify-between mt-4">
        <NuxtLink @click="$emit('forgotPassword', false)">
          Login
        </NuxtLink>
        <NuxtLink to="/">
          Return to homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['forgotPassword'])
const route = useRoute()

const state = reactive({
  loading: false,
  success: false,
  error: false,
})
const form = reactive({
  email: '',
})
if (route.query.email) {
  form.email = route.query.email
}
const sendEmail = async () => {
  state.loading = true
  await $fetch.raw('/api/forgot-password/send-email', {
    method: 'POST',
    body: JSON.stringify({
      'email': form.email
    }),
    onResponse({response}) {
      state.loading = false
      state.success = response._data.success
      if (!state.success) {
        state.error = true
      }
    }
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
.success-container a {
  @apply text-left;
  @apply text-community-blue;
}
</style>
