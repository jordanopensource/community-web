<template>
  <div class="container px-20 mb-16">
    <section>
      <div class="flex flex-col justify-between lg:flex-row mb-16">
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
        <div class="input-control mt-8 lg:mt-0 w-full h-fit bg-gray-200 p-8">
          <form
            @submit.prevent="onSubmit"
            class="w-full h-fit flex flex-row items-center"
          >
            <FormAppControlInput
              v-model:value="form.email"
              inputType="email"
              placeholder="email@email.com"
              isRequired="required"
              class="w-full"
            >
              Enter email for early access:
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

const form = reactive({
  email: '',
})
const onSubmit = () => {
  // Fetch post request
  console.log(form)
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
