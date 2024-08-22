<template>
  <div id="member-detail" class="details-container">
    <Message
      v-if="state.error && !state.loading"
      title="Error"
      type="error"
      class="mb-4"
    >
      Something went wrong!
    </Message>
    <Message
      v-if="state.success && !state.loading"
      title="Saved"
      type="success"
      class="mb-4"
    >
      Settings saved successfully.
    </Message>
    <div class="flex justify-between w-full">
      <h3 class="heading">About</h3>
      <div v-if="memberAuth" class="flex gap-x-4 items-center">
        <MemberPermissionDropDown
          :permission-status="state.settings.about"
          target-settings="about"
        />
        <div
          class="edit-btn"
          :class="showUpdateAboutForm ? 'bg-xIcon' : 'bg-editIcon'"
          @click="() => (showUpdateAboutForm = !showUpdateAboutForm)"
        ></div>
      </div>
    </div>
    <div v-if="!showUpdateAboutForm">
      <p v-if="props.member.about" class="member-about">
        {{ props.member.about }}
      </p>
      <div v-if="props.skills?.length" class="skills">
        <p class="heading">Skills</p>
        <ul>
          <li v-for="(skill, index) in props.skills" :key="`skill-${index}`">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="updateMemberDetailsInfo">
        <FormAppControlInput
          v-model:value="state.form.memberAbout"
          input-type="textarea"
          :value="props.member.about"
        >
        </FormAppControlInput>

        <FormAppButton> Save </FormAppButton>
      </form>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['updateMember'])
const showUpdateAboutForm = useState('showUpdateAboutForm', () => false)
const props = defineProps({
  member: {
    type: Object,
    default: () => {},
  },
  settings: {
    type: Object,
    default: () => {},
  },
  skills: {
    type: Array,
    default: null,
  },
  memberAuth: {
    type: Boolean,
    default: false,
  },
})

const state = reactive({
  form: {
    memberAbout: props.member.about,
  },
  settings: props.settings,
  loading: false,
  success: false,
  error: false,
})

const formatDate = (date) => {
  const newDate = new Date(date)
  const [month, year] = [
    newDate.toLocaleString('en-US', { month: 'long' }),
    newDate.getFullYear(),
  ]
  return `${month} ${year}`
}

// handle updating the users general info
const updateMemberDetailsInfo = async (event) => {
  state.loading = true
  state.error = false
  state.success = false

  const bodyData = {
    about: state.form.memberAbout,
  }

  await useFetch(`/api/member/update/info`, {
    method: 'PATCH',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response.ok) {
        state.error = false
        state.success = true
        state.loading = false
      }
      emit('updateMember')
    },
    onResponseError({ response }) {
      state.error = true
      state.success = false
      state.loading = false
      console.log('something went wrong', response._data.message)
    },
  })
  showUpdateAboutForm.value = !showUpdateAboutForm
}
</script>
<style lang="postcss" scoped>
.heading {
  @apply text-gray-500;
  @apply mb-5;
  font-family: 'IBM Sans';
}

.skills {
  ul {
    @apply list-none;
    @apply flex flex-row;
  }

  li {
    @apply w-fit;
    @apply ml-0 mb-4 p-2;
    @apply lg:mr-4 lg:mb-auto;
    @apply bg-gray-200;
    @apply rounded-lg;
  }
}
</style>
