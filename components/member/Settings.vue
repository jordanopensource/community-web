<template>
  <div id="linked-accounts" class="xl:max-w-1/2 container details-container">
    <h2 class="text-xl lg:text-2xl">Linked Accounts</h2>
    <div class="divider-slashes"></div>
    <form @submit.prevent="updateSettings">
      <div class="setting">
        <h3 class="heading divider-dotted pb-2.5">Github</h3>
        <div class="flex items-end">
          <FormAppControlInput :disabled="true" value="github.com/">
            <b>Github username</b></FormAppControlInput
          >
          <FormAppControlInput
            width="w-full"
            v-model:value="state.member.github_user"
            :value="state.member.github_user"
          >
          </FormAppControlInput>
        </div>
        <FormAppControlInput
          inputType="checkbox"
          v-model:value="state.settings.hideGithubContributions"
          :isChecked="state.settings.hideGithubContributions"
          @change="() => onCheck()"
        >
          <b>Hide contributions from Github on my profile</b>
        </FormAppControlInput>
      </div>
      <div class="setting">
        <h3 class="heading divider-dotted pb-2.5">Wikimedia</h3>
        <div class="">
          <FormAppControlInput
            v-model:value="state.member.wikimedia_user"
            :value="state.member.wikimedia_user"
          >
            <b>Wikimedia username</b>
          </FormAppControlInput>
          <FormAppControlInput
            inputType="checkbox"
            v-model:value="state.settings.hideWikimediaContributions"
            :isChecked="state.settings.hideWikimediaContributions"
            @change="() => onCheck()"
          >
            <b>Hide contributions from Wikimedia on my profile</b>
          </FormAppControlInput>
        </div>
      </div>
      <FormAppButton btnStyle="button-blue-full w-full">Save</FormAppButton>
    </form>
  </div>
</template>
<script setup>
const emit = defineEmits(['updateMember'])
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
  member: {
    github_user: props.member.github_user,
    wikimedia_user: props.member.wikimedia_user,
  },
  settings: {
    hideWikimediaContributions: props.settings.hideWikimediaContributions,
    hideGithubContributions: props.settings.hideGithubContributions,
  },
})

const onCheck = async () => {
  const bodyData = {
    hideWikimediaContributions: state.settings.hideWikimediaContributions,
    hideGithubContributions: state.settings.hideGithubContributions,
  }
  await useFetch(`/api/member/update/settings`, {
    method: 'PATCH',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response._data) {
        console.log(response._data)
        console.log('updated!')
      }
      emit('updateMember')
    },
    onResponseError({ response }) {
      // TODO: handle errors on client side
      console.log('something went wrong', response._data.message)
    },
  })
}
const updateSettings = async () => {
  const bodyData = {
    github_user: state.member.github_user,
    wikimedia_user: state.member.wikimedia_user,
  }
  await useFetch(`/api/member/update/info`, {
    method: 'PATCH',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response._data) {
        console.log(response._data)
        console.log('updated!')
      }
      emit('updateMember')
    },
    onResponseError({ response }) {
      // TODO: handle errors on client side
      console.log('something went wrong', response._data.message)
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
