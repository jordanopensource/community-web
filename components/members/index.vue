<template>
  <div v-if="state.loading" class="loader"></div>
  <div v-else-if="!state.loading && state.members.length">
    <h2 class="text-2xl mono" id="members-found-heading">
      {{ state.metaData.totalItems }} members found
    </h2>
    <div v-for="(member, index) in state.members" :key="`item-${index}`">
      <MembersCard :member="member" />
    </div>
  </div>
  <div v-else-if="!state.loading && !state.members.length">
    <p>No Members found</p>
  </div>
  <PaginationBar
    v-if="!state.loading && state.members.length"
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
  loading: true,
  noneJosaMembers: false,
  orderBy: {
    orderBy: '',
    criteria: '',
  },
  members: [],
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

const getMembers = async () => {
  state.loading = true
  let url = `${config.public.communityApiUrl}/member/page/${state.page}?`
  if (state.passedName) {
    url += `name=${state.passedName}&`
  }
  if (state.noneJosaMembers) {
    url += `is_none_josa_member=${state.noneJosaMembers}&`
  }

  if (state.orderBy.orderBy) {
    url += `order_by=${state.orderBy.orderBy}&order_criteria=${state.orderBy.criteria}&`
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      state.members = Object.create(data.items)
      state.metaData = Object.create(data.meta)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      state.loading = false
    })
}

await getMembers()

// search member by name
watch(
  () => (state.passedName = props.name),
  async (newValue) => {
    state.passedName = newValue
    await getMembers()
  }
)

// filter none members
watch(
  () => (state.noneJosaMembers = props.isChecked),
  async () => {
    await getMembers()
  }
)

// Order members
watch(
  () => (state.orderBy = props.sortBy),
  async (sortKey) => {
    const sortArr = sortKey.split(',')
    state.orderBy = { orderBy: sortArr[1], criteria: sortArr[0] }
    await getMembers()
  }
)
</script>
