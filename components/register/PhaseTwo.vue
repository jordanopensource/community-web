<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <FormAppControlInput
        v-model:value="form.help_josa"
        isRequired="required"
        inputType="textarea"
      >
        How can you help JOSA
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.josa_helps"
        isRequired="required"
        inputType="textarea"
      >
        How JOSA can help you
      </FormAppControlInput>
      <div class="text-right">
        <FormAppButton btn-style="button-flat button-blue-full" type="submit"
          >Next &rarr;</FormAppButton
        >
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const form = reactive({
  help_josa: '',
  josa_helps: '',
})

const emit = defineEmits(['toggleNext'])
const onSubmit = () => {
  emit('toggleNext', form)
}
</script>
<style lang="postcss" scoped></style>
