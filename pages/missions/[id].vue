<template>
  <div>
    <Banner banner-text="Contribute" />
    <div class="container">
      <MissionInfo
        v-if="status === 'success' && missionData?.id"
        :mission="missionData"
      />
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const MISSION_ID = route.params.id

const { data: missionData, status } = await $api(
  `/mission/${MISSION_ID}`,
)
</script>
