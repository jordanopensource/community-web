<template>
  <div>
    <Banner bannerText="JOSA Members" />
    <section class="container my-16 lg:my-28">
      <h2 class="text-2xl lg:text-4xl mb-8">Directory of JOSA Members</h2>
      <div class="flex flex-col lg:flex-row-reverse lg:gap-x-10">
        <div class="shrink-0">
          <MembersFilter
            @searchMember="(name) => (state.searchName = name)"
            @filterMembers="(isChecked) => (state.isNoneJosaMember = isChecked)"
            @sortMembers="(orderBy) => (state.sortBy = orderBy)"
          />
        </div>
        <div class="grow">
          <Members
            :name="state.searchName"
            :isChecked="state.isNoneJosaMember"
            :sortBy="state.sortBy"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  sortBy: '',
  searchName: '',
  isNoneJosaMember: false,
})
</script>
