<template>
  <div>
    <Banner bannerText=" Contribute" />
    <section class="container my-16">
      <div class="flex flex-col lg:flex-row-reverse lg:gap-x-8">
        <div class="shrink-0">
          <MissionFilter
            @searchMission="(mission) => (state.searchMission = mission)"
            @filterMissions="
              (isChecked) => (state.selectedMissionCriteria = isChecked)
            "
            @sortMissions="(orderBy) => (state.sortBy = orderBy)"
          />
          <MissionCategoryFilter
            :categories="state.categories"
            @filterMissionBy="
              (criteria) => (state.selectedMissionCriteria = criteria)
            "
            @filterByPoints="
              (points) => (state.selectedMissionCriteria = points)
            "
          />
        </div>
        <div class="grow">
          <Mission
            :mission="state.searchMission"
            :sortBy="state.sortBy"
            :selectedMissionCriteria="state.selectedMissionCriteria"
            @setCategories="(categories) => (state.categories = categories)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  sortBy: '',
  searchMission: '',
  categories: [],
  selectedMissionCriteria: '',
})
</script>
