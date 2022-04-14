<template>
  <div>
    <form @submit.prevent="onSubmit">
      <FormAppDropDownSearch
        placeholderText="Search JOSA member"
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
import { ref } from 'vue'

const referral = ref(0)

const assignReferralValue = (referralID) => (referral.value = referralID)

const emit = defineEmits(['toggleSubmit'])

const onSubmit = () => {
  emit('toggleSubmit', { referralID: referral.value.id })
}
</script>
