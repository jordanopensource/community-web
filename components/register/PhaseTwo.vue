<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <FormAppControlInput
        v-model:value="form.offerMessage"
        isRequired="required"
        inputType="textarea"
      >
        How can you help JOSA
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.requestMessage"
        isRequired="required"
        inputType="textarea"
      >
        How JOSA can help you
      </FormAppControlInput>
      <div class="text-right">
        <button class="button-flat button-blue-full" type="submit">
          Next &rarr;
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const form = reactive({
  offerMessage: '',
  requestMessage: '',
})

const emit = defineEmits(['toggleNext'])
const onSubmit = () => {
  emit('toggleNext', form)
}
</script>
<style lang="postcss" scoped></style>
