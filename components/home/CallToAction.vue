<template>
  <div class="container px-14 md:px-20 mb-32">
    <section>
      <div
        class="flex flex-col justify-between lg:flex-row mb-16 lg:gap-x-32 xl:gap-x-40"
      >
        <div class="flex flex-col justify-center">
          <p class="font-bold mb-2">
            Be the first to have a JOSA account on josa.community
          </p>
          <p class="w-full mr-8">
            This portal is made specifically for you! Play around with the
            community's features as soon as they are shipped, supporting JOSA in
            developing new ones.
          </p>
        </div>
        <div
          class="input-control mt-8 lg:mt-0 w-full h-fit bg-gray-200 p-4 md:p-8"
        >
          <form
            @submit.prevent="onSubmit"
            class="w-full h-fit flex flex-row items-center"
          >
            <FormAppControlInput
              name="email"
              inputType="email"
              placeholder="email@email.com"
              :isRequired="true"
              class="w-full"
            >
              Enter email for early access:
              <span v-if="onSubmission.success">
                {{ onSubmission.text }}
              </span>
            </FormAppControlInput>
            <FormAppButton
              btn-style="button-flat button-blue-full"
              type="submit"
              >&rarr;</FormAppButton
            >
          </form>
        </div>
      </div>
    </section>
  </div>
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
section > a {
  @apply p-4;
  @apply text-2xl;
  @apply flex justify-between;
}

.button-flat {
  @apply h-fit py-2.5 mt-4;
}
</style>
