<template>
  <div id="member-detail" class="details-container">
    <h3 class="heading">About</h3>
    <p class="member-about">
      {{
        props.member.about
          ? props.member.about
          : ''
      }}
    </p>
    <div v-if="props.skills.length" class="skills">
      <p class="heading">Skills</p>
      <ul>
        <li v-for="(skill, index) in memberSkills" :key="`skill-${index}`">
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const memberSkills = ['Linux Operating System', 'File System']

const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
  skills: {
    type: Object,
    default: {},
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
.heading {
  @apply text-gray-500;
  @apply mb-5;
  font-family: 'IBM Sans';
}

.skills {
  ul {
    @apply list-none;
    @apply flex flex-row;
  }

  li {
    @apply w-fit;
    @apply ml-0 mb-4 p-2;
    @apply lg:mr-4 lg:mb-auto;
    @apply bg-gray-200;
    @apply rounded-lg;
  }
}
</style>
