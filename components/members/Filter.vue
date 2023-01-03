<template>
  <div :class="[!state.isOpen ? 'filter-collapsed' : 'filter-container']">
    <div @click="() => (state.isOpen = !state.isOpen)" class="filter-head">
      <div
        class="flex flex-row justify-between md:border-b-2 md:border-dotted pb-3"
      >
        <div class="filter-button-container" v-if="!state.isOpen">
          <img
            class="lg:hidden filter-icon"
            src="/icons/filter.svg"
            alt="Filter icon"
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
        >
          <img src="/icons/arrow.png" alt="Expand Filter" />
        </button>
      </div>
    </div>
    <div class="input-control form-wrapper" v-if="state.isOpen">
      <div class="w-full h-fit flex flex-col my-8">
        <p class="mb-2">Search members by name:</p>
        <form class="flex flex-row" @submit.prevent="onSubmit">
          <FormAppControlInput
            name="name"
            inputType="text"
            class="w-full input-container"
            :showSlot="false"
            v-model:value="state.name"
          >
          </FormAppControlInput>
          <FormAppButton btn-style="search-button" type="submit" @click="scrollToView()">
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </FormAppButton>
        </form>
        <div>
          <FormAppControlInput
            v-model:value="state.noneJosaMembers"
            inputType="checkbox"
            @change="() => onCheck()"
          >
            Show contributors who are not members</FormAppControlInput
          >
        </div>
      </div>
      <div class="divider-dotted"></div>
      <div class="my-6">
        <h4 class="font-light mb-4">Sort by:</h4>
        <FormAppDropDown
          selectName="sortBy"
          :listOfItems="sortItems"
          v-model:value="state.selected"
          @change="() => onSelect()"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const state = reactive({
  isOpen: true,
  name: '',
  noneJosaMembers: false,
  selected: '',
})


const sortItems = [
  {
    value: 'member_since,DESC',
    text: 'Member since (Newest)',
  },
  {
    value: 'member_since,ASC',
    text: 'Member since (Oldest)',
  },
  {
    value: 'name,ASC',
    text: 'By Name (A → Z)',
  },
  {
    value: 'name,DESC',
    text: 'By Name (Z → A)',
  },
]

const emit = defineEmits(['sortMembers', 'searchMember', 'filterMembers'])

const onCheck = () => {
  emit('filterMembers', state.noneJosaMembers)
}

const onSubmit = () => {
  emit('searchMember', state.name)
}
const onSelect = () => {
  emit('sortMembers', state.selected)
}
const scrollToView = () => {
  document.getElementById('members-found-heading').scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}
watch(
  () => state.windowResize,
  (newValue, oldValue) => {
    console.log(state.windowResize)
    console.log(newValue)
    console.log(oldValue)
  }
)
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
  transform: rotate(0deg);
  @apply cursor-pointer  outline-none lg:hidden;
}

.expand-button-collapsed {
  transition-duration: 0.5s;
  transform: rotate(-90deg);
  @apply cursor-pointer ml-2 outline-none lg:hidden;
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

.filter-head {
  cursor: pointer;
  @media screen and (min-width: 1024px) {
    pointer-events: none;
  }
}
</style>
