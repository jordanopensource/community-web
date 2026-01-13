<template>
  <section class="wrapper">
    <div class="text-wrapper">
      <h2 class="font-bold mb-2 sans">
        Be the first to have a JOSA account on josa.community
      </h2>
      <p class="w-full mr-8">
        This portal is made specifically for you! Play around with the
        community's features as soon as they are shipped, supporting JOSA in
        developing new ones.
      </p>
    </div>
    <FormEarlyAccess />
  </section>
</template>
<style lang="postcss" scoped>
section.wrapper {
  @apply flex flex-col justify-between lg:flex-row;
  @apply lg:gap-x-32 xl:gap-x-40;
  @apply mb-16;
}
section > a {
  @apply p-4;
  @apply text-2xl;
  @apply flex justify-between;
}
.text-wrapper {
  @apply flex flex-col justify-center;
}
.form-wrapper {
  @apply bg-gray-200;
  @apply w-full h-fit;
  @apply mt-8 lg:mt-0 md:p-8;
  @apply p-4;
}
.button-flat {
  @apply h-fit py-2.5 mt-4;
}
</style>
