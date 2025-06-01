<template>
  <div class="container input-control">
    <h2 class="text-xl lg:text-2xl">Sign in to JOSA.community</h2>
    <div class="divider-slashes"></div>
    <Message
      v-if="state.error"
      title="Error Signing In"
      type="error"
      class="mb-4"
      :show-close-btn="false"
    >
      <span class="text-community-blue"
        >Error Status code: {{ state.errorCode }}</span
      >
      <br />
      <span v-if="state.errorMessage"> {{ state.errorMessage }}</span>
      <span v-else>
        An unexpected error occurred. Please try again later.
      </span>
    </Message>
    <form @submit.prevent="login">
      <FormAppControlInput
        v-model:value="form.email"
        input-type="email"
        :is-required="true"
      >
        Email
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.password"
        input-type="password"
        :is-required="true"
        :show-password-icon="true"
      >
        Password
      </FormAppControlInput>
      <NuxtLink href="#" @click="$emit('forgotPassword', true)">
        Forgot Password?
      </NuxtLink>
      <FormAppButton
        class="form-submit"
        btn-style="button-flat button-blue-full"
        type="submit"
        :disabled="state.loading"
      >
        <div class="flex flex-row justify-center gap-x-4">
          <div v-if="state.loading" class="loader"></div>
          <div>Sign in</div>
        </div>
      </FormAppButton>
    </form>
  </div>
</template>
<script setup>
  const emit = defineEmits(['forgotPassword'])

  const { refresh } = useAuth()
  const form = reactive({
    email: '',
    password: '',
  })
  const state = reactive({
    loading: false,
    error: false,
    errorMessage: '',
    errorCode: '',
  })
  const login = async () => {
    state.error = false
    state.loading = true

    await $fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })
      .then(async (response) => {
        const memberSession = response.session
        if (memberSession?.id && memberSession.username === form.email) {
          await updateUserId(memberSession.id)
          // Refresh Nuxt Auth state to sync with cookies
          await refresh()
          await useFetchMember(memberSession.id)
          // NOTE: External navigation is required to avoid issues with Nuxt's internal routing for full reload behavior
          await navigateTo(response.redirectTo || '/', { external: true })

        }
      })
      .catch((error) => {
        console.error('Error [AUTH | LOGIN]:', error.status, error.message)
        state.errorCode = error.status
        state.errorMessage =
          error.message.split(':')[3]?.trim().split(' ')[1]?.trim() || ''
        state.error = true
      })
      .finally(async () => {
        state.loading = false
      })
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
    @apply mb-10;
  }
</style>
