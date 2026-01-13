/**
 * Composable for handling form data persistence using localStorage
 * Provides methods to save, load, and clear form state
 */
import { ref, watch, onMounted } from 'vue'

export const useFormPersistence = (storageKey, initialData = {}) => {
  const formData = ref({ ...initialData })
  const isLoaded = ref(false)

  // Save data to localStorage
  const saveToStorage = (data) => {
    if (process.client) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data))
      } catch (error) {
        console.warn(
          `Failed to save data to localStorage with key ${storageKey}:`,
          error,
        )
      }
    }
  }

  // Load data from localStorage
  const loadFromStorage = () => {
    if (process.client) {
      try {
        const savedData = localStorage.getItem(storageKey)
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          formData.value = { ...initialData, ...parsedData }
        }
        isLoaded.value = true
      } catch (error) {
        console.warn(
          `Failed to load data from localStorage with key ${storageKey}:`,
          error,
        )
        clearStorage()
        isLoaded.value = true
      }
    }
  }

  // Clear data from localStorage
  const clearStorage = () => {
    if (process.client) {
      try {
        localStorage.removeItem(storageKey)
        formData.value = { ...initialData }
      } catch (error) {
        console.warn(
          `Failed to clear data from localStorage with key ${storageKey}:`,
          error,
        )
      }
    }
  }

  // Check if data exists in localStorage
  const hasStoredData = () => {
    if (process.client) {
      try {
        const data = localStorage.getItem(storageKey)
        if (!data || data === 'null') return false

        // Parse and check if it's empty object
        const parsedData = JSON.parse(data)
        return Object.keys(parsedData).length > 0
      } catch (error) {
        return false
      }
    }
    return false
  }

  // Update form data and save to storage
  const updateFormData = (newData) => {
    formData.value = { ...formData.value, ...newData }
    saveToStorage(formData.value)
  }

  // Watch for changes and auto-save
  watch(formData, (newData) => {
    if (isLoaded.value) {
      saveToStorage(newData)
    }
  })

  // Load data on mount
  onMounted(() => {
    loadFromStorage()
  })

  return {
    formData,
    isLoaded,
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData,
    updateFormData,
  }
}

/**
 * Specific composable for registration form persistence
 */
export const useRegistrationPersistence = () => {
  const STORAGE_KEYS = {
    FORM_DATA: 'josa_registration_form_data',
    CURRENT_STEP: 'josa_registration_current_step',
  }

  const step = ref(1)
  const {
    formData,
    isLoaded,
    updateFormData,
    clearStorage: clearFormData,
  } = useFormPersistence(STORAGE_KEYS.FORM_DATA)

  // Save current step
  const saveStep = (currentStep) => {
    if (process.client) {
      try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, currentStep.toString())
      } catch (error) {
        console.warn('Failed to save current step:', error)
      }
    }
  }

  // Load current step
  const loadStep = () => {
    if (process.client) {
      try {
        const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP)
        const savedFormData = localStorage.getItem(STORAGE_KEYS.FORM_DATA)

        if (savedStep) {
          const parsedStep = parseInt(savedStep, 10)

          // If step is 4 (thank you page) but no form data exists,
          // it means the form was completed and we should start fresh
          if (parsedStep === 4 && (!savedFormData || savedFormData === '{}')) {
            step.value = 1
            // Clear the step data to prevent confusion
            localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP)
            return
          }

          if (parsedStep >= 1 && parsedStep <= 4) {
            step.value = parsedStep
          }
        }
      } catch (error) {
        console.warn('Failed to load current step:', error)
      }
    }
  }

  // Clear all registration data
  const clearAllData = () => {
    clearFormData()
    if (process.client) {
      try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP)
      } catch (error) {
        console.warn('Failed to clear step data:', error)
      }
    }
    step.value = 1
  }

  // Special method to clear only form data but keep step (for after submission)
  const clearFormDataOnly = () => {
    clearFormData()
  }

  // Watch step changes and save
  watch(step, (newStep) => {
    saveStep(newStep)
  })

  // Load step on mount
  onMounted(() => {
    loadStep()
  })

  return {
    step,
    formData,
    isLoaded,
    updateFormData,
    saveStep,
    loadStep,
    clearAllData,
    clearFormDataOnly,
  }
}
