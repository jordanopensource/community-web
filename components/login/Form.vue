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
    The email and password you entered did not match our records. Please double-check and try again.
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
      <NuxtLink @click="$emit('forgotPassword', true)" href="#">
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
const { data, signIn } = useAuth()

const form = reactive({
  email: '',
  password: '',
})
const state = reactive({
  loading: false,
  error: false
})
const login = async() => {
  state.error = false
  state.loading = true

  await signIn({
    email: form.email,
    password: form.password
  }, {
    callbackUrl: "/"
  })
  .catch((error) => {
    console.error("Error while signing in: ", error)
    state.error = true
  })
  .finally(async () => {
    const member = data.value
    if (member?.id && member.username === form.email) {
      console.info(`${member.username} is logged in!`)
      userId().value = member.id
      isAuth().value = true
      localStorage.setItem('userId', userId().value)
      await useFetchMember()
    }
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
