<template>
  <div class="banner" id="closeBanner" v-if="!state.closeBanner">
    <p>
      BUILD:
      <a
        :href="config.public.DRONE_BUILD_LINK"
        target="_blank"
        rel="noopener noreferrer"
      >
        #{{ config.public.DRONE_BUILD_NUMBER }}
      </a>
      <a
        :href="config.public.DRONE_COMMIT_LINK"
        target="_blank"
        rel="noopener noreferrer"
        @mouseenter="show"
        @mouseleave="hide"
      >
        ({{ state.droneCommitSha }})
      </a>
    </p>
    <p>This is {{ config.public.TARGET_ENV }} environment</p>
    <p>Build Timestamp: {{ humanDataFormat() }}</p>
    <button class="bannerBtn" @click="closeBanner">
      <img class="w-9 h-9" src="/icons/lm-icon-close.png" alt="" srcset="" />
    </button>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()

const humanDataFormat = () => {
  const milliseconds = config.public.DRONE_BUILD_FINISHED * 1000
  return new Date(milliseconds).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

const state = reactive({
  droneCommitSha: config.public.DRONE_COMMIT_SHA.slice(0, 6),
  closeBanner: false,
})
const show = () => {
  state.droneCommitSha = config.public.DRONE_COMMIT_SHA
}
const hide = () => {
  state.droneCommitSha = config.public.DRONE_COMMIT_SHA.slice(0, 6)
}

const closeBanner = () => {
  state.closeBanner = true
}
</script>
<style lang="postcss" scoped>
.banner p,
.banner a,
.banner button {
  @apply text-white;
  @apply my-0 mx-auto;
}

.banner {
  background-color: #019ec3;
  @apply w-full;
  @apply fixed top-0;
  @apply z-10;
  @apply flex items-center;
}
</style>
