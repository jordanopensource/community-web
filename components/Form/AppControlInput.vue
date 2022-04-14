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
