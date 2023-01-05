<template>
  <div class="banner">
    <div class="banner-container container">
      <div class="banner-header">
        <div class="heading">
          <h1>
            We
            <img src=" /icons/icon-small-love.svg" alt="Love" width="33" height="30" loading="lazy" />
            our community
          </h1>
        </div>
        <div class="community-description">
          <p class="font-bold">
            The JOSA's community is made by the efforts of members like you!
          </p>
          <p>
            Join JOSA to not only develop soft and organizational skills, but
            become part of a dynamic and exceptional network of geeks and agents
            of change by giving back to the community.
          </p>
        </div>

        <NuxtLink class="button-flat button-blue-full" to="/register">
          Become a JOSA member &rarr;
        </NuxtLink>
        <!-- <p class="sub-heading">
          Already a member?
          <NuxtLink class="link" to="/login"> Sign In</NuxtLink>
        </p> -->
      </div>
      <div class="banner-cover"></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="postcss" scoped>
.banner {
  @apply bg-community-black;
  @apply h-auto;
  @apply bg-homeHero bg-no-repeat;
  @apply bg-contain;
  @apply bg-right-bottom;
}

.banner-container {
  @apply flex flex-col lg: flex-row justify-between;
  @apply text-community-grey;
  @apply relative;
  @apply pb-0 pt-28 md: py-28;
}

.banner-cover {
  @apply md: w-3/12;
  height: 43vh;
}

.banner-header {
  @apply w-full lg: w-2/5;

  .heading {
    @apply text-4xl tracking-wide font-normal;
  }

  .heading>h1 {
    @apply inline-flex items-baseline;

    img {
      @apply px-1 pt-1;
    }
  }

  .community-description {
    @apply bg-community-black;
    @apply my-16;
    @apply text-xl;
  }

  .sub-heading {
    @apply font-light my-8;

    .link {
      @apply underline;
      @apply text-community-blue;
    }

    .link:hover {
      @apply text-white;
    }
  }
}

@media screen and (width: 1024px) {
  .banner {
    background-size: 67% !important;
  }
}

@media screen and (width: 768px) {
  .banner-cover {
    height: 50vh;
  }
}
</style>
