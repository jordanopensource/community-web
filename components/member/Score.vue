<template>
  <div class="member-card">
    <div>
      <p class="header">Score</p>
      <p>2344</p>
    </div>
    <div>
      <p class="header">Last seen Online</p>
      <p>2 weeks ago</p>
    </div>
  </div>
</template>

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
}

.member-card > div {
  @apply my-3 lg:my-auto;
}
</style>
