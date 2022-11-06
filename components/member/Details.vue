<template>
  <div id="member-detail" class="details-container">
    <p class="heading">About</p>
    <p class="member-about mb-8">
      {{
        props.member.about
          ? props.member.about
          : 'Lorem Ipsum is what the good animal did, and when they were safely on the other side, and had walked on a little while, the woods grew more and more familiar to them.'
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
.details-container {
  @apply text-sm md:text-lg;
}
.heading {
  @apply text-gray-500;
  @apply mb-2;
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
