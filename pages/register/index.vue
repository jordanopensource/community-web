<template>
  <div id="register">
    <Banner bannerText="JOSA Membership Form" />
    <div id="register-form" class="main">
      <div v-if="step < 4" class="flex flex-row lg:flex-col">
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
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
definePageMeta({
  middleware: ['register'],
})
const config = useRuntimeConfig()
const step = ref(1)
let formData = reactive({})
if (!config.public.targetEnv === 'development') {
  navigateTo('/')
}
const nextStep = (data) => {
  formData = { ...formData, ...data }
  step.value++
}

const submitForm = (data) => {
  formData = { ...formData, ...data }
  fetch(`${config.public.communityApiUrl}/submission/`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
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
  @apply container;
  @apply my-14;
  @apply flex flex-col lg:flex-row;
}
.main,
.form-container {
  @apply py-10;
}

.form-container {
  @apply bg-white;
  @apply px-10;
  flex-grow: 1;
}
</style>
