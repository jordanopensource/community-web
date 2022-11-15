<template>
  <div class="banner" id="closeBanner" v-if="!state.closeBanner">
    <div class="container">
      <p>
        <span class="font-bold">Build</span>:
        <a
          :href="$config.DRONE_BUILD_LINK"
          target="_blank"
          rel="noopener noreferrer"
        >
          #{{ $config.DRONE_BUILD_NUMBER }}
        </a>
        <a
          :href="$config.DRONE_COMMIT_LINK"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="show"
          @mouseleave="hide"
        >
          ({{ state.droneCommitSha }})
        </a>
      </p>
      <p class="font-bold">This is {{ $config.TARGET_ENV }} environment</p>
      <!-- <p>Build Timestamp: {{ humanDataFormat() }}</p> -->
      <button class="bannerBtn" @click="closeBanner">
        <img class="w-9 h-9" src="/icons/lm-icon-close.png" alt="" srcset="" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      droneCommitSha: $config.DRONE_COMMIT_SHA.slice(0, 6),
      closeBanner: false,
    }
  },
  methods: {
    show() {
      this.droneCommitSha = $config.DRONE_COMMIT_SHA
    },
    hide() {
      this.droneCommitSha = $config.DRONE_COMMIT_SHA.slice(0, 6)
    },

    closeBanner() {
      this.closeBanner = true
    },
  },
  computed: {
    humanDataFormat() {
      const milliseconds = $config.DRONE_BUILD_FINISHED * 1000
      return new Date(milliseconds).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    },
  },
}
</script>
<style lang="postcss" scoped>
.banner p,
.banner a,
.banner button {
  @apply text-white;
}

.banner {
  background-color: #019ec3;
  @apply w-full;
  @apply fixed top-0;
  @apply z-10;
}

.banner .container {
  @apply flex items-center justify-between;
}
</style>
