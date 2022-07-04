<template>
  <div class="pagination">
    <ul>
      <li>
        <span class="px-1 lg:px-1"
          ><button
            :class="currentPage == 1 ? 'disabled' : 'previous-page'"
            aria-label="Previous Page"
            @click="fetchCurrentPage(currentPage - 1)"
          >
            &lt; Previous
          </button></span
        >
      </li>
      <span v-for="i in totalPages" :key="i" class="hidden lg:inline">
        <li v-if="i == totalPages || i == 1 || Math.abs(i - currentPage) < 3">
          <button
            :class="{
              current: currentPage === i,
              last: i == totalPages && Math.abs(i - currentPage) > 3,
              first: i == 1 && Math.abs(i - currentPage) > 3,
            }"
            class="px-1"
            :aria-label="'Page ' + i"
            @click="fetchCurrentPage(i)"
          >
            {{ i }}
          </button>
        </li>
      </span>
      <li>
        <span class="px-1 lg:px-1"
          ><button
            :class="currentPage == totalPages ? 'disabled' : 'next-page'"
            aria-label="Next Page"
            @click="fetchCurrentPage(currentPage + 1)"
          >
            Next &gt;
          </button></span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
const currentPage = ref()
const props = defineProps({
  currentPage: {
    type: Number,
  },
  totalPages: {
    type: Number,
  },
})

const emit = defineEmits(['switchPage'])

const fetchCurrentPage = (newCurrentPage) => {
  emit('switchPage', newCurrentPage)
}

watch(() => (currentPage.value = props.currentPage))
</script>

<style lang="postcss" scoped>
* {
  font-family: 'IBM Mono';
}
.pagination {
  @apply pt-7 pb-12 mx-3 px-5 flex lg:mx-0 lg:pt-10 lg:pb-14 justify-center;
}

.pagination li {
  display: inline-block;
  margin: 1px;
}

.previous-page,
.next-page {
  color: #0c97ac;
}

.pagination button.disabled {
  @apply cursor-default font-light;
  opacity: 0.25;
}
.pagination a.disabled:hover {
  @apply cursor-default;
}

.pagination .current {
  @apply px-2 py-0;
  background-color: #0c97ac;
  color: #fff;
  border-radius: 17%;
}
.pagination ul {
  @apply p-0 list-none;
}
.pagination li {
  @apply inline m-1;
}
.pagination button.first::after {
  cursor: default;
  content: '\2800\22ef';
}
.pagination button.last::before {
  cursor: default;
  content: '\22ef\2800';
}

.pagination button {
  cursor: pointer;
}
</style>
