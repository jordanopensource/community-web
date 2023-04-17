<template>
  <div class="input-control">
    <label>
      <slot />
    </label>
    <div class="dropdown-wrapper">
      <div v-if="state.selectedItem" class="selected-item">
        <img
          class="w-1/12"
          alt="avatar"
          :src="
            state.selectedItem.avatar
              ? state.selectedItem.avatar
              : '/images/placeholders/avatar.png'
          "
        />
        <span class="my-auto ml-4"
          >{{ state.selectedItem.first_name_en }}
          {{ state.selectedItem.last_name_en }}</span
        >
      </div>
      <div class="dropdown-popover">
        <form @submit.prevent="onSubmit">
          <input
            class="input-field"
            type="text"
            :placeholder="placeholderText"
            v-model="state.searchQuery"
          />
          <svg
            @submit="onSubmit"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"
              fill="rgba(153,153,153,1)"
            />
          </svg>
        </form>
        <div class="options" :class="state.isVisible ? 'visible' : 'invisible'">
          <ul>
            <li
              @click="selectedItem(member)"
              v-for="(member, index) in state.members"
              :key="`member-${index}`"
              class="flex flex-row"
            >
              <img
                class="w-1/12"
                alt="avatar"
                :src="
                  member.avatar
                    ? member.avatar
                    : '/images/placeholders/avatar.png'
                "
              />
              <span class="my-auto ml-4">
                {{ member.first_name_en }} {{ member.last_name_en }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
const config = useRuntimeConfig()

// Define emit events
const emit = defineEmits(['emitSelected'])

// Define component States
const state = reactive({
  searchQuery: '',
  selectedItem: null,
  isVisible: false,
  members: [],
})

// Define passed props
const props = defineProps({
  placeholderText: {
    type: String,
    default: '',
  },
})

const onSubmit = async () => {
  await fetch(
    `${config.public.communityApiUrl}/member/search?q=${state.searchQuery}`
  )
    .then((response) => response.json())
    .then((data) => {
      state.members = Object.assign([], data)
    })

  if (state.members.length) {
    state.isVisible = true
  } else {
    state.isVisible = false
  }
}

// Event Callback function to assign the selected value and emit the value back
const selectedItem = (item) => {
  state.selectedItem = item
  state.isVisible = !state.isVisible
  state.searchQuery = ''

  emit('emitSelected', state.selectedItem)
}
</script>
<style lang="postcss" scoped>
input {
  @apply mb-0 !important;
}

.dropdown-wrapper {
  @apply w-full relative;
  height: 45vh;
}

.selected-item {
  @apply flex flex-row;
}

.dropdown-popover {
  @apply absolute;
  @apply top-24 left-0 right-0;
  @apply bg-white;

  svg {
    @apply absolute;
    @apply top-3 right-3;
  }

  .options {
    border: 1px solid #e0dddb;

    ul {
      @apply list-none;
      @apply overflow-y-auto;
      @apply max-h-44;
    }

    li {
      border-bottom: 1px solid #e0dddb;
      @apply m-0 p-3;
    }

    li:hover {
      @apply bg-community-blue text-community-grey-light cursor-pointer;
    }
  }
}
</style>
