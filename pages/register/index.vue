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
      <!-- Show saved data indicator -->
      <div v-if="isLoaded && hasStoredData && step < 4" class="saved-data-indicator">
        <div class="alert alert-info">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <span>Your previous form data has been restored. You can continue where you left off!</span>
          <button @click="clearAllData" class="clear-btn" type="button">
            Start Fresh
          </button>
        </div>
      </div>

      <label v-if="step < 4" class="text-community-red text-xs lg:text-sm font-bold mb-4">
        Fields that are marked with an asterisk (*) are required.
      </label>
        <RegisterPhaseOne
          v-if="step === 1"
          class="form-wrapper"
          :initialData="formData"
          @toggleNext="(formData) => nextStep(formData)"
        />
        <RegisterPhaseTwo
          v-else-if="step === 2"
          class="form-wrapper"
          :initialData="formData"
          @toggleNext="(formData) => nextStep(formData)"
        />
        <RegisterPhaseThree
          v-else-if="step === 3"
          class="form-wrapper"
          :initialData="formData"
          @toggleSubmit="(formData) => submitForm(formData)"
        />
        <RegisterFormThanks v-else />
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, nextTick } from 'vue'
  import { useRegistrationPersistence } from '~/composables/useFormPersistence'

  const config = useRuntimeConfig()

  if (!config.public.targetEnv === 'development') {
    navigateTo('/')
  }

  // Use the composable for form persistence
  const { step, formData, isLoaded, updateFormData, clearAllData: originalClearAllData, clearFormDataOnly } = useRegistrationPersistence()

  // Create a reactive trigger for checking stored data
  const storageCheckTrigger = ref(0)

  // Computed property to check if there's stored data
  const hasStoredData = computed(() => {
    // Access the trigger to make this reactive
    storageCheckTrigger.value

    if (!process.client || !isLoaded.value) return false

    try {
      const formDataString = localStorage.getItem('josa_registration_form_data')
      const stepDataString = localStorage.getItem('josa_registration_current_step')

      // Check if form data exists and is not empty
      const hasFormData = formDataString && formDataString !== '{}' && formDataString !== 'null'

      // Check if step data exists and is a valid in-progress step (2 or 3)
      // Step 1 with no form data = fresh start, Step 4 = completed (should be cleared)
      const hasValidStepData = stepDataString &&
        (stepDataString === '2' || stepDataString === '3' ||
         (stepDataString === '1' && hasFormData))

      return hasFormData || hasValidStepData
    } catch (error) {
      return false
    }
  })

  // Enhanced clear function that updates UI state
  const clearAllData = () => {
    originalClearAllData()
    // Trigger reactivity update
    storageCheckTrigger.value++
  }

  const nextStep = (data) => {
    updateFormData(data)
    step.value++
  }

  const submitForm = async (data) => {
    updateFormData(data)

    await $api(
      `submission/`,
      {
        method: 'POST',
        body: formData.value,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => {
        console.log(res)
        step.value = 4 // Move to thank you page
        // Clear all form data after successful submission
        // This will clear both form data and step data to prepare for next use
        setTimeout(() => {
          originalClearAllData()
          storageCheckTrigger.value++
        }, 300000) // Give time for thank you page to render (5 minutes)
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

  .saved-data-indicator {
    @apply mb-6;
  }

  .alert {
    @apply p-4 rounded-lg border;
  }

  .alert-info {
    @apply bg-blue-50 border-blue-200 text-blue-800;
    @apply flex items-center gap-3;
  }

  .alert svg {
    @apply flex-shrink-0;
  }

  .alert span {
    @apply flex-1;
  }

  .clear-btn {
    @apply ml-3 px-3 py-1 text-xs font-medium;
    @apply bg-blue-600 text-white rounded;
    @apply hover:bg-blue-700 transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1;
  }
</style>
