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
                <p>Software Development</p>
                <p>Research and Analysis</p>
                <p>Translation</p>
            </div> 
        </div>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-dotted pb-3" v-if="state.isOpen">
        <h3 class="text-xl lg:text-2xl">Difficulty Level</h3>
      </div>
      <div class="input-control form-wrapper" v-if="state.isOpen">
        <div class="w-full h-fit flex flex-col my-8">
            <div>
                <p>Beginner</p>
                <p>Intermediate</p>
                <p>Advanced</p>
            </div> 
        </div>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-dotted pb-3" v-if="state.isOpen">
        <h3 class="text-xl lg:text-2xl">Points</h3>
      </div>
      <div class="input-control form-wrapper" v-if="state.isOpen">
        <div class="w-full h-fit flex flex-col my-8">
            <div>
                <p>More than 1000</p>
            </div> 
        </div>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-dotted pb-3" v-if="state.isOpen">
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
  </style>
  