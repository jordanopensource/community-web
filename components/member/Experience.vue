<template>
  <div id="member-experience-and-education" class="container details-container">
    <h2 class="text-xl lg:text-2xl font-light">Experience and Education</h2>
    <div class="slash-separator"></div>

    <div v-if="props.experience.length" class="experience">
      <h3 class="heading">Work Experience</h3>
      <ul>
        <li v-for="(experience, index) in props.experience"
            :key="index"
            class="divider-dotted">
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
        <li v-for="(education, index) in props.education"
            :key="index"
            class="divider-dotted">
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

.heading {
  @apply text-gray-500;
  font-family: 'IBM Sans';
}

.experience,
.education {
  @apply mt-16;
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
