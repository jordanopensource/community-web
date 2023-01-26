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
        @click.prevent="login"
      >
        Sign in
      </FormAppButton>
    </form>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
const emit = defineEmits(['forgotPassword'])

const form = reactive({
  email: '',
  password: '',
})
const state = reactive({
  token: '',
  userId: '',
  authorized: false,
})

const storeMemberData = () => {
  return new Promise((resolve, reject) => {
    fetch(`${config.public.COMMUNITY_API_URL}/member/${useCookie('auth').value.userId}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data) {
        localStorage.setItem("member", JSON.stringify(data.member));
        resolve();
      } else {
        reject();
      }
    }).catch((error) => {
      console.log(error);
      reject();
    })
  });
}

// TODO: separate authentication in a composable
const login = async() => {
  await useFetch('/api/login', {
    method: "POST",
    body: JSON.stringify({
      "email": form.email,
      "password": form.password
    })
  })
  // userAuth()
  const {data: member} = await useFetch(`${config.public.COMMUNITY_API_URL}/auth/`)
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
