<template>
  <div class="input-control">
    <div v-if="props.inputType === 'checkbox'" class="inline">
      <input
        v-if="props.isChecked"
        id="check-box"
        checked
        @input="$emit('update:value', $event.target.checked)"
        :name="props.name"
        :required="props.isRequired"
        :placeholder="props.placeholder"
        :type="props.inputType"
        class="checkbox form-check-input border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      />
      <input
        v-else
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
  isChecked: {type: Boolean, default: false}
})
</script>
<style lang="postcss" scoped>
.input-control input.checkbox {
  @apply w-fit !important;
}

.interactive-control {
  @apply inline rounded-r-none;
}
</style>
