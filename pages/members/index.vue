<template>
  <Banner bannerText="JOSA Members" />
  <section class="container my-16">
    <h2 class="text-2xl lg:text-4xl mb-8">Directory of JOSA Members</h2>
    <div class="flex flex-col lg:flex-row-reverse lg:gap-x-8">
      <div class="shrink-0">
        <MembersFilter />
      </div>
      <div class="grow">
        <Members />
      </div>
    </div>
  </section>
</template>

<script setup></script>
