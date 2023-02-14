<template>
  <div class="container input-control">
    <h2 class="text-xl lg:text-2xl">Sign in to JOSA.community</h2>
    <div class="divider-slashes"></div>
    <form>
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
      <NuxtLink @click="$emit('forgotPassword', true)">
        Forgot Password?
      </NuxtLink>
      <FormAppButton
        class="form-submit"
        btn-style="button-flat button-blue-full"
        type="submit"
        :disabled="state.loggingIn"
        @click.prevent="login"
      >
      <!-- FIXME: @click.prevent causes issue in input validation -->
      <div class="flex flex-row justify-center gap-x-4">
        <div v-if="state.loggingIn" class="loader"></div>
        <div>Sign in</div>
      </div>
      </FormAppButton>
    </form>
  </div>
</template>
<script setup>
const emit = defineEmits(['forgotPassword'])

const form = reactive({
  email: '',
  password: '',
})
const state = reactive({
  loggingIn: false
})
const login = async() => {
  state.loggingIn = true
  await useFetch('/api/login', {
    method: "POST",
    body: JSON.stringify({
      "email": form.email,
      "password": form.password
    }),
    onResponse({response}) {
      if(response.ok) {
        state.loggingIn = false
        localStorage.setItem("member", JSON.stringify(response._data))
        useAuth().value = true
        navigateTo('/')
      }
    },
    onResponseError({response}) {
      state.loggingIn = false
      // TODO: handle errors on client side
    }
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
