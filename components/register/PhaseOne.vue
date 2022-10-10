<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <FormAppControlInput
        v-model:value="form.first_name_en"
        :isRequired="true"
      >
        First Name (English)
      </FormAppControlInput>
      <!-- <FormAppControlInput
        v-model:value="form.first_middle_name_en"
        :isRequired="true"
      >
        Second Name (English)
      </FormAppControlInput> -->
      <!-- <FormAppControlInput
        v-model:value="form.second_middle_name_en"
        :isRequired="true"
      >
        Middle Name (English)
      </FormAppControlInput> -->
      <FormAppControlInput v-model:value="form.last_name_en" :isRequired="true">
        Last Name (English)
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.first_name_ar"
        :isRequired="true"
      >
        First Name (Arabic)
      </FormAppControlInput>
      <!-- <FormAppControlInput
        v-model:value="form.first_middle_name_ar"
        :isRequired="true"
      >
        Second Name (Arabic)
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.second_middle_name_ar"
        :isRequired="true"
      >
        Middle Name (Arabic)
      </FormAppControlInput> -->
      <FormAppControlInput v-model:value="form.last_name_ar" :isRequired="true">
        Last Name (Arabic)
      </FormAppControlInput>
      <FormAppControlInput
        v-model:value="form.phone"
        inputType="tel"
        :isRequired="true"
        placeholder="962799888777"
        pattern="+[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}"
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
  first_name_en: '',
  // first_middle_name_en: '',
  // second_middle_name_en: '',
  last_name_en: '',
  first_name_ar: '',
  // first_middle_name_ar: '',
  // second_middle_name_ar: '',
  last_name_ar: '',
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
