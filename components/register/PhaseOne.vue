<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <label>Full Name (English)</label>
      <input v-model="form.nameEn" type="text" required />
      <label>Full Name (Arabic)</label>
      <input v-model="form.nameAr" type="text" required />
      <label>Phone Number</label>
      <input v-model="form.phone" type="number" required />
      <label>E-mail</label>
      <input v-model="form.email" type="email" required />
      <label>Github Account</label>
      <input v-model="form.github" />
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
