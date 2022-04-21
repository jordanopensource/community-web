<template>
  <div class="container px-20 mb-16">
    <section class="flex flex-col justify-between lg:flex-row mb-16">
      <p class="w-full mr-8">
        The JOSA's community is made by efforts of members like you! Join JOSA
        to not only develop soft and organizational skills, but become part of a
        dynamic and exceptional network of geeks and agents of change by giving
        back to the community.
      </p>
      <NuxtLink
        class="mt-8 lg:mt-0 button-flat button-blue-full w-full h-fit"
        to="/register"
      >
        Fill the form <span class="text-right">&rarr;</span>
      </NuxtLink>
    </section>
    <div class="slash-separator"></div>
  </div>
</template>
<style lang="postcss" scoped>
section > a {
  @apply p-4;
  @apply text-2xl;
  @apply flex justify-between;
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
</style>
