<template>
  <div id="member-contributions" class="details-container">
    <h2 class="text-xl lg:text-2xl">Contributions</h2>
    <div class="divider-slashes"></div>

    <div class="contribution">
      <h3 class="heading">JOSA Contributions</h3>
      <ul>
        <li v-for="(contribution, index) in contributionsSorted"
            :key="index"
            class="divider-dotted pb-2.5">
          <div>
            <h4 class="title">{{ contribution.description }}</h4>
            <h5 class="sub-title">{{ contribution.role }}</h5>
          </div>
          <div class="date-container">
            <p>{{ formatDate(contribution.finished_at) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  contributions: {
    type: Array,
    default: [],
  },
})

const contributionsSorted = props.contributions.sort(
  (a, b) => new Date(b.end_date) > new Date(a.end_date)
);

const formatDate = (date) => {
  const newDate = new Date(date)
  const [month, year] = [
    newDate.toLocaleString('default', { month: 'long' }),
    newDate.getFullYear(),
  ]
  return `${month} ${year}`
}
</script>
<style lang="postcss" scoped>
.divider-slashes {
  @apply mt-5 mb-10;
  @apply h-3;
}

.contribution {
  @apply mt-5;
}

.heading {
  @apply text-gray-500;
  @apply mb-5;
  font-family: 'IBM Sans';
}

ul {
  @apply list-none;
  @apply flex flex-col;
}

li {
  @apply w-full;
  @apply ml-0 mb-5;
  @apply flex flex-row justify-between;
  @apply text-xl;
  
  .title {
    @apply font-semibold text-base lg:text-xl;
    font-family: 'IBM Sans';
  }
  .sub-title {
    @apply font-normal text-base lg:text-xl;
    font-family: 'IBM Sans';
  }
  .date-container {
    @apply text-sm lg:text-lg text-gray-500;
  }
}
</style>
