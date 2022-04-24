<template>
  <div class="container px-20">
    <section class="mb-16 p-8">
      <h3 class="heading">Many reasons to become a member of JOSA</h3>

      <div class="perks-container">
        <div class="bot-container">
          <img src="/images/bots/bot-1.svg" />
          <div>
            <h4 class="heading">Join a community of like-minded geeks</h4>
            <p>
              JOSA's Biggest asset is its community, a varid group of
              individuals that are always seeking to learn and teach, spanning
              different fields and interests you are sure to find peers to both
              program and have fun with.
            </p>
          </div>
        </div>
        <div class="bot-container">
          <img src="/images/bots/bot-2.svg" />
          <div>
            <h4 class="heading">Join a community of like-minded geeks</h4>
            <p>
              JOSA's Biggest asset is its community, a varid group of
              individuals that are always seeking to learn and teach, spanning
              different fields and interests you are sure to find peers to both
              program and have fun with.
            </p>
          </div>
        </div>
        <div class="bot-container">
          <img src="/images/bots/bot-3.svg" />
          <div>
            <h4 class="heading">Join a community of like-minded geeks</h4>
            <p>
              JOSA's Biggest asset is its community, a varid group of
              individuals that are always seeking to learn and teach, spanning
              different fields and interests you are sure to find peers to both
              program and have fun with.
            </p>
          </div>
        </div>
        <div class="bot-container">
          <img src="/images/bots/bot-4.svg" />
          <div>
            <h4 class="heading">Join a community of like-minded geeks</h4>
            <p>
              JOSA's Biggest asset is its community, a varid group of
              individuals that are always seeking to learn and teach, spanning
              different fields and interests you are sure to find peers to both
              program and have fun with.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="postcss" scoped>
.heading {
  @apply text-3xl lg:text-4xl tracking-wide font-normal;
  @apply mb-16;
}
.perks-container {
  @apply flex flex-col;
  @apply lg:flex-row lg:flex-wrap;

  .heading {
    @apply text-xl font-bold;
    @apply mb-8;
  }
}

.bot-container {
  @apply flex flex-col lg:flex-row lg:basis-6/12;

  img {
    @apply pb-8 lg:pr-8;
    @apply w-1/2 lg:w-fit;
  }
}
</style>
