<template>
  <div class="container input-control">
    <Message
      v-if="!state.passwordsMatch"
      title="Passwords do not match"
      type="error"
      class="mb-4"
    >
      Please make sure that the password match in both fields.
    </Message>
    <form v-if="!state.resetSuccess" @submit.prevent="reset">
      <FormAppControlInput
        v-model:value="form.password_1"
        input-type="password"
        :is-required="true"
        :show-password-icon="true"
      >
        New password
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.password_2"
        input-type="password"
        :is-required="true"
        :show-password-icon="true"
      >
        Confirm new password
      </FormAppControlInput>
      <FormAppButton
        class="form-submit"
        btn-style="button-flat button-blue-full"
        type="submit"
        :disabled="state.loading"
      >
        <div class="flex flex-row justify-center gap-x-4">
          <div v-if="state.loading" class="loader"></div>
          <div>Reset password</div>
        </div>
      </FormAppButton>
    </form>
    <div v-if="state.resetSuccess" class="success-container">
      <Message title="Success" type="success" :showCloseBtn="false">
        Your password has been successfully reset.
      </Message>
      <div class="flex flex-row justify-between mt-4">
        <NuxtLink to="/login"> Login </NuxtLink>
        <NuxtLink to="/"> Return to homepage </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()

const form = reactive({
  password_1: '',
  password_2: '',
})
const state = reactive({
  passwordsMatch: true,
  resetSuccess: false,
  loading: false,
})

const reset = async () => {
  state.passwordsMatch = form.password_1 === form.password_2
  if (state.passwordsMatch) {
    state.loading = true
    const token = useRoute().query.token
    const url = `/auth/reset-password?token=${token}`

    await $api(url, {
      method: 'PATCH',
      body: JSON.stringify({
        password: form.password_1,
      }),
      onResponse({ response }) {
        state.loading = false
        state.resetSuccess = response._data.success
      },
    })
  }
}
</script>
<style lang="postcss" scoped>
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
.success-container a {
  @apply text-left;
  @apply text-community-blue;
}
</style>
