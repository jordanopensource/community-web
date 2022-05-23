<template>
  <section class="wrapper">
    <div class="text-wrapper">
      <h2 class="font-bold mb-2">
        Be the first to have a JOSA account on josa.community
      </h2>
      <p class="w-full mr-8">
        This portal is made specifically for you! Play around with the
        community's features as soon as they are shipped, supporting JOSA in
        developing new ones.
      </p>
    </div>
    <div class="input-control form-wrapper">
      <form @submit.prevent="onSubmit" class="w-full h-fit flex flex-col">
        <div class="flex flex-row items-center">
          <FormAppControlInput
            name="email"
            inputType="email"
            placeholder="email@email.com"
            :isRequired="true"
            class="w-full input-container"
          >
            Enter email for early access:
            <span v-if="onSubmission.success">
              {{ onSubmission.text }}
            </span>
          </FormAppControlInput>
          <FormAppButton btn-style="button-flat button-blue-full" type="submit"
            >&rarr;</FormAppButton
          >
        </div>

        <FormAppControlInput inputType="checkbox" :isRequired="true">
          I accept and understand
          <NuxtLink
            to="https://www.josa.ngo/info/privacypolicy"
            class="underline text-josa-blue hover:text-josa-black"
          >
            JOSA's Privacy Policy
          </NuxtLink>
        </FormAppControlInput>
      </form>
    </div>
  </section>
</template>
<script setup>
import { reactive } from 'vue'

const config = useRuntimeConfig()
const onSubmission = reactive({
  text: 'Thanks! You will be notified when its ready!',
  success: false,
})

const hideSubmissionText = () => {
  setTimeout(() => {
    onSubmission.success = false
  }, 5000)
}

const onSubmit = (e) => {
  fetch(`${config.BASE_API_URL}/earlyaccess/create`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email: e.target.email.value }),
  })
    .then(() => {
      onSubmission.success = true
      hideSubmissionText()
    })
    .catch((error) => {
      console.log(error)
      onSubmission.text = 'Something went wrong 😞, probably a server error 🤷'
      onSubmission.success = true
      hideSubmissionText()
    })
}
</script>
<style lang="postcss" scoped>
section.wrapper {
  @apply flex flex-col justify-between lg:flex-row;
  @apply lg:gap-x-32 xl:gap-x-40;
  @apply mb-16;
}
section > a {
  @apply p-4;
  @apply text-2xl;
  @apply flex justify-between;
}
.text-wrapper {
  @apply flex flex-col justify-center;
}
.form-wrapper {
  @apply bg-gray-200;
  @apply w-full h-fit;
  @apply mt-8 lg:mt-0 md:p-8;
  @apply p-4;
}
.button-flat {
  @apply h-fit py-2.5 mt-4;
}
</style>
