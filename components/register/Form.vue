<template>
  <div id="register-form" class="container form-container">
    <RegisterPhaseOne
      v-if="step === 1"
      @toggleNext="(formData) => nextStep(formData)"
    />
    <RegisterPhaseTwo
      v-else-if="step === 2"
      @toggleNext="(formData) => nextStep(formData)"
    />
    <RegisterPhaseThree
      v-else-if="step === 3"
      @toggleSubmit="(formData) => submitForm(formData)"
    />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const step = ref(1)
let formData = reactive({})
const nextStep = (data) => {
  formData = { ...formData, ...data }
  step.value++
}

const submitForm = (data) => {
  formData = { ...formData, ...data }
  console.log(formData)
}
</script>
<style lang="postcss" scoped>
.form-container {
  @apply bg-white;
  @apply p-10 my-14;
}
</style>
