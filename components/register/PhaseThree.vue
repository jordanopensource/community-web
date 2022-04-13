<template>
  <div class="input-control">
    <form @submit.prevent="onSubmit">
      <label
        >Do you know how a current JOSA member that would vouch for you?</label
      >
      <div class="dropdown-wrapper">
        <div class="selected-item">
          <span v-if="state.selectedMember">{{
            state.selectedMember.name
          }}</span>
        </div>
        <div class="dropdown-popover">
          <input
            @input="state.isVisible = !state.isVisible"
            type="text"
            placeholder="Search for JOSA member"
            v-model="state.searchQuery"
          />
          <svg
            :class="state.isVisible ? 'dropdown' : ''"
            class="drop-down-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
            />
          </svg>
          <span v-if="filteredMembers === 0">No Member found</span>
          <div
            class="options"
            :class="state.isVisible ? 'visible' : 'invisible'"
          >
            <ul>
              <li
                @click="selectedMember(member)"
                v-for="(member, index) in filteredMembers"
                :key="`member-${index}`"
              >
                {{ member.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="floating-button">
          <button class="button-flat button-blue-full" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const referral = ref(0)
const state = reactive({
  searchQuery: '',
  selectedMember: null,
  isVisible: false,
  memberArray: [],
})

const filteredMembers = computed(() => {
  if (state.searchQuery === '') {
    return state.memberArray
  }
  const query = state.searchQuery.toLowerCase()
  return state.memberArray.filter((member) => {
    return Object.values(member).some((word) => {
      return String(word).toLowerCase().includes(query)
    })
  })
})

const selectedMember = (member) => {
  state.selectedMember = member
  referral.value = state.selectedMember
  state.isVisible = !state.isVisible
  state.searchQuery = ''
}
onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((json) => {
      state.memberArray = json
    })
})

const emit = defineEmits(['toggleSubmit'])
const onSubmit = () => {
  emit('toggleSubmit', { referralID: referral.value.id })
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
  @apply h-10;
}

.floating-button {
  @apply absolute;
  @apply bottom-0 right-0;
}
.dropdown-popover {
  @apply absolute;
  @apply top-11 left-0 right-0;
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
      @apply bg-josa-blue text-josa-warm-grey-light cursor-pointer;
    }
  }
}
</style>
