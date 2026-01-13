<template>
  <div id="linked-accounts" class="xl:max-w-1/2 container details-container">
    <h2 class="text-xl lg:text-2xl">Linked Accounts</h2>
    <div class="divider-slashes"></div>
    <Message
      v-if="state.error && !state.loading"
      title="Error"
      type="error"
      class="mb-4"
      :showCloseBtn="false"
    >
      Something went wrong!
    </Message>
    <Message
      v-if="state.success && !state.loading"
      title="Saved"
      type="success"
      class="mb-4"
      :showCloseBtn="false"
    >
      Settings saved successfully.
    </Message>
    <form @submit.prevent="updateSettings">
      <div class="setting">
        <h3 class="heading divider-dotted pb-2.5">Github</h3>
        <div class="flex items-end">
          <FormAppControlInput :disabled="true" value="github.com/">
            <b>Github username</b></FormAppControlInput
          >
          <FormAppControlInput
            width="w-full"
            v-model:value="form.member.github_user"
            :value="form.member.github_user"
          >
          </FormAppControlInput>
        </div>
        <FormAppControlInput
          inputType="checkbox"
          labelId="show-github"
          @checkbox-changed="form.settings.hideGithubContributions = $event"
          :isChecked="form.settings.hideGithubContributions"
        >
          <b>Hide contributions from Github on my profile</b>
        </FormAppControlInput>
      </div>
      <div class="setting">
        <h3 class="heading divider-dotted pb-2.5">Wikimedia</h3>
        <div class="">
          <FormAppControlInput
            v-model:value="form.member.wikimedia_user"
            :value="form.member.wikimedia_user"
          >
            <b>Wikimedia username</b>
          </FormAppControlInput>
          <FormAppControlInput
            inputType="checkbox"
            labelId="show-wikimedia"
            @checkbox-changed="form.settings.hideWikimediaContributions = $event"
            :isChecked="form.settings.hideWikimediaContributions"
          >
            <b>Hide contributions from Wikimedia on my profile</b>
          </FormAppControlInput>
        </div>
      </div>
      <FormAppButton
        btnStyle="button-blue-full w-full mt-4"
        :disabled="state.loading"
      >
        <div class="flex flex-row justify-center gap-x-4">
          <div v-if="state.loading" class="loader"></div>
          <div>Save</div>
        </div>
      </FormAppButton>
    </form>
  </div>
</template>
<script setup>
const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
  settings: {
    type: Object,
    default: {},
  },
})
const state = reactive({
  loading: false,
  success: false,
  error: false,
})
const form = reactive({
  member: {
    github_user: props.member.github_user,
    wikimedia_user: props.member.wikimedia_user,
  },
  settings: {
    hideWikimediaContributions: props.settings.hideWikimediaContributions,
    hideGithubContributions: props.settings.hideGithubContributions,
  },
})

onMounted(() => {
  form.member = props.member
  form.settings = props.settings
})

const updateSettings = async () => {
  state.error = false
  state.loading = true
  const bodyData = form
  await $fetch(`/api/member/update/settings`, {
    method: 'PATCH',
    body: bodyData.settings,
    onResponse({ response }) {
      state.loading = false
      if (response._data) {
        state.success = true
      }
    },
    onResponseError({ response }) {
      state.error = true
      state.success = false
    },
  })
  await $fetch(`/api/member/update/info`, {
    method: 'PATCH',
    body: bodyData.member,
    onResponse({ response }) {
      state.loading = false
      if (response._data) {
        state.success = true
      }
    },
    onResponseError({ response }) {
      state.error = true
      state.success = false
    },
  })
}
</script>
<style lang="postcss" scoped>
.divider-slashes {
  @apply mt-5 mb-10;
  @apply h-3;
}

.setting {
  @apply mt-5;
}

.heading {
  @apply text-gray-500;
  @apply mb-5;
  font-family: 'IBM Sans';
}

ul {
  @apply list-none;
  @apply flex flex-col;
}

li {
  @apply w-full;
  @apply ml-0 mb-5;
  @apply flex flex-col justify-between;
  @apply text-xl;

  .title {
    @apply font-semibold text-base lg:text-xl;
    font-family: 'IBM Sans';
  }
  .sub-title {
    @apply font-normal text-base lg:text-xl;
    font-family: 'IBM Sans';
  }
  .date-container {
    @apply text-sm lg:text-lg text-gray-500;
    @apply text-right;
    @apply md:ml-auto;
  }
}
</style>
