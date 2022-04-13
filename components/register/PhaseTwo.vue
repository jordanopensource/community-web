<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <label>How can you help JOSA</label>
      <textarea
        rows="5"
        required="required"
        v-model="form.offerMessage"
      ></textarea>
      <label>How JOSA can help you</label>
      <textarea
        rows="5"
        required="required"
        v-model="form.requestMessage"
      ></textarea>
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
