<template>
  <UnderConstruction v-if="config.BETA_RELEASE" />
</template>

<script setup>
const config = useRuntimeConfig()
</script>
