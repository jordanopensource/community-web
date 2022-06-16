<template>
  <div class="filter-container">
    <h3 class="text-xl lg:text-2xl border-b-2 border-dotted pb-3">Filter</h3>
    <div class="input-control form-wrapper">
      <form class="w-full h-fit flex flex-col my-8">
        <p>Search members by name:</p>
        <div class="flex flex-row items-baseline">
          <FormAppControlInput
            name="name"
            inputType="text"
            class="w-full input-container"
          >
          </FormAppControlInput>
          <FormAppButton btn-style="search-button" type="submit"
            >&rarr;</FormAppButton
          >
        </div>
        <div>
          <FormAppControlInput inputType="checkbox">
            Show contributors who are not members</FormAppControlInput
          >
        </div>
      </form>
      <div class="border-b-2 border-dotted"></div>
      <div class="my-6">
        <h4 class="font-light mb-8">Sort by:</h4>
        <FormAppDropDown selectName="sortBy" :listOfItems="sortItems" />
      </div>
    </div>
  </div>
</template>
<script setup>
const sortItems = [
  {
    value: 'firstName',
    text: 'First Name (A -> Z)',
  },
  {
    value: 'lastName',
    text: 'Last Name (A -> Z)',
  },
  {
    value: 'firstNameRev',
    text: 'First Name (Z -> A)',
  },
  {
    value: 'lastNameRev',
    text: 'Last Name (Z -> A)',
  },
]
</script>
<style lang="postcss" scoped>
.filter-container {
  @apply bg-white my-10 p-4;
}
.form-wrapper {
  @apply h-fit;
}
</style>
