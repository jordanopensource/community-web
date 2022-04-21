<template>
  <div class="banner">
    <div class="banner-container container">
      <div class="banner-header">
        <div class="heading">
          <h1>
            We&nbsp;
            <img
              src=" /icons/icon-small-love.svg"
              alt="Love"
              width="33"
              height="30"
              loading="lazy"
            />
            &nbsp;our community
          </h1>
        </div>
        <p class="community-description">
          The JOSA community is composed of tech enthusiasts that love to share
          their knowledge and cooperate on open source projects for a brighter
          tech ecosystem.
        </p>
        <div>
          <NuxtLink class="button-flat button-blue-full" to="/register">
            Become a JOSA member &rarr;
          </NuxtLink>
          <p class="sub-heading">
            Already a member?
            <NuxtLink class="link" to="/login"> Sign In</NuxtLink>
          </p>
        </div>
      </div>
      <div class="banner-cover"></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="postcss" scoped>
.banner {
  @apply bg-josa-black;
  @apply h-auto;
}

.banner-container {
  @apply flex flex-col md:flex-row justify-between;
  @apply text-josa-warm-grey;
  @apply relative;
  @apply py-28;
  @apply px-20;
}

.banner-header {
  /* font-family: 'IBM Mono'; */
  @apply w-full;

  .heading {
    @apply text-3xl lg:text-4xl tracking-wide font-normal;
  }
  .heading > h1 {
    @apply inline-flex;
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
