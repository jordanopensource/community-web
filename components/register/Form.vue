<template>
  <div id="register-form" class="container form-container">
    <RegisterPhaseOne
      v-if="step === 1"
      @toggleNext="(formData) => nextStep(formData)"
    />
    <RegisterPhaseTwo v-else-if="step === 2" />
    <RegisterPhaseThree v-else-if="step === 3" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const step = ref(1)
const formData = reactive({})
const nextStep = (data) => {
  console.log(data)
  step.value++
}
const previousStep = () => {
  step.value--
}
</script>
<style lang="postcss" scoped>
.form-container {
  @apply bg-white;
  @apply p-10 my-14;
  /* @apply max-w-1/2; */
}
</style>
