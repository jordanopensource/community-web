<template>
  <div id="homepage">
    <!-- Banner -->
    <HomeHeroBanner />
    <!-- Why JOSA -->
    <div class="container my-16 lg:my-28">
      <HomeDetails class="mt-28" />
      <!-- Become a member -->
      <Banner
        banner-text="Already a JOSA Member?"
        :white-background="true"
        :enable-container="false"
      />
      <HomeCallToAction />
    </div>
  </div>
</template>
<script setup></script>
