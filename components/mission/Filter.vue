<template>
  <div class="filter-container">
    <div class="flex flex-row justify-between border-b-2 border-dotted pb-3">
      <h3 class="text-xl lg:text-2xl">Filter</h3>

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
        <p>Filter by mission:</p>
        <form class="flex flex-row items-baseline" @submit.prevent="onSubmit">
          <FormAppControlInput
            name="mission"
            inputType="text"
            class="w-full input-container"
            v-model:value="state.title"
          >
          </FormAppControlInput>
          <FormAppButton btn-style="search-button" type="submit"
            >&rarr;</FormAppButton
          >
        </form>
      </div>
      <div class="border-b-2 border-dotted"></div>
      <div class="my-6">
        <h4 class="font-light mb-8">Sort by:</h4>
        <FormAppDropDown
          selectName="sortBy"
          :listOfItems="sortItems"
          v-model:value="state.selected"
          @change="() => onSelect()"
        />
      </div>
      <div class="border-b-2 border-dotted"></div>
      <div class="pt-4">
        <FormAppControlInput
          v-model:value="state.isAssignedMission"
          inputType="checkbox"
          @change="() => onCheck()"
        >
          Show assigned missions</FormAppControlInput
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const state = reactive({
  isOpen: true,
  title: '',
  isAssignedMission: false,
  selected: '',
})

const sortItems = [
  {
    value: 'points,DESC',
    text: 'Points (Highest - Lowest)',
  },
  {
    value: 'points,ASC',
    text: 'Points (Lowest - Highest)',
  },
]

const emit = defineEmits(['sortMissions', 'searchMission', 'filterMissions'])

const onCheck = () => {
  emit('filterMissions', { key: 'assigned', value: state.isAssignedMission })
}

const onSubmit = () => {
  emit('searchMission', state.title)
}
const onSelect = () => {
  emit('sortMissions', state.selected)
}
</script>
<style lang="postcss" scoped>
.filter-container {
  @apply bg-white p-4;
  margin: 72px 0;
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
