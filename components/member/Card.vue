<template>
  <div class="member-card">
    <div v-if="props.member.type !== 0" class="badge-details">
      <div class="badge-color"></div>
      <p class="header">JOSA Member</p>
    </div>
    <div v-if="props.member.member_id && props.member.type !== 0">
      <p class="header">Member ID</p>
      <p>{{ props.member.member_id }}</p>
    </div>
    <div>
      <p class="header">Member Since</p>
      <p>
        {{
          props.member.member_since
            ? formatDate(props.member.member_since)
            : 'January 2023'
        }}
      </p>
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
</script>

<style lang="postcss" scoped>
.member-card {
  @apply flex flex-row lg:flex-col;
  @apply gap-y-4;
  @apply justify-between;
  @apply w-full;
  @apply bg-slate-100;
  @apply rounded-xl;
  @apply p-4 mb-4;
  @apply md:mr-24;
  @apply font-semibold;

  .header {
    @apply font-light;
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
  }
}

.member-card > div {
  @apply my-3 lg:my-auto;
}
</style>
