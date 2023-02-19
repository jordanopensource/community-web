<template>
  <div :class="[!state.isOpen ? 'filter-collapsed' : 'filter-container']">
    <div
      class="flex flex-row justify-between md:border-b-2 md:border-dotted pb-3"
    >
      <div class="filter-button-container" v-if="!state.isOpen">
        <img
          class="lg:hidden filter-icon"
          src="/icons/filter.svg"
          alt="Fiter icon"
        />
        <div>
          <h3 class="filter-heading">Filter</h3>
        </div>
      </div>
      <div v-else>
        <h3 class="text-xl lg:text-2xl">Filter</h3>
      </div>
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
        <p class="mb-2">Filter by mission:</p>
        <form class="flex flex-row" @submit.prevent="onSubmit">
          <FormAppControlInput
            name="mission"
            inputType="text"
            class="w-full input-container"
            :showSlot="false"
            v-model:value="state.title"
          >
          </FormAppControlInput>
          <FormAppButton btn-style="search-button" type="submit"
            >&rarr;</FormAppButton
          >
        </form>
      </div>
      <div class="divider-dotted"></div>
      <div class="my-6">
        <h4 class="font-light mb-8">Sort by:</h4>
        <FormAppDropDown
          selectName="sortBy"
          :listOfItems="sortItems"
          v-model:value="state.selected"
          @change="() => onSelect()"
        />
      </div>
      <div class="divider-dotted"></div>
      <div class="pt-4">
        <FormAppControlInput
          v-model:value="state.isAssignedMission"
          inputType="checkbox"
          labelId="show-assigned-missions"
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

onMounted(() => {
  window.addEventListener('resize', (e) => {
    if (window.innerWidth > 1030) {
      state.isOpen = true
    } else {
      state.isOpen = false
    }
  })
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
  margin: 0 0;
  margin-bottom: 2rem;
  @media screen and (min-width: 1032px) {
    margin: 72px 0;
  }
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

.filter-collapsed {
  @apply px-2 pb-0 pt-3;
  margin-top: 0;
  margin-left: auto;
  margin-right: 0;
  margin-bottom: 2rem;
  background-color: #e3e7e9;
  width: fit-content;
}
.filter-icon {
  width: 1rem;
  margin-right: 0.6rem;
}
.filter-button-container {
  display: flex;
  flex-direction: row;
}
</style>
