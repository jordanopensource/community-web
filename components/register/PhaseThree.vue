<template>
  <div>
    <form @submit.prevent="onSubmit">
      <FormAppDropDownSearch
        v-if="members.length > 0"
        placeholderText="Search JOSA member"
        :listData="members"
        @emitSelected="(referralID) => assignReferralValue(referralID)"
      >
        Do you know how a current JOSA member that would vouch for you?
      </FormAppDropDownSearch>

      <div class="text-right">
        <FormAppButton btn-style="button-flat button-blue-full" type="submit"
          >Submit</FormAppButton
        >
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()

const referral = ref(0)
let members = ref([])

const assignReferralValue = (referralID) => (referral.value = referralID)

const emit = defineEmits(['toggleSubmit'])

const onSubmit = () => {
  emit('toggleSubmit', { vouched_by: referral.value.id })
}

onMounted(() => {
  fetch(`${config.BASE_API_URL}/member/all`)
    .then((res) => res.json())
    .then((json) => {
      members.value = json
    })
})
</script>
