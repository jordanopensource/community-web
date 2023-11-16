<template>
  <div class="card">
    <div class="card-color"></div>
    <div class="member-card">
      <div v-if="props.member.type !== 0" class="badge-details">
        <div class="badge-color"></div>
        <p class="header">JOSA Member</p>
      </div>
      <div v-if="props.member.josa_member_id && props.member.type !== 0">
        <p class="header">
          Member ID
          <span
            ># {{ props.member.type }}-{{ props.member.josa_member_id }}</span
          >
        </p>
      </div>
      <div>
        <p class="header">
          Member Since
          <span>
            {{
              props.member.member_since
                ? formatDate(props.member.member_since)
                : 'January 2023'
            }}
          </span>
        </p>
      </div>
      <div class="divider-dotted"></div>
      <div>
        <p class="header">
          Score
          <span>
            {{ props.member.points }}
          </span>
        </p>
      </div>
      <div v-if="props.member.last_online">
        <p class="header">
          Last seen Online
          <span>2 weeks ago</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  member: {
    type: Object,
    default: {},
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
.card {
  @apply m-0 mb-5 lg:ml-10;
}

.card-color {
  @apply w-full h-4;
  @apply rounded-lg rounded-b-none;
  @apply bg-community-blue;
}

.member-card {
  @apply flex flex-col;
  @apply gap-y-2 lg:gap-y-4;
  @apply justify-between;
  @apply w-full;
  @apply md:mr-24;
  @apply bg-white;
  @apply p-5 lg:p-10;
  @apply rounded-lg rounded-t-none;

  .header {
    @apply font-light;

    span {
      @apply font-semibold text-community-black-darker;
      @apply ml-1;
    }
  }

  .badge-details {
    @apply flex flex-row;
    @apply items-center;

    .badge-color {
      @apply w-5 h-5;
      @apply mr-2;
      @apply rounded-sm;
      @apply bg-community-blue;
    }

    .header {
      @apply font-semibold;
    }
  }
}
</style>
