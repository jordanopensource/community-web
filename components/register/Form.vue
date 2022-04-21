<template>
  <div id="register-form" class="main container">
    <div v-if="step < 4" class="flex flex-col">
      <RegisterIndicator
        :step="step"
        :phaseNumber="`1`"
        :phaseText="`Personal Details`"
      />
      <RegisterIndicator
        :step="step"
        :phaseNumber="`2`"
        :phaseText="`Motivation`"
      />
      <RegisterIndicator
        :step="step"
        :phaseNumber="`3`"
        :phaseText="`Vouching`"
      />
    </div>
    <div class="form-container">
      <RegisterPhaseOne
        v-if="step === 1"
        class="form-wrapper"
        @toggleNext="(formData) => nextStep(formData)"
      />
      <RegisterPhaseTwo
        v-else-if="step === 2"
        class="form-wrapper"
        @toggleNext="(formData) => nextStep(formData)"
      />
      <RegisterPhaseThree
        v-else-if="step === 3"
        class="form-wrapper"
        @toggleSubmit="(formData) => submitForm(formData)"
      />
      <RegisterFormThanks v-else />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

const config = useRuntimeConfig()
const step = ref(1)
let formData = reactive({})
const nextStep = (data) => {
  formData = { ...formData, ...data }
  step.value++
}

const submitForm = (data) => {
  formData = { ...formData, ...data }
  fetch(`${config.API_BASE_URL}/submission/create`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(formData),
  })
    .then((res) => {
      console.log(res)
      step.value++
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
<style lang="postcss" scoped>
.main {
  @apply my-14;
  @apply flex flex-col lg:flex-row;
}
.main,
.form-container {
  @apply py-10 px-20;
}

.form-container {
  @apply bg-white;
  @apply px-10;
  flex-grow: 1;
}
</style>
