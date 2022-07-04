<template>
  <div v-if="state.members?.length">
    <div v-for="(member, index) in state.members" :key="`item-${index}`">
      <MembersCard :member="member" />
    </div>
  </div>
  <div v-else>
    <p>No Members found</p>
  </div>
  <MembersPaginationBar
    :currentPage="state.page"
    :totalPages="state.metaData.totalPages"
    @switchPage="(newPage) => getMembers((state.page = newPage))"
  />
</template>
<script setup>
import { watch } from 'vue'

const config = useRuntimeConfig()
const state = reactive({
  passedName: '',
  isNoneMember: false,
  sortBy: '',
  members: {},
  metaData: {},
  page: 1,
})

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  sortBy: {
    type: String,
    default: '',
  },
})

const getMembers = async (currentPage) => {
  fetch(`${config.BASE_API_URL}/member/page/${currentPage}`)
    .then((response) => response.json())
    .then((data) => {
      state.members = Object.create(data.items)
      state.metaData = Object.create(data.meta)
    })
}

const searchMember = async (query) => {
  fetch(`${config.BASE_API_URL}/member/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => (state.members = Object.create(data)))
}

await getMembers(state.page)

// search member by name
watch(
  () => (state.passedName = props.name),
  async (newValue) => {
    if (newValue) {
      await searchMember(newValue)
    } else {
      await getMembers()
    }
  }
)

// filter none members
watch(
  () => (state.isNoneMember = props.isChecked),
  async (checked) => {
    if (checked) {
      state.members.items = state.allMembers.items.filter(
        (member) => !member.josa_id
      )
    } else {
      await getMembers()
    }
  }
)

// Order members
watch(
  () => (state.sortBy = props.sortBy),
  (sortKey) => {
    switch (sortKey) {
      case 'firstName':
        state.members.items.sort((a, b) =>
          a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1
        )
        break
      case 'lastName':
        state.members.items.sort((a, b) =>
          a.last_name.toLowerCase() > b.last_name.toLowerCase() ? 1 : -1
        )
        break
      case 'firstNameRev':
        state.members.items.sort((a, b) =>
          a.first_name.toLowerCase() < b.first_name.toLowerCase() ? 1 : -1
        )
        break
      case 'lastNameRev':
        state.members.items.sort((a, b) =>
          a.last_name.toLowerCase() < b.last_name.toLowerCase() ? 1 : -1
        )
        break
      default:
        break
    }
  }
)
</script>
