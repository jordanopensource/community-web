<template>
  <div class="input-control">
    <label>
      <slot />
    </label>
    <div class="w-full relative" style="height: 45vh;">
      <div v-if="state.selectedItem" class="flex flex-row">
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
      <div class="absolute top-24 left-0 right-0 bg-white z-[1000]">
        <form @submit.prevent="onSubmit">
          <input
            ref="searchInput"
            class="input-field"
            type="text"
            :placeholder="placeholderText"
            v-model="state.searchQuery"
            @focus="onFocus"
            @blur="onBlur"
            @input="onInput"
          />
          <svg
            @click="onSubmit"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="absolute top-3 right-3 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"
              fill="rgba(153,153,153,1)"
            />
          </svg>
        </form>
        <div :class="state.isVisible ? 'block' : 'hidden'" style="border: 1px solid #e0dddb; max-height: 300px; overflow-y: auto;">
          <div v-if="state.loading" class="flex flex-col items-center gap-2 p-4 text-center">
            <div class="w-6 h-6 border-2 border-gray-300 border-t-community-blue rounded-full animate-spin mx-auto"></div>
            <span class="text-sm text-gray-500">Loading members...</span>
          </div>
          <ul v-else-if="filteredMembers.length" class="list-none overflow-y-auto max-h-44">
            <li
              @click="selectedItem(member)"
              v-for="(member, index) in filteredMembers"
              :key="`member-${member.id || index}`"
              class="flex flex-row m-0 p-3 hover:bg-community-blue hover:text-community-grey-light hover:cursor-pointer"
              style="border-bottom: 1px solid #e0dddb;"
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
          <div v-else-if="state.searchQuery && !state.loading" class="text-sm italic p-4 text-center text-gray-500">
            No members found matching "{{ state.searchQuery }}"
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref } from 'vue'

// Define emit events
const emit = defineEmits(['emitSelected'])

// Define component States
const state = reactive({
  searchQuery: '',
  selectedItem: null,
  isVisible: false,
  allMembers: [], // Cache all members
  loading: false,
  membersLoaded: false, // Track if we've loaded members
  focusTimeout: null, // For debouncing blur events
})

const searchInput = ref(null)

// Define passed props
const props = defineProps({
  placeholderText: {
    type: String,
    default: '',
  },
})

// Computed property for filtered members
const filteredMembers = computed(() => {
  if (!state.searchQuery.trim()) {
    return state.allMembers
  }

  const query = state.searchQuery.toLowerCase()
  return state.allMembers.filter(member => {
    const firstName = member.first_name_en?.toLowerCase() || ''
    const lastName = member.last_name_en?.toLowerCase() || ''
    const fullName = `${firstName} ${lastName}`

    return firstName.includes(query) ||
           lastName.includes(query) ||
           fullName.includes(query)
  })
})

// Load all members (called once on component mount or first focus)
const loadAllMembers = async () => {
  if (state.membersLoaded || state.loading) return

  state.loading = true

  try {
    // Use the correct paginated API endpoint
    const data = await $api('/member/page/1?is_none_josa_member=false')
    state.allMembers = data?.items || []
    state.membersLoaded = true
  } catch (error) {
    console.error('Error loading members:', error)
    state.allMembers = []
  } finally {
    state.loading = false
  }
}

// Search for specific members (when user types and hits enter)
const searchMembers = async (query) => {
  if (!query.trim()) {
    return
  }

  state.loading = true

  try {
    // Use the correct paginated API endpoint with name filter
    const data = await $api(`/member/page/1?is_none_josa_member=false&name=${encodeURIComponent(query)}`)

    // Merge search results with cached members (avoid duplicates)
    const searchResults = data?.items || []
    const existingIds = new Set(state.allMembers.map(m => m.id))
    const newMembers = searchResults.filter(m => !existingIds.has(m.id))

    state.allMembers = [...state.allMembers, ...newMembers]
  } catch (error) {
    console.error('Error searching members:', error)
  } finally {
    state.loading = false
  }
}

// Handle input focus - show dropdown and load members if needed
const onFocus = async () => {
  // Clear any pending blur timeout
  if (state.focusTimeout) {
    clearTimeout(state.focusTimeout)
    state.focusTimeout = null
  }

  await loadAllMembers()
  state.isVisible = true
}

// Handle input blur - hide dropdown after a short delay
const onBlur = () => {
  // Delay hiding to allow clicks on dropdown items
  state.focusTimeout = setTimeout(() => {
    state.isVisible = false
  }, 200)
}

// Handle input changes - filter existing members
const onInput = () => {
  // Show dropdown if hidden and there's content
  if (!state.isVisible && state.searchQuery.trim()) {
    state.isVisible = true
  }

  // If dropdown is visible, we don't need to do anything else
  // The computed filteredMembers will handle the filtering
}

// Handle form submission (Enter key) - search for more members
const onSubmit = async () => {
  if (state.searchQuery.trim()) {
    await searchMembers(state.searchQuery.trim())
    state.isVisible = true
  }
}

// Event Callback function to assign the selected value and emit the value back
const selectedItem = (item) => {
  state.selectedItem = item
  state.isVisible = false
  state.searchQuery = ''

  // Clear any pending blur timeout
  if (state.focusTimeout) {
    clearTimeout(state.focusTimeout)
    state.focusTimeout = null
  }

  emit('emitSelected', state.selectedItem)
}

</script>
<style lang="postcss" scoped>
input {
  margin-bottom: 0 !important;
}

li:last-child {
  border-bottom: none !important;
}
</style>
