<template>
  <div class="input-control">
    <div v-if="props.inputType === 'checkbox'" class="inline-flex">
      <input
        id="check-box"
        @input="$emit('update:value', $event.target.value)"
        :name="props.name"
        :required="props.isRequired"
        :placeholder="props.placeholder"
        :type="props.inputType"
        class="checkbox form-check-input border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      />
      <label class="items-center" for="check-box"> <slot /></label>
    </div>
    <div v-else>
      <label> <slot /></label>
      <input
        v-if="props.inputType !== 'textarea'"
        @input="$emit('update:value', $event.target.value)"
        :name="props.name"
        :required="props.isRequired"
        :placeholder="props.placeholder"
        :type="props.inputType"
      />
      <textarea
        v-else
        rows="5"
        @input="$emit('update:value', $event.target.value)"
        :required="props.isRequired"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
defineEmits(['update:value'])
const value = ref('')
const props = defineProps({
  isRequired: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  name: { type: String, default: '' },
  inputType: String,
})
</script>
<style lang="postcss" scoped>
.input-control input.checkbox {
  @apply w-fit !important;
}
</style>
