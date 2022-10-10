<template>
  <div id="homepage">
    <!-- Banner -->
    <HomeHeroBanner />
    <!-- Why JOSA -->
    <div class="container my-16 lg:my-28">
      <HomeDetails class="mt-28" />
      <!-- Become a member -->
      <Banner
        bannerText="Already a JOSA Member?"
        :whiteBackground="true"
        :enableContainer="false"
      />
      <HomeCallToAction />
    </div>
  </div>
</template>
