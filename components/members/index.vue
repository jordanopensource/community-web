<template>
  <div v-if="!pending && state.members.length">
    <div v-for="(member, index) in state.members" :key="`item-${index}`">
      <MembersCard :member="member" />
    </div>
  </div>
  <div v-else>
    <p>No Members found</p>
  </div>
</template>
<script setup>
import { watch, watchEffect } from 'vue'

const config = useRuntimeConfig()
const state = reactive({
  passedName: '',
  isNoneMember: false,
  sortBy: '',
  members: [],
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

const { data: allMembers, pending } = await useFetch(
  `${config.BASE_API_URL}/member/all`
)

// set the value of the state
watchEffect(() => {
  if (!state.members.length) {
    state.members = Object.create(allMembers)
  }
})

// filter member by name
watch(
  () => (state.passedName = props.name),
  (newValue) => {
    if (newValue) {
      state.members = allMembers.value.filter(
        (member) =>
          member.first_name.toLowerCase().indexOf(newValue.toLowerCase()) >
            -1 ||
          member.last_name.toLowerCase().indexOf(newValue.toLowerCase()) > -1
      )
    } else {
      state.members = Object.create(allMembers)
    }
  }
)

// filter none members
watch(
  () => (state.isNoneMember = props.isChecked),
  (checked) => {
    if (checked) {
      state.members = allMembers.value.filter((member) => !member.josa_id)
    } else {
      state.members = Object.create(allMembers)
    }
  }
)

watch(
  () => (state.sortBy = props.sortBy),
  (sortKey) => {
    switch (sortKey) {
      case 'firstName':
        state.members.sort((a, b) =>
          a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1
        )
        break
      case 'lastName':
        state.members.sort((a, b) =>
          a.last_name.toLowerCase() > b.last_name.toLowerCase() ? 1 : -1
        )
        break
      case 'firstNameRev':
        state.members.sort((a, b) =>
          a.first_name.toLowerCase() < b.first_name.toLowerCase() ? 1 : -1
        )
        break
      case 'lastNameRev':
        state.members.sort((a, b) =>
          a.last_name.toLowerCase() < b.last_name.toLowerCase() ? 1 : -1
        )
        break
      default:
        break
    }
  }
)
</script>
