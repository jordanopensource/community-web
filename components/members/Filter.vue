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
        <p>Search members by name:</p>
        <form class="flex flex-row items-baseline" @submit.prevent="onSubmit">
          <FormAppControlInput
            name="name"
            inputType="text"
            class="w-full input-container"
            v-model:value="state.name"
          >
          </FormAppControlInput>
          <FormAppButton btn-style="search-button" type="submit"
            >&rarr;</FormAppButton
          >
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
    text: 'By Name (A -> Z)',
  },
  {
    value: 'name,DESC',
    text: 'By Name (Z -> A)',
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
</script>
<style lang="postcss" scoped>
.filter-container {
  @apply bg-white my-10 p-4;
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
