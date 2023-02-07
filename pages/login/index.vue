<template>
  <div>
    <Banner banner-text="Sign in" />
    <div class="container">
      <LoginForm
        v-if="!state.forgotPassword"
        @forgot-password="(s) => (state.forgotPassword = s)"
      />
      <LoginForgotPassword
        v-else
        @forgot-password="(s) => (state.forgotPassword = s)"
      />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ['login-page'],
})

const state = reactive({
  forgotPassword: false,
})
</script>
