<template>
  <div id="member-contributions" class="details-container">
    <h2 class="text-2xl font-light">Contributions</h2>
    <div class="slash-separator"></div>

    <div class="contribution">
      <h3 class="heading">JOSA Contributions</h3>
      <ul>
        <li v-for="(contribution, index) in props.contributions"
            :key="index"
            class="divider-dotted">
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
.details-container {
  @apply text-sm md:text-lg;
}
.slash-separator {
  @apply relative;
  @apply mt-8;
}
.slash-separator:before {
  @apply h-3;
  --border-width: 6px;
  --stripe-distance: 10px;
  position: absolute;
  content: '';
  left: calc(var(--border-width) * -1);
  right: calc(var(--border-width) * -1);
  top: calc(var(--border-width) * -1);
  bottom: calc(var(--border-width) * -1);
  background: repeating-linear-gradient(
    -45deg,
    #4b5563,
    transparent 1px,
    transparent var(--stripe-distance),
    #4b5563 calc(var(--stripe-distance) + 1px)
  );
  z-index: 1;
}

.contribution {
  @apply mt-16;
}

.heading {
  @apply text-gray-500;
  font-family: 'IBM Sans';
}

ul {
  @apply list-none;
  @apply flex flex-col;
}

li {
  @apply w-full;
  @apply ml-0 mt-2 py-3;
  @apply flex flex-row justify-between;
  @apply text-xl;
  
  .title {
    @apply font-semibold;
    font-family: 'IBM Sans';
  }
  .sub-title {
    @apply font-normal;
    font-family: 'IBM Sans';
  }
  .date-container {
    @apply text-lg text-gray-500;
  }
}
</style>
