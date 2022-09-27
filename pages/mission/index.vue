<template>
  <Banner bannerText=" Contribute" />
  <section class="container my-16">
    <div class="flex flex-col lg:flex-row-reverse lg:gap-x-8">
      <div class="shrink-0">
        <MissionFilter
          @searchMission="(mission) => (state.searchMission = mission)"
          @filterMissions="(isChecked) => (state.isAssignedMission = isChecked)"
          @sortMissions="(orderBy) => (state.sortBy = orderBy)"
        />
        <MissionCategoryFilter />
      </div>
      <div class="grow">
        <Mission
          :mission="state.searchMission"
          :isChecked="state.isAssignedMission"
          :sortBy="state.sortBy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  sortBy: '',
  searchMission: '',
  isAssignedMission: false,
})
</script>
