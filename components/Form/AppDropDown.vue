<template>
  <div class="input-control">
    <label><slot /></label>
    <div class="dropdown-wrapper">
      <select
        :name="selectName"
        :id="selectName"
        class="bg-right-top w-full px-4 py-4 rounded-lg dd-bg-blue"
        @change="$emit('update:value', $event.target.value)"
      >
        <option
          v-for="(item, index) in listOfItems"
          :key="`item-${index}`"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  listOfItems: {
    type: Array,
    default: [],
  },
  selectName: {
    type: String,
    default: '',
  },
})
</script>
<style lang="postcss" scoped>
.dd-bg-blue {
  background-color: #e3e7e9;
}

select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-size: 2rem;
  appearance: none;
  background-position-y: center;
  background-position-x: right 1rem;
}
</style>
