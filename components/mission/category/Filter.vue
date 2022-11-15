<template>
  <div class="category-container">
    <div
      v-if="props.categories.length"
      class="flex flex-row justify-between divider-dotted pb-3"
    >
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
    <div
      class="input-control form-wrapper"
      v-if="state.isOpen && props.categories.length"
    >
      <div class="w-full h-fit flex flex-col my-8">
        <div
          v-for="(category, index) in props.categories"
          :key="`cat-${index}`"
          class="flex items-start gap-x-4 cursor-pointer"
        >
          <button
            @click="() => onClick('categoryId', category.id)"
            class="block pb-2"
          >
            {{ category.title }}
            <!-- <span class="number">9</span> -->
          </button>
          <span
            @click="() => onClick('', false)"
            v-if="state.filterSelected && state.selectedFilter === category.id"
            class="clear"
            >x</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex flex-row justify-between divider-dotted pb-3"
      v-if="state.isOpen"
    >
      <h3 class="text-xl lg:text-2xl">Difficulty Level</h3>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <div
          v-for="(level, index) in levels"
          :key="`level-${index}`"
          class="flex items-start gap-x-4 cursor-pointer"
        >
          <button
            @click="onClick('level', level.toUpperCase())"
            class="prefix items-baseline block pb-2"
          >
            <span class="level-container">
              <span class="dot selected"></span>
              <span
                :class="
                  (level === 'Intermediate' || level === 'Advanced') &&
                  'selected'
                "
                class="dot"
              ></span>
              <span
                :class="level === 'Advanced' && 'selected'"
                class="dot"
              ></span>
            </span>
            {{ level }}
            <!-- <span class="number"> 5 </span> -->
          </button>
          <span
            @click="() => onClick('', false)"
            v-if="
              state.filterSelected &&
              state.selectedFilter === level.toUpperCase()
            "
            class="clear"
            >x</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex flex-row justify-between divider-dotted pb-3"
      v-if="state.isOpen"
    >
      <h3 class="text-xl lg:text-2xl">Points</h3>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <div>
          <FormAppSlider
            @emitRange="(points) => onSliderChange('points', points)"
            :min="100"
            :max="2000"
          />
        </div>
      </div>
    </div>
    <div
      class="flex flex-row justify-between divider-dotted pb-3"
      v-if="state.isOpen"
    >
      <h3 class="text-xl lg:text-2xl">Due date</h3>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <div>
          <FormAppSlider
            @emitRange="(weeks) => onSliderChange('due_date', weeks)"
            :min="1"
            :max="4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const levels = ['Beginner', 'Intermediate', 'Advanced']

const state = reactive({
  isOpen: true,
  filterSelected: false,
  selectedFilter: '',
})

const props = defineProps({
  categories: {
    type: Array,
    default: [],
  },
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

const emit = defineEmits(['filterMissionBy', 'filterByPoints'])

const onClick = (key, value, isSelected = true) => {
  state.filterSelected = isSelected
  state.selectedFilter = value
  emit('filterMissionBy', { key, value })
}

const onSliderChange = (key, value) => {
  emit('filterByPoints', { key, value })
}
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

.clear {
  @apply px-1 py-0;
  @apply text-red-800 bg-red-400;
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
