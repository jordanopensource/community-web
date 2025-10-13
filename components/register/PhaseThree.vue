<template>
  <div>
    <form @submit.prevent="onSubmit">
      <FormAppDropDownSearch
        placeholderText="Search JOSA member"
        @emitSelected="(referralID) => assignReferralValue(referralID)"
      >
        Do you know how a current JOSA member that would vouch for you?
      </FormAppDropDownSearch>
      <!-- <div v-else>
        <p class="my-8">
          No Members are available to vouch for you atm , please processed with
          the registration
        </p>
      </div> -->

      <div
        class="flex flex-col md:flex-row md:justify-between items-end md:items-baseline"
      >
        <FormAppTermsAndConditions />
        <div class="text-right">
          <FormAppButton btn-style="button-flat button-blue-full" type="submit"
            >Submit</FormAppButton
          >
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

// Define props to receive initial data
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const referral = ref(0)

const assignReferralValue = (referralID) => (referral.value = referralID)

const emit = defineEmits(['toggleSubmit'])

const onSubmit = () => {
  emit('toggleSubmit', { vouched_byId: referral.value.id })
}
</script>
