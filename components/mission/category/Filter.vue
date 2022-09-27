<template>
  <div class="category-container">
    <div class="flex flex-row justify-between border-b-2 border-dotted pb-3">
      <h3 class="text-xl lg:text-2xl">Category</h3>

      <button
        :class="state.isOpen ? 'expand-button' : 'expand-button-collapsed'"
        aria-label="Expand Filter Section"
        @click="() => (state.isOpen = !state.isOpen)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 16l-6-6h12z" />
        </svg>
      </button>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <div>
          <button class="block pb-2">
            Software Development <span class="number">9</span>
          </button>
          <button class="block pb-2">
            Research and Analysis <span class="number">12</span>
          </button>
          <button class="block pb-2">
            Translation <span class="number">3</span>
          </button>
        </div>
      </div>
    </div>
    <div
      class="flex flex-row justify-between border-b-2 border-dotted pb-3"
      v-if="state.isOpen"
    >
      <h3 class="text-xl lg:text-2xl">Difficulty Level</h3>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <div>
          <button class="prefix items-baseline block pb-2">
            <span class="level-container">
              <span class="dot selected"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </span>
            Beginner
            <span class="number"> 5 </span>
          </button>
          <button class="prefix items-baseline block pb-2">
            <span class="level-container">
              <span class="dot selected"></span>
              <span class="dot selected"></span>
              <span class="dot"></span>
            </span>
            Intermediate <span class="number">10</span>
          </button>
          <button class="prefix items-baseline block pb-2">
            <span class="level-container">
              <span class="dot selected"></span>
              <span class="dot selected"></span>
              <span class="dot selected"></span>
            </span>
            Advanced <span class="number">13</span>
          </button>
        </div>
      </div>
    </div>
    <div
      class="flex flex-row justify-between border-b-2 border-dotted pb-3"
      v-if="state.isOpen"
    >
      <h3 class="text-xl lg:text-2xl">Points</h3>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <div>
          <p>More than 1000</p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-row justify-between border-b-2 border-dotted pb-3"
      v-if="state.isOpen"
    >
      <h3 class="text-xl lg:text-2xl">Due date</h3>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <div>
          <p>After 3 weeks</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const state = reactive({
  isOpen: true,
})
</script>

<style lang="postcss" scoped>
.category-container {
  @apply bg-white mb-10 p-4;
}
.form-wrapper {
  @apply h-fit;
}

.expand-button {
  transition-duration: 0.5s;
  transform: rotate(-180deg);
  @apply cursor-pointer  outline-none lg:hidden;
}

.expand-button-collapsed {
  transition-duration: 0.5s;
  transform: rotate(0deg);
  @apply cursor-pointer  outline-none lg:hidden;
}

.number {
  @apply px-1 py-0;
  background-color: #e9ecee;
  color: #8b8d8d;
  border-radius: 20%;
  font-size: 0.7rem;
}

.dot {
  @apply w-3 h-3;
  @apply bg-gray-200;
  @apply rounded-full;
}
.selected {
  background-color: #00b199;
}
.level-container {
  @apply flex flex-row gap-x-1 items-end;
}

.prefix {
  @apply flex flex-row gap-x-2;
}
</style>
