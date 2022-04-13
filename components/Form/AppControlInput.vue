<template>
  <div class="input-control">
    <label> <slot /></label>
    <input
      v-if="props.inputType !== 'textarea'"
      @input="$emit('update:value', $event.target.value)"
      :required="props.isRequired"
      :type="props.inputType"
    />
    <textarea
      v-else
      rows="5"
      @input="$emit('update:value', $event.target.value)"
      :required="props.isRequired"
    ></textarea>
  </div>
</template>

<script setup>
defineEmits(['update:value'])
const value = ref('')
const props = defineProps({
  isRequired: { type: String, default: '' },
  inputType: String,
})
</script>

<style lang="postcss" scoped>
input {
  @apply w-full p-4 rounded-sm;
}

input::placeholder {
  @apply text-josa-warm-grey-dark;
}

textarea::placeholder {
  @apply text-josa-warm-grey-dark;
}

.input-control label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #e0dddb;
  padding: 10px;
  margin-bottom: 1rem;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #f7f6f5;
  outline: none;
}
</style>
