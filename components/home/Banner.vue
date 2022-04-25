<template>
  <div class="banner">
    <div class="banner-container container">
      <div class="banner-header">
        <div class="heading">
          <h1>
            We
            <img
              src=" /icons/icon-small-love.svg"
              alt="Love"
              width="33"
              height="30"
              loading="lazy"
            />
            our community
          </h1>
        </div>
        <p class="community-description font-bold">
          The JOSA's community is made by the efforts of members like you!
        </p>
        <p class="community-description">
          Join JOSA to not only develop soft and organizational skills, but
          become part of a dynamic and exceptional network of geeks and agents
          of change by giving back to the community.
        </p>

        <NuxtLink class="button-flat button-blue-full" to="/register">
          Become a JOSA member &rarr;
        </NuxtLink>
        <!-- <p class="sub-heading">
          Already a member?
          <NuxtLink class="link" to="/login"> Sign In</NuxtLink>
        </p> -->
      </div>
      <div class="banner-cover">
        <img src="/images/background.svg" />
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="postcss" scoped>
.banner {
  @apply bg-josa-black;
  @apply h-auto;
  @apply md:bg-homeHero bg-no-repeat bg-right-bottom lg:bg-right-top bg-contain;
}

.banner-container {
  @apply flex flex-col lg:flex-row justify-between;
  @apply text-josa-warm-grey;
  @apply relative;
  @apply pb-0 pt-28 md:py-28;
  @apply px-8 md:px-20;
}

.banner-cover {
  @apply md:w-3/12;
  @apply block md:invisible;
}

.banner-header {
  /* font-family: 'IBM Mono'; */
  @apply w-full lg:w-2/5;

  .heading {
    @apply text-3xl lg:text-4xl tracking-wide font-normal;
  }
  .heading > h1 {
    @apply block md:inline-flex items-baseline;

    img {
      @apply px-1 pt-1;
    }
  }

  .community-description {
    @apply my-16;
    @apply text-2xl;
  }

  .sub-heading {
    @apply font-light my-8;

    .link {
      @apply underline;
      @apply text-josa-blue;
    }

    .link:hover {
      @apply text-white;
    }
  }
}
</style>
