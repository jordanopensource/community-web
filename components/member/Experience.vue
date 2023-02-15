<template>
  <div id="member-experience-and-education" class="container details-container">
    <h2 class="text-xl lg:text-2xl">Experience and Education</h2>
    <div class="divider-slashes"></div>

    <div v-if="props.experience.length" class="experience">
      <div class="flex justify-between w-full">
        <h3 class="heading">Work Experience</h3>
        <div
          v-if="memberAuth"
          @click="
            () => (showAddWorkExperienceForm = !showAddWorkExperienceForm)
          "
        >
          <img
            v-if="!showAddWorkExperienceForm"
            src="/icons/add.svg"
            alt=""
            class="cursor-pointer"
          />
          <img v-else src="/icons/x.svg" alt="" class="cursor-pointer" />
        </div>
      </div>
      <ul>
        <li
          v-for="(experience, index) in experienceSorted"
          :key="index"
          class="divider-dotted pb-2.5"
        >
          <div class="w-full flex flex-col md:flex-row">
            <div>
              <h4 class="title">{{ experience.company_name }}</h4>
              <h5 class="sub-title">{{ experience.position }}</h5>
            </div>
            <p class="date-container">
              {{ formatDate(experience.start_date) }} -
              {{
                experience.end_date
                  ? formatDate(experience.end_date)
                  : 'Current'
              }}
            </p>
            <div v-if="false">
              <form action=""></form>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="showAddWorkExperienceForm">
        <form @submit.prevent="addMemberWorkExperience">
          <FormAppControlInput
            v-model:value="state.form.workExperience.company"
          >
            Company Name
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.workExperience.position"
          >
            Position
          </FormAppControlInput>
          <FormAppControlInput
            inputType="date"
            v-model:value="state.form.workExperience.start_date"
          >
            Start Date
          </FormAppControlInput>
          <FormAppControlInput
            inputType="date"
            v-model:value="state.form.workExperience.end_date"
          >
            End Date
          </FormAppControlInput>
          <FormAppButton> Add </FormAppButton>
        </form>
      </div>
    </div>

    <div v-if="props.education.length" class="education">
      <div class="flex justify-between w-full">
        <h3 class="heading">Education</h3>
        <div
          v-if="memberAuth"
          @click="() => (showAddEducationForm = !showAddEducationForm)"
        >
          <img
            v-if="!showAddEducationForm"
            src="/icons/add.svg"
            alt=""
            class="cursor-pointer"
          />
          <img v-else src="/icons/x.svg" alt="" class="cursor-pointer" />
        </div>
      </div>
      <ul>
        <li
          v-for="(education, index) in educationSorted"
          :key="index"
          class="divider-dotted pb-2.5"
        >
          <div class="w-full flex flex-col md:flex-row">
            <div>
              <h4 class="title">{{ education.institution_name }}</h4>
              <h5 class="sub-title">{{ education.degree }}</h5>
            </div>
            <p class="date-container">{{ formatDate(education.graduated) }}</p>
          </div>
        </li>
      </ul>
      <div v-if="showAddEducationForm">
        <form @submit.prevent="addMemberEducation">
          <FormAppControlInput
            v-model:value="state.form.education.institution_name"
          >
            Institution Name
          </FormAppControlInput>
          <FormAppControlInput v-model:value="state.form.education.degree">
            Degree
          </FormAppControlInput>
          <FormAppControlInput
            inputType="date"
            v-model:value="state.form.education.graduated"
          >
            graduated
          </FormAppControlInput>
          <FormAppButton> Add </FormAppButton>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
const showAddWorkExperienceForm = useState(
  'showAddWorkExperienceForm',
  () => false
)
const showUpdateWorkExperienceForm = useState(
  'showUpdateWorkExperienceForm',
  () => false
)
const showAddEducationForm = useState('showAddEducationForm', () => false)
const showUpdateEducationForm = useState('showUpdateEducationForm', () => false)

const props = defineProps({
  education: {
    type: Object,
    default: [],
  },
  experience: {
    type: Object,
    default: [],
  },
  memberAuth: {
    type: Boolean,
    default: false,
  },
})

const state = reactive({
  form: {
    workExperience: {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
    },
    education: {
      institution_name: '',
      degree: '',
      graduated: '',
    },
  },
})

const addMemberWorkExperience = async () => {
  const bodyData = {
    company_name: state.form.workExperience.company,
    position: state.form.workExperience.position,
    start_date: state.form.workExperience.start_date,
    end_date: state.form.workExperience.end_date,
  }
  await useFetch(`/api/member/create/experience`, {
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
  showAddWorkExperienceForm.value = !showAddWorkExperienceForm
}

const addMemberEducation = async () => {
  const bodyData = {
    institution_name: state.form.education.institution_name,
    degree: state.form.education.degree,
    graduated: state.form.education.graduated,
  }
  await useFetch(`/api/member/create/education`, {
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
  showAddEducationForm.value = !showAddEducationForm
}
const updateMemberEducation = () => {}

const experienceSorted = props.experience.sort(
  (a, b) => new Date(b.end_date) > new Date(a.end_date)
)
const educationSorted = props.education.sort(
  (a, b) => new Date(b.end_date) > new Date(a.end_date)
)

const formatDate = (date) => {
  const newDate = new Date(date)
  const [month, year] = [
    newDate.toLocaleString('en-US', { month: 'long' }),
    newDate.getFullYear(),
  ]
  return `${month} ${year}`
}
</script>
<style lang="postcss" scoped>
.divider-slashes {
  @apply mt-5 mb-10;
  @apply h-3;
}

.heading {
  @apply text-gray-500;
  @apply mb-5;
  font-family: 'IBM Sans';
}

.experience,
.education {
  @apply mt-5;
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
