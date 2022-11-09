<template>
  <div>
    <div class="card-color"></div>
    <div class="member-card">
      <div v-if="props.member.type !== 0" class="badge-details">
        <div class="badge-color"></div>
        <p class="header">JOSA Member</p>
      </div>
      <div v-if="props.member.josa_member_id && props.member.type !== 0">
        <p class="header">
          Member ID
          <span># {{ props.member.type }}-{{ props.member.josa_member_id }}</span>
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
      <div class="line"></div>
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
.card-color{
  @apply w-full h-4;
  @apply rounded-lg rounded-b-none;
  @apply bg-josa-blue;
}
.member-card {
  @apply flex flex-col;
  @apply gap-y-0 lg:gap-y-2;
  @apply justify-between;
  @apply w-full;
  @apply md:mr-24;
  @apply font-semibold;
  @apply bg-white;
  @apply p-4 lg:p-8;
  @apply mt-0;
  @apply rounded-lg rounded-t-none;

  .line {
    @apply w-full h-0;
    @apply border-2 border-dotted border-b-0 border-josa-black;
    @apply my-1 lg:my-6;
  }

  .header {
    @apply font-light;

    span {
      @apply font-semibold text-josa-black-darker;
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
      @apply bg-josa-blue;
    }
    .header {
      @apply font-semibold;
    }
  }
}

.member-card > div {
  @apply my-3 lg:my-auto;
}
</style>
