<template>
  <div id="member-experience-and-education" class="container details-container">
    <h2>Experience and Education</h2>
    <div class="slash-separator"></div>

    <div v-if="props.experience.length" class="experience">
      <h5 class="heading">Work Experience</h5>
      <ul>
        <li v-for="(experience, index) in props.experience" :key="index">
          <div>
            <p class="title">{{ experience.company_name }}</p>
            <p class="sub-title">{{ experience.position }}</p>
          </div>
          <div class="date-container">
            <p>
              {{ formatDate(experience.start_date) }} -
              {{ formatDate(experience.end_date) }}
            </p>
            <!-- <p></p> -->
          </div>
        </li>
      </ul>
    </div>

    <div v-if="props.education.length" class="education">
      <h5 class="heading">Education</h5>
      <ul>
        <li v-for="(education, index) in props.education" :key="index">
          <div>
            <p class="title">{{ education.institution_name }}</p>
            <p class="sub-title">{{ education.degree }}</p>
          </div>
          <div class="date-container">
            <p>{{ formatDate(education.graduated) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  education: {
    type: Object,
    default: [],
  },
  experience: {
    type: Object,
    default: [],
  },
})

const formatDate = (date) => {
  const newDate = new Date(date)
  const [month, year] = [
    newDate.toLocaleString('en-US', { month: 'long' }),
    newDate.getFullYear(),
  ]
  return `${month} ${year}`
}
</script>
<style lang="postcss" scoped>
.details-container {
  @apply bg-white;
  @apply my-14;
  @apply p-10 px-8;
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

.experience,
.education {
  @apply mt-16;
}

.heading {
  @apply text-gray-500;
  @apply mb-2;
  @apply font-light;
}

ul {
  @apply list-none;
  @apply flex flex-col;
}

li {
  @apply w-full;
  @apply ml-0 mt-2 py-3;
  @apply border-dotted border-t-2 border-gray-500;
  @apply flex flex-row justify-between;

  .title {
    @apply font-semibold text-sm md:text-2xl;
  }

  .sub-title {
    @apply text-sm md:text-lg;
  }

  .date-container {
    @apply text-gray-500;
  }
}
</style>
