<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <FormAppControlInput v-model:value="form.nameEn" isRequired="required">
        Full Name (English)
      </FormAppControlInput>
      <FormAppControlInput v-model:value="form.nameAr" isRequired="required">
        Full Name (Arabic)
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.phone"
        inputType="number"
        isRequired="required"
        >Phone Number</FormAppControlInput
      >
      <FormAppControlInput
        v-model:value="form.email"
        inputType="email"
        isRequired="required"
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
  nameEn: '',
  nameAr: '',
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
