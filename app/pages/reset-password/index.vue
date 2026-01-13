<template>
  <div>
    <Banner banner-text="Reset your password" />
    <ResetPasswordForm v-if="state.isValid" />
    <div v-else class="container my-5">
      <Message title="Invalid token" type="error" :show-close-btn="false">
        The link you entered is invalid or expired.
      </Message>
      <div class="flex flex-row justify-between mt-4">
        <NuxtLink to="/login"> Login </NuxtLink>
        <NuxtLink to="/"> Return to homepage </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const state = reactive({
  token: route.query.token,
  isValid: true,
})

const verifyToken = async () => {
  const url = `/auth/verify?token=${state.token}`
  $api(url, {
    onResponse({ response }) {
      state.isValid = response._data.success
    },
  })
}

onMounted(async () => {
  verifyToken()
})
</script>
<style scoped lang="postcss"></style>
