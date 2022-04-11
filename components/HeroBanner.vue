<template>
  <div>
    <section class="banner">
      <div class="content-container container">
        <div class="content-header">
          <h1>JOSA Membership Form</h1>
        </div>
        <div class="slash-section">
          <span>/ / / / / / / / / / / / / / / / / / / / / / / / / / / / /</span>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="postcss" scoped>
* {
  @apply bg-josa-black;
}

.banner {
  @apply flex flex-col md:flex-row;
  @apply py-28 mx-9;
  @apply h-auto;
}

.content-container {
  @apply text-josa-warm-grey;
  /* @apply pt-8; */
  @apply px-8;
  @apply flex flex-col justify-center md:flex-row md:justify-around;
  @apply items-baseline;
}

.content-header {
  /* font-family: 'IBM Mono'; */
  @apply text-4xl tracking-wide font-normal;
  /* @apply w-full; */
}

.slash-section {
  /* font-family: 'IBM Sans'; */
  @apply text-josa-warm-grey-dark;
  /* @apply w-11/12 lg:w-9/12 w-full; */
  /* @apply md:mx-3 lg:mx-16; */
  @apply text-xl lg:text-2xl font-normal;
}
</style>
