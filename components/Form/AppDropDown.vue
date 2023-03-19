<template>
  <div class="input-control">
    <label><slot /></label>
    <div class="dropdown-wrapper">
      <select
        :name="props.selectName"
        :id="props.selectName"
        :class="profileStyle ? 'profile-style' : 'default-style'"
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
  profileStyle: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="postcss" scoped>
.dd-bg-blue {
  background-color: #e3e7e9;
}

select {
  @apply w-full p-4 rounded-lg dd-bg-blue bg-no-repeat appearance-none bg-origin-content;
}
.default-style {
  background-image: url('/icons/arrow.png');
  background-size: 0.9rem;
  background-position: right center;
}
.profile-style {
  @apply h-10 w-40 border-2;
  padding: 6px;
  text-align: left;
  background: url('~/assets/icons/icon-eye-opened.svg');
  background-repeat: no-repeat;
  background-position: right center;
  background-origin: content-box;
  background-size: 1.2rem;
}
</style>
