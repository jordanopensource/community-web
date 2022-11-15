<template>
  <div class="banner" id="closeBanner" v-if="!state.closeBanner">
    <div class="container">
      <p>
        <span class="font-bold">Build</span>:
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
        >
          ({{ config.public.DRONE_COMMIT_SHA.slice(0, 6) }})
        </a>
      </p>
      <div class="flex items-center gap-x-4">
        <span>🚧</span>
        <p class="font-bold">
          This is {{ config.public.TARGET_ENV }} environment
        </p>
        <button class="bannerBtn" @click="closeBanner">
          <img
            class="w-9 h-9"
            src="/icons/lm-icon-close.png"
            alt=""
            srcset=""
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()

const state = reactive({
  closeBanner: false,
})
const closeBanner = () => {
  state.closeBanner = true
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
