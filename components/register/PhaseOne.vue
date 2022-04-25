<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <FormAppControlInput v-model:value="form.name_en" :isRequired="true">
        Full Name (English)
      </FormAppControlInput>
      <FormAppControlInput v-model:value="form.name_ar" :isRequired="true">
        Full Name (Arabic)
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.phone"
        inputType="number"
        :isRequired="true"
        >Phone Number</FormAppControlInput
      >
      <FormAppControlInput
        v-model:value="form.email"
        inputType="email"
        :isRequired="true"
      >
        E-mail
      </FormAppControlInput>
      <FormAppControlInput v-model:value="form.github"
        >Github Account</FormAppControlInput
      >
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
  name_en: '',
  name_ar: '',
  phone: '',
  email: '',
  github: '',
})

const emit = defineEmits(['toggleNext'])
const onSubmit = () => {
  emit('toggleNext', form)
}
</script>
<style lang="postcss" scoped></style>
