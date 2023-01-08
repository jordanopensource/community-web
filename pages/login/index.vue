<template>
  <div class="container">
    <LoginForm
      v-if="!state.forgotPassword"
      @forgot-password="(s) => (state.forgotPassword = s)"
    />
    <LoginResetPassword
      v-else
      @forgot-password="(s) => (state.forgotPassword = s)"
    />
  </div>
</template>
<script setup>
const state = reactive({
  forgotPassword: false,
})
</script>
