<template>
  <header class="header">
    <div class="container">
      <div class="px-6 md:px-12 flex justify-between flex-wrap lg:flex-nowrap items-center">
        <div class="flex items-center flex-shrink-0">
          <NuxtLink id="brand" to="/">
            <div role="link">
              <img
                class="w-175 sm:w-240"
                src="@/static/logo-colored-en.svg"
                alt="Jordan Open Source Association Logo"
                width="400"
                height="400"
              />
            </div>
          </NuxtLink>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-end" @click="state.isOpen = !state.isOpen">
            <svg
              class="svg-inline--fa menu-icon w-175"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                v-if="!state.isOpen"
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
              <path
                v-if="state.isOpen"
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              />
            </svg>
          </button>
        </div>
        <Navbar
          :class="state.isOpen ? 'block' : 'hidden'"
          class="w-full lg:block lg:text-right flex-grow mt-4 lg:m-0"
        />
      </div>
    </div>
  </header>
</template>
<script setup>

import { reactive } from 'vue';

const state = reactive({
  isOpen: false
});

</script>
<style lang="postcss" scoped>
.header {
  @apply py-8 bg-josa-black;
  border-bottom: 1px solid #e0e0e0;
}
.menu-icon {
  @apply text-josa-warm-grey-light w-6 h-6 !important;
}
@screen sm {
  .menu-icon {
    @apply w-8 h-8 !important;
  }
}
</style>
