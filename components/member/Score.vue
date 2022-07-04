<template>
  <div class="member-card">
    <div>
      <h5>Score</h5>
      <p>2344</p>
    </div>
    <div>
      <h5>Last seen Online</h5>
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

  h5 {
    @apply font-light;
  }
}

.member-card > div {
  @apply my-3 lg:my-auto;
}
</style>
