<template>
  <div class="input-control" :class="props.width ? props.width : ''">
    <div
      v-if="props.inputType === 'checkbox'"
      class="flex items-start inline"
    >
      <input
        :id="props.labelId"
        :checked="props.isChecked"
        @change="$emit('checkbox-changed', $event.target.checked)"
        :name="props.name"
        :required="props.isRequired"
        :placeholder="props.placeholder"
        :type="props.inputType"
        class="checkbox form-check-input border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer opacity-0 absolute"
      />
      <label class="flex cursor-pointer items-start" :for="props.labelId">
        <slot />
        <span v-if="props.isRequired" class="text-community-red ml-1 font-bold">*</span>
      </label>
    </div>
    <div v-else>
      <div v-if="$props.showSlot">
        <label>
          <slot />
          <span v-if="props.isRequired" class="text-community-red ml-1 font-bold">*</span>
        </label>
      </div>
      <div
        v-if="props.inputType !== 'textarea' && props.inputType !== 'file'"
        class="flex flex-row"
      >
        <input
          @input="$emit('update:value', $event.target.value)"
          :name="props.name"
          :required="props.isRequired"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :type="state.showPassword ? 'text' : props.inputType"
          :pattern="props.pattern"
          :value="props.value"
          :title="props.title"
          class="inline rounded-r-none"
          :class="props.showPasswordIcon ? 'border-r-0' : ''"
          @focusin="state.pwActive = true"
          @focusout="state.pwActive = false"
        />
        <span v-if="props.showPasswordIcon && props.inputType === 'password'">
          <button
            class="eye-icon"
            :class="[
              state.showPassword ? 'hide' : 'show',
              state.pwActive ? 'focusBg' : '',
            ]"
            @click.prevent="state.showPassword = !state.showPassword"
          ></button>
        </span>
      </div>
      <div
        v-else-if="props.inputType === 'file'"
        :class="
          props.editIcon && 'file-edit-container'
        "
      >
        <input
          @input="$emit('update:value', $event.target.value)"
          :name="props.name"
          :required="props.isRequired"
          :placeholder="props.placeholder"
          :type="state.showPassword ? 'text' : props.inputType"
          :pattern="props.pattern"
          :title="props.title"
          class="inline rounded-r-none"
          :class="props.editIcon ? 'absolute top-0 left-0 opacity-0 cursor-pointer bg-editIconWhite bg-cover' : ''"
          @focusin="state.pwActive = true"
          @focusout="state.pwActive = false"
          :accept="props.acceptedFiles"
        />
      </div>
      <textarea
        v-else
        rows="5"
        @input="$emit('update:value', $event.target.value)"
        :required="props.isRequired"
        :title="props.title"
        >{{ props.value }}</textarea
      >
    </div>
  </div>
</template>

<script setup>
defineEmits(['update:value', 'checkbox-changed'])
const props = defineProps({
  isRequired: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  name: { type: String, default: '' },
  showSlot: { type: Boolean, default: true },
  pattern: '',
  inputType: String,
  isChecked: { type: Boolean, default: false },
  showPasswordIcon: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  editIcon: { type: Boolean, default: false },
  value: { default: '' },
  width: { type: String, default: '' },
  labelId: { type: String, default: '' },
  acceptedFiles: {type: String, default: ''},
  title: { type: String, default: '' }
})

const state = reactive({
  showPassword: false,
  pwActive: false,
})
</script>
<style scoped>
.input-control input.checkbox {
  width: fit-content !important;
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
  background-image: url('~/assets/icons/icon-checkbox.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0.675rem;
  background-color: #0c97ac;
  border-color: #0c97ac;
}

.eye-icon {
  @apply block w-8;
  @apply bg-no-repeat bg-center;
  content: '';
  height: 46.5px;
  background-size: 18px;
  border: 0.8px solid rgb(224, 221, 219);
  border-left: 0;
}
@media screen and (min-width: 768px) {
  .eye-icon {
    height: 49.5px;
  }
}
.eye-icon.show {
  background-image: url('~/assets/icons/icon-eye-opened.svg');
}
.eye-icon.hide {
  background-image: url('~/assets/icons/icon-eye-closed.svg');
}
.eye-icon.focusBg {
  background-color: #f7f6f5;
}

.file-edit-container {
  padding: 1rem;
  width: 0.5rem;
  height: 0.5rem;
  background-image: url('/icons/edit-white.svg');
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid;
  border-radius: 9999px;
  background-size: 1rem;
  background-color: rgb(11 150 171 / 0.2);
}
@media (max-width: 640px) {
  .file-edit-container {
    padding: 0.5rem;
    width: 0.25rem;
    height: 0.25rem;
    background-size: 0.5rem;
  }
}
.file-edit-container:hover {
  background-color: rgb(11 150 171 / 0.8);
}
</style>
