<template>
  <div class="input-control">
    <div
      v-if="props.inputType === 'checkbox'"
      class="checkbox-container inline"
    >
      <input
        id="check-box"
        @input="$emit('update:value', $event.target.checked)"
        :name="props.name"
        :required="props.isRequired"
        :placeholder="props.placeholder"
        :type="props.inputType"
        class="checkbox form-check-input border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      />
      <label class="items-center" for="check-box"> <slot /></label>
    </div>
    <div v-else>
      <div v-if="$props.showSlot">
        <label> <slot /></label>
      </div>
      <input
        v-if="props.inputType !== 'textarea'"
        @input="$emit('update:value', $event.target.value)"
        :name="props.name"
        :required="props.isRequired"
        :placeholder="props.placeholder"
        :type="props.inputType"
        :pattern="props.pattern"
        class="interactive-control"
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
  showSlot: { type: Boolean, default: true },
  pattern: '',
  inputType: String,
})
</script>
<style lang="postcss" scoped>
.input-control input.checkbox {
  @apply w-fit !important;
}

.checkbox-container {
  @apply flex items-start;
}

.checkbox-container label {
  @apply flex cursor-pointer items-start;
}

.checkbox-container input[type='checkbox'] {
  @apply cursor-pointer opacity-0 absolute;
}

.checkbox-container label::before {
  @apply flex justify-center items-center;
  @apply text-transparent bg-white w-4 h-4;
  @apply border border-neutral-300 border-solid rounded-sm;
  @apply mr-1.5 mt-1;
  content: '';
}
.checkbox-container input[type='checkbox']:checked + label::before {
  @apply w-4 h-4 flex justify-center items-center;
  @apply text-white text-base;
  @apply border-solid border;
  content: '';
  background-image: url('icons/icon-checkbox.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0.675rem;
  background-color: #0c97ac;
  border-color: #0c97ac;
}
.interactive-control {
  @apply inline rounded-r-none;
}
</style>
