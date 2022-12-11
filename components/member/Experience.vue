<template>
  <div id="member-experience-and-education" class="container details-container">
    <h2 class="text-xl lg:text-2xl">Experience and Education</h2>
    <div class="divider-slashes"></div>

    <div v-if="props.experience.length" class="experience">
      <h3 class="heading">Work Experience</h3>
      <ul>
        <li v-for="(experience, index) in experienceSorted"
            :key="index"
            class="divider-dotted pb-2.5">
          <div>
            <h4 class="title">{{ experience.company_name }}</h4>
            <h5 class="sub-title">{{ experience.position }}</h5>
          </div>
          <div class="date-container">
            <p>
              {{ formatDate(experience.start_date) }} -
              {{
                experience.end_date
                  ? formatDate(experience.end_date)
                  : 'Current'
              }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="props.education.length" class="education">
      <h3 class="heading">Education</h3>
      <ul>
        <li v-for="(education, index) in educationSorted"
            :key="index"
            class="divider-dotted pb-2.5">
          <div>
            <h4 class="title">{{ education.institution_name }}</h4>
            <h5 class="sub-title">{{ education.degree }}</h5>
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

const experienceSorted = props.experience.sort(
  (a, b) => new Date(b.end_date) > new Date(a.end_date)
);
const educationSorted = props.education.sort(
  (a, b) => new Date(b.end_date) > new Date(a.end_date)
);

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
.divider-slashes {
  @apply mt-5 mb-10;
  @apply h-3;
}

.heading {
  @apply text-gray-500;
  @apply mb-5;
  font-family: 'IBM Sans';
}

.experience,
.education {
  @apply mt-5;
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
