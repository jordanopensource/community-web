<template>
  <div class="banner" id="bannerClosed" v-if="!state.bannerClosed">
    <div class="container">
      <div class="flex items-center gap-x-4">
        <span>🔨</span>
        <p>
          <span class="font-bold">Build</span>:
          <a
            :href="config.public.buildLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            #{{ config.public.buildNumber }}
          </a>
          <a
            :href="config.public.buildCommitLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            ({{ config.public.buildCommitSha.slice(0, 6) }})
          </a>
        </p>
      </div>
      <div class="flex items-center gap-x-4">
        <span>🚧</span>
        <p>
          <span class="font-bold"> Environment: </span>
          {{ config.public.targetEnv }}
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
  bannerClosed: false,
})
const closeBanner = () => {
  state.bannerClosed = true
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
  @apply z-20;
}

.banner .container {
  @apply flex items-center justify-between;
}
</style>
