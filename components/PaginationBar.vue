<template>
  <div class="pt-7 pb-12 mx-3 px-5 flex lg:mx-0 lg:pt-10 lg:pb-14 justify-center" style="font-family: 'IBM Mono'">
    <ul class="p-0 list-none">
      <li class="inline m-1">
        <span class="px-1 lg:px-1"
          ><button
            :class="currentPage == 1 ? 'disabled' : 'previous-page'"
            class="rotate-90 pagination-arrows"
            aria-label="Previous Page"
            @click="fetchCurrentPage(currentPage - 1)"
          >
            <img src="/icons/arrow.png" alt="Previous Page">
          </button></span
        >
      </li>
      <span v-for="i in totalPages" :key="i" class="lg:inline">
        <li v-if="i == totalPages || i == 1 || Math.abs(i - currentPage) < 3" class="inline m-1">
          <button
            :class="{
              current: currentPage === i,
              last: i == totalPages && Math.abs(i - currentPage) > 3,
              first: i == 1 && Math.abs(i - currentPage) > 3,
            }"
            class="px-1 cursor-pointer"
            :aria-label="'Page ' + i"
            @click="fetchCurrentPage(i)"
          >
            {{ i }}
          </button>
        </li>
      </span>
      <li class="inline m-1">
        <span class="px-1 lg:px-1"
          ><button
            :class="currentPage == totalPages ? 'disabled' : 'next-page'"
            class="-rotate-90 pagination-arrows"
            aria-label="Next Page"
            @click="fetchCurrentPage(currentPage + 1)"
          >
            <img src="/icons/arrow.png" alt="Next Page">
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

<style scoped>
.previous-page,
.next-page {
  color: #0c97ac;
}

.disabled {
  cursor: default;
  font-weight: 300;
  opacity: 0.25;
  pointer-events: none;
}

.current {
  padding: 0 0.5rem;
  background-color: #0c97ac;
  color: #fff;
  border-radius: 17%;
}

.first::after {
  cursor: default;
  content: '\2800\22ef';
}

.last::before {
  cursor: default;
  content: '\22ef\2800';
}

.pagination-arrows {
  max-width: 1rem;
}
</style>
