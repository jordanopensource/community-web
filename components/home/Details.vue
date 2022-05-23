<template>
  <section>
    <h2 class="heading">Many reasons to become a member of JOSA</h2>
    <div class="perks-container">
      <div class="bot-container">
        <img src="/images/bots/bot-1.svg" />
        <div>
          <h3 class="heading">Join a community of like-minded geeks</h3>
          <p>
            JOSA's Biggest asset is its community, a varied group of individuals
            that are always seeking to learn and teach, spanning different
            fields and interests you are sure to find peers to both program and
            have fun with.
          </p>
        </div>
      </div>
      <div class="bot-container">
        <img src="/images/bots/bot-2.svg" />
        <div>
          <h3 class="heading">
            Collaborate on great projects with other open-source enthusiasts
          </h3>
          <p>
            The only thing better than discussing tech and arguing about
            technologies is collaborating on building it with fellow JOSA
            members, each with a different set of skills and expertise covering
            every imaginable aspect for a successful project.
          </p>
        </div>
      </div>
      <div class="bot-container">
        <img src="/images/bots/bot-3.svg" />
        <div>
          <h3 class="heading">
            Get access to special events, activities and perks
          </h3>
          <p>
            Being a JOSAn comes with access to our community events that are
            tailored to satisfy both the mind and the soul. Networking events,
            technical workshops and fun hangouts are all on the agenda. Benefits
            also include access to a wide variety of resources and perks.
          </p>
        </div>
      </div>
      <div class="bot-container">
        <img src="/images/bots/bot-4.svg" />
        <div>
          <h3 class="heading">Develop your skills</h3>
          <p>
            The JOSA community is build upon and thrives upon the growth of our
            members, we constantly seek to enhance and enrich our members with
            all that they may need to increase their knowledge and expertise
            with collaborations, resources and learning opportunities.
          </p>
        </div>
      </div>
    </div>
    <SlashSeparator />
  </section>
</template>
<style lang="postcss" scoped>
.heading {
  @apply text-3xl lg:text-4xl tracking-wide font-normal;
  @apply mb-16;
}
.perks-container {
  @apply flex flex-col;
  @apply lg:flex-row lg:flex-wrap;
  @apply gap-32;
  @apply mt-32;

  .heading {
    @apply text-xl font-bold;
    @apply mb-8;
  }
}

.bot-container {
  @apply flex flex-col lg:flex-row;
  @apply md:basis-[calc(43.5%)] lg:basis-[calc(45.5%)];

  img {
    @apply lg:pr-8;
    @apply mb-8 lg:mb-0;
    @apply w-2/5 md:w-1/2;
  }
}
</style>
