<template>
  <div v-if="state.missions?.length">
    <h2 class="text-2xl mono">
      {{ state.metaData.totalItems }} missions found
    </h2>
    <div v-for="(mission, index) in state.missions" :key="`item-${index}`">
      <MissionCard :mission="mission" />
    </div>
  </div>
  <div v-else>
    <p>No Missions found</p>
  </div>
  <PaginationBar
    :currentPage="state.page"
    :totalPages="state.metaData.totalPages"
    @switchPage="(newPage) => getMissions((state.page = newPage))"
  />
</template>
<script setup>
import { watch } from 'vue'

const config = useRuntimeConfig()
const state = reactive({
  searchedMission: '',
  assignedMission: false,
  order_by: '',
  missions: {},
  metaData: {},
  page: 1,
})

const props = defineProps({
  mission: {
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

const emit = defineEmits(['setCategories'])

const getMissions = async (currentPage = state.page) => {
  fetch(`${config.COMMUNITY_API_URL}/mission/page/${currentPage}`)
    .then((response) => response.json())
    .then((data) => {
      state.missions = Object.create(data.paginate?.items)
      state.metaData = Object.create(data.paginate?.meta)
      emit('setCategories', data?.categories)
    })
}

const getOrderedMissions = async (query) => {
  fetch(
    `${config.COMMUNITY_API_URL}/mission/page/${state.page}?assigned=${state.assignedMission}&order_by=${query.orderBy}&order_criteria=${query.criteria}`
  )
    .then((response) => response.json())
    .then((data) => {
      state.missions = Object.create(data.paginate?.items)
      state.metaData = Object.create(data.paginate?.meta)
    })
}

const searchMission = async (query) => {
  fetch(`${config.COMMUNITY_API_URL}/mission/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => (state.missions = Object.create(data)))
}

await getMissions()

// search mission by title or description
watch(
  () => (state.searchedMission = props.mission),
  async (newValue) => {
    if (newValue) {
      await searchMission(newValue)
    } else {
      await getMissions()
    }
  }
)

// filter none missions
watch(
  () => (state.assignedMission = props.isChecked),
  async () => {
    console.log(props.isChecked)
    await getMissions()
  }
)

// Order missions
watch(
  () => (state.order_by = props.sortBy),
  (sortKey) => {
    const sortArr = sortKey.split(',')
    const query = { orderBy: sortArr[1], criteria: sortArr[0] }
    getOrderedMissions(query)
  }
)
</script>
