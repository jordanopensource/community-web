<template>
  <div id="member-detail" class="details-container">
    <div class="flex justify-between w-full">
      <h3 class="heading">About</h3>
      <div
        v-if="memberAuth"
        @click="() => (showUpdateAboutForm = !showUpdateAboutForm)"
      >
        <img
          v-if="!showUpdateAboutForm"
          src="/icons/edit.svg"
          alt=""
          class="cursor-pointer"
        />
        <img v-else src="/icons/x.svg" alt="" class="cursor-pointer" />
      </div>
    </div>
    <div v-if="!showUpdateAboutForm">
      <p class="member-about">
        {{ props.member.about ? props.member.about : '' }}
      </p>
      <div v-if="props.skills.length" class="skills">
        <p class="heading">Skills</p>
        <ul>
          <li v-for="(skill, index) in memberSkills" :key="`skill-${index}`">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="updateMemberDetailsInfo">
        <FormAppControlInput
          v-model:value="state.form.memberAbout"
          inputType="textarea"
        >
        </FormAppControlInput>

        <FormAppButton> Save </FormAppButton>
      </form>
    </div>
  </div>
</template>
<script setup>
const memberSkills = ['Linux Operating System', 'File System']
const showUpdateAboutForm = useState('showUpdateAboutForm', () => false)
const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
  skills: {
    type: Object,
    default: {},
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
  const bodyData = {
    about: state.form.memberAbout,
  }

  await useFetch(`/api/member/update/info`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response._data.success) {
        console.log(response._data)
        console.log('updated!')
      }
    },
    onResponseError({ response }) {
      // TODO: handle errors on client side
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
