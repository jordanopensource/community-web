<template>
  <div v-if="state.members?.length">
    <div v-for="(member, index) in state.members" :key="`item-${index}`">
      <MembersCard :member="member" />
    </div>
  </div>
  <div v-else>
    <p>No Members found</p>
  </div>
  <PaginationBar
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
  noneJosaMembers: false,
  order_by: '',
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

const getMembers = async (currentPage = state.page) => {
  fetch(
    `${config.COMMUNITY_API_URL}/member/page/${currentPage}?is_none_josa_member=${state.noneJosaMembers}`
  )
    .then((response) => response.json())
    .then((data) => {
      state.members = Object.create(data?.items)
      state.metaData = Object.create(data?.meta)
    })
    .catch((error) => {
      console.log(error)
    })
}

const getOrderedMembers = async (query) => {
  fetch(
    `${config.COMMUNITY_API_URL}/member/page/${state.page}?order_by=${query.orderBy}&order_criteria=${query.criteria}`
  )
    .then((response) => response.json())
    .then((data) => {
      state.members = Object.create(data?.items)
      state.metaData = Object.create(data?.meta)
    })
    .catch((error) => {
      console.log(error)
    })
}

const searchMember = async (query) => {
  fetch(`${config.COMMUNITY_API_URL}/member/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => (state.members = Object.create(data)))
    .catch((error) => {
      console.log(error)
    })
}

await getMembers()

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
  () => (state.noneJosaMembers = props.isChecked),
  async () => {
    await getMembers()
  }
)

// Order members
watch(
  () => (state.order_by = props.sortBy),
  (sortKey) => {
    const sortArr = sortKey.split(',')
    const query = { orderBy: sortArr[1], criteria: sortArr[0] }
    getOrderedMembers(query)
  }
)
</script>
