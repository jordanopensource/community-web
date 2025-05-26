<template>
  <div v-if="loading" class="loader"></div>
  <div v-else-if="members?.items?.length">
    <h2 class="text-2xl mono" id="members-found-heading">
      {{ members.meta.totalItems }} members found
    </h2>
    <div v-for="(member, index) in members.items" :key="`item-${index}`">
      <MembersCard :member="member" />
    </div>
  </div>
  <div v-else-if="!members?.items?.length">
    <p>No Members found</p>
  </div>
  <div v-else-if="!members">
    <p>Error loading members or no members found.</p>
  </div>
  <PaginationBar
    v-if="!loading && members?.items?.length"
    :currentPage="currentPage"
    :totalPages="members.meta.totalPages"
    @switchPage="(newPage) => (currentPage = newPage)"
  />
</template>
<script setup>
  import qs from 'qs'
  const currentPage = ref(1)

  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    isChecked: {
      type: Boolean,
      default: true,
    },
    sortBy: {
      type: String,
      default: '',
    },
  })

  const apiQueryParameters = computed(() => {
    const params = {}
    if (props.name && props.name.length > 0) {
      params.name = props.name
    }
    params.is_none_josa_member = props.isChecked

    if (props.sortBy) {
      const [criteria, orderBy] = props.sortBy.split(',')
      if (orderBy && criteria) {
        params.order_by = orderBy
        params.order_criteria = criteria
      }
    }
    return params
  })

  const { data: members, pending: loading } = await useLazyAsyncData(
    () =>
      $api(
        `member/page/${currentPage.value}?${qs.stringify(apiQueryParameters.value)}`,
      ),
    {
      watch: [apiQueryParameters, currentPage],
      default: () => ({ items: [], meta: { totalItems: 0, totalPages: 0 } }),
    },
  )
</script>
