<template>
  <FormAppDropDown
    profileStyle
    :listOfItems="permissions"
    :selectName="permissions[state.permissionStatus].text"
    v-model:value="state.permissionStatus"
    @change="() => updateVisibility()"
  />
</template>
<script setup>
const emit = defineEmits(['updateMember'])
const props = defineProps({
  permissionStatus: {
    type: Number,
    default: 2,
  },
  targetSettings: {
    type: String,
    default: '',
  },
})

const permissions = [
  { text: 'only me', value: 0 },
  { text: 'only members', value: 1 },
  { text: 'public', value: 2 },
]

const state = reactive({
  permissionStatus: props.permissionStatus,
})

const updateVisibility = async () => {
  const bodyData = {}
  bodyData[props.targetSettings] = state.permissionStatus
  await $fetch('/api/member/update/settings', {
    method: 'PATCH',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response.ok) {
        emit('updateMember')
      }
    },
  })
}
</script>
