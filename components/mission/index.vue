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
    v-if="state.missions?.length"
  />
</template>
<script setup>
import { watch } from 'vue'

const config = useRuntimeConfig()
const state = reactive({
  searchedMission: '',
  assignedMission: false,
  orderBy: {
    orderBy: '',
    criteria: '',
  },
  missions: [],
  metaData: {},
  page: 1,
  selectedCriteria: '',
})

const props = defineProps({
  mission: {
    type: String,
    default: '',
  },
  sortBy: {
    type: String,
    default: '',
  },
  selectedMissionCriteria: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['setCategories'])

const getMissions = async () => {
  let url = `${config.COMMUNITY_API_URL}/mission/page/${state.page}?`

  if (props.selectedMissionCriteria) {
    url += `${props.selectedMissionCriteria?.key}=${props.selectedMissionCriteria?.value}&`
  }

  if (state.assignedMission) {
    url += `assigned=${state.assignedMission}&`
  }

  if (state.orderBy.orderBy) {
    url += `order_by=${query.orderBy}&order_criteria=${query.criteria}&`
  }

  if (state.searchedMission) {
    url += `title=${state.searchedMission}&`
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      state.missions = Object.create(data.paginate?.items)
      state.metaData = Object.create(data.paginate?.meta)
      emit('setCategories', data?.categories)
    })
    .catch((error) => {
      console.log(error)
    })
}

await getMissions()

// search mission by title or description
watch(
  () => (state.searchedMission = props.mission),
  async (newValue) => {
    state.searchedMission = newValue
    await getMissions()
  }
)

// filter missions by category
watch(
  () => (state.selectedCriteria = props.selectedMissionCriteria),
  async () => {
    await getMissions()
  }
)

// Order missions
watch(
  () => (state.order_by = props.sortBy),
  async (sortKey) => {
    const sortArr = sortKey.split(',')
    state.orderBy = { orderBy: sortArr[1], criteria: sortArr[0] }
    await getMissions(query)
  }
)
</script>
