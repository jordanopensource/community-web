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
                <button class="block pb-2">Software Development <span class="number">9</span></button> 
                <button class="block pb-2">Research and Analysis <span class="number">12</span></button>
                <button class="block pb-2">Translation <span class="number">3</span></button>
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
    @apply px-2 py-0;
    background-color: #e9ecee;
    color: #8b8d8d;
    border-radius: 20%;
  }
  </style>
  