<template>
  <div class="input-control">
    <label><slot /></label>
    <div class="dropdown-wrapper">
      <select
        :name="selectName"
        :id="selectName"
        class="w-full px-4 py-4 rounded-lg dd-bg-blue"
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
</style>
