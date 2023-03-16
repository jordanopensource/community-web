<template>
  <div class="input-control">
    <label><slot /></label>
    <div class="dropdown-wrapper">
      <select
        :name="props.selectName"
        :id="props.selectName"
        class="bg-right-top w-full px-4 py-4 rounded-lg dd-bg-blue"
        @change="$emit('update:value', $event.target.value)"
      >
        <option
          v-for="(item, index) in props.listOfItems"
          :key="`item-${index}`"
          :value="item.value"
          :selected="item.text === props.selectName ? true : false"
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
  background-image: url('/icons/arrow.png');
  background-repeat: no-repeat;
  background-size: 0.9rem;
  appearance: none;
  background-position: 7.75rem center;
}
</style>
