<template>
  <div id="member-experience-and-education" class="container details-container">
    <h2 class="text-xl lg:text-2xl">Experience and Education</h2>
    <div v-if="memberAuth" class="flex flex-row gap-x-2 justify-end">
      <MemberPermissionDropDown
        :permissionStatus="state.settings.experienceAndEducation"
        targetSettings="experienceAndEducation"
      />
    </div>
    <div class="divider-slashes"></div>
    <!-- WORK EXPERIENCE -->
    <div class="experience">
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
      <ul v-if="props.experience.length">
        <li
          v-for="(experience, index) in experienceSorted.list"
          :key="index"
          class="divider-dotted pb-2.5"
        >
          <div class="w-full flex flex-col md:flex-row">
            <div>
              <h4 class="title">{{ experience.company_name }}</h4>
              <h5 class="sub-title">{{ experience.position }}</h5>
            </div>
            <p class="date-container">
              {{ formatDate(experience.start_date) }} &ndash;
              {{
                experience.end_date
                  ? formatDate(experience.end_date)
                  : 'Current'
              }}
            </p>
            <div class="flex justify-end mt-4 md:mt-0">
              <!-- Delete Work Experience Form -->
              <div v-if="memberAuth">
                <form @submit.prevent="deleteMemberWorkExperience">
                  <input
                    type="hidden"
                    name="experienceId"
                    :value="experience.id"
                  />
                  <FormAppButton btnStyle="delete-btn"></FormAppButton>
                </form>
              </div>
              <!-- Update Work Experience Form Trigger -->
              <div
                v-if="memberAuth"
                @click="
                  () => {
                    showUpdateWorkExperienceForm = true
                    state.form.workExperience = { ...experience }
                  }
                "
              >
                <img src="/icons/edit.svg" alt="" class="cursor-pointer" />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- Add Work Experience Form -->
      <div v-if="showAddWorkExperienceForm">
        <form
          @submit.prevent="addMemberWorkExperience"
          class="border px-16 py-8"
        >
          <FormAppControlInput
            v-model:value="state.form.workExperience.company_name"
            isRequired
          >
            <b>Company Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.workExperience.position"
            isRequired
          >
            <b>Position</b>
          </FormAppControlInput>
          <label><b>Start Date</b></label>
          <VueDatePicker
            month-picker
            v-model="state.form.workExperience.start_date"
            placeholder="Select start date"
            :max-date="new Date()"
            required
          />
          <label class="block mt-4">
            <b>End Date</b>
          </label>
          <FormAppControlInput
            inputType="checkbox"
            @checkbox-changed="
              state.form.workExperience.currently_working = $event
            "
            labelId="currently-working-add"
            class="mt-2"
          >
            Currently working here
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.workExperience.currently_working"
            month-picker
            required
            v-model="state.form.workExperience.end_date"
            placeholder="Select end date"
            :min-date="
              new Date(
                state.form.workExperience.start_date.year,
                state.form.workExperience.start_date.month
              )
            "
          />
          <FormAppButton class="mt-4"> Add </FormAppButton>
        </form>
      </div>
      <!-- Update Work Experience Form -->
      <div v-if="showUpdateWorkExperienceForm">
        <form
          @submit.prevent="updateMemberWorkExperience"
          class="border px-16 py-8"
        >
          <div class="flex justify-end w-full">
            <img
              src="/icons/x.svg"
              alt=""
              class="cursor-pointer"
              @click="() => (showUpdateWorkExperienceForm = false)"
            />
          </div>
          <FormAppControlInput
            v-model:value="state.form.workExperience.company_name"
            :value="state.form.workExperience.company_name"
            isRequired
          >
            <b>Company Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.workExperience.position"
            :value="state.form.workExperience.position"
            isRequired
          >
            <b>Position</b>
          </FormAppControlInput>
          <label><b>Start Date</b></label>
          <VueDatePicker
            month-picker
            v-model="state.form.workExperience.start_date"
            placeholder="Select start date"
            :max-date="new Date()"
            required
          />
          <label class="block mt-4">
            <b>End Date</b>
          </label>
          <FormAppControlInput
            inputType="checkbox"
            @checkbox-changed="
              state.form.workExperience.currently_working = $event
            "
            labelId="currently-working-edit"
            class="mt-2"
          >
            Currently working here
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.workExperience.currently_working"
            month-picker
            required
            v-model="state.form.workExperience.end_date"
            placeholder="Select end date"
            :min-date="
              new Date(
                state.form.workExperience.start_date.year,
                state.form.workExperience.start_date.month
              )
            "
          />
          <FormAppButton class="mt-4"> Update </FormAppButton>
        </form>
      </div>
    </div>
    <!-- EDUCATION -->
    <div class="education">
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
      <ul v-if="props.education.length">
        <li
          v-for="(education, index) in educationSorted.list"
          :key="index"
          class="divider-dotted pb-2.5"
        >
          <div class="w-full flex flex-col md:flex-row">
            <div>
              <h4 class="title">{{ education.institution_name }}</h4>
              <h5 class="sub-title">{{ education.degree }}</h5>
            </div>
            <p class="date-container">
              {{
                education.graduated
                  ? formatDate(education.graduated)
                  : 'Current'
              }}
            </p>
            <div class="flex justify-end mt-4 md:mt-0">
              <!-- Delete Education Form Button -->
              <div v-if="memberAuth">
                <form @submit.prevent="deleteMemberEducation">
                  <input
                    type="hidden"
                    name="educationId"
                    :value="education.id"
                  />
                  <FormAppButton btnStyle="delete-btn"></FormAppButton>
                </form>
              </div>
              <!-- Update Education trigger  -->
              <div
                v-if="memberAuth"
                @click="
                  () => {
                    showUpdateEducationForm = true
                    state.form.education = { ...education }
                  }
                "
              >
                <img src="/icons/edit.svg" alt="" class="cursor-pointer" />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- Add Education Form -->
      <div v-if="showAddEducationForm">
        <form @submit.prevent="addMemberEducation" class="border px-16 py-8">
          <FormAppControlInput
            v-model:value="state.form.education.institution_name"
            isRequired
          >
            <b>Institution Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.education.degree"
            isRequired
          >
            <b>Degree</b>
          </FormAppControlInput>
          <label class="block"><b>Graduation Date</b></label>
          <FormAppControlInput
            inputType="checkbox"
            @checkbox-changed="state.form.education.still_studying = $event"
            labelId="currently-studying-add"
          >
            I'm still studying
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.education.still_studying"
            month-picker
            v-model="state.form.education.graduated"
            placeholder="Select graduation date"
            required
          />

          <FormAppButton class="mt-4"> Add </FormAppButton>
        </form>
      </div>
      <!-- Update Education Form -->
      <div v-if="showUpdateEducationForm">
        <form @submit.prevent="updateMemberEducation" class="border px-16 py-8">
          <div class="flex justify-end w-full">
            <img
              src="/icons/x.svg"
              alt=""
              class="cursor-pointer flex"
              @click="() => (showUpdateEducationForm = false)"
            />
          </div>
          <FormAppControlInput
            v-model:value="state.form.education.institution_name"
            :value="state.form.education.institution_name"
            isRequired
          >
            <b>Institution Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.education.degree"
            :value="state.form.education.degree"
            isRequired
          >
            <b>Degree</b>
          </FormAppControlInput>
          <label class="block"><b>Graduation Date</b></label>
          <FormAppControlInput
            inputType="checkbox"
            @checkbox-changed="state.form.education.still_studying = $event"
            labelId="currently-studying-edit"
          >
            I'm still studying
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.education.still_studying"
            month-picker
            v-model="state.form.education.graduated"
            placeholder="Select graduation date"
            required
          />

          <FormAppButton class="mt-4"> update </FormAppButton>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['updateMember'])
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
  settings: {
    type: Object,
    default: {},
  },
})

const state = reactive({
  form: {
    workExperience: {
      company_name: '',
      position: '',
      start_date: '',
      currently_working: false,
      end_date: null,
      id: '',
    },
    education: {
      institution_name: '',
      degree: '',
      still_studying: false,
      graduated: '',
      id: '',
    },
  },
  settings: props.settings,
})

/**
 * Member Work Experience
 *
 *
 */
const addMemberWorkExperience = async () => {
  const bodyData = {
    company_name: state.form.workExperience.company_name,
    position: state.form.workExperience.position,
    start_date: new Date(
      state.form.workExperience.start_date.year,
      state.form.workExperience.start_date.month
    ),
    end_date: state.form.workExperience.currently_working
      ? null
      : new Date(
          state.form.workExperience.end_date.year,
          state.form.workExperience.end_date.month
        ),
  }
  await useFetch(`/api/member/create/experience`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response._data.success) {
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
  showAddWorkExperienceForm.value = !showAddWorkExperienceForm
}

const deleteMemberWorkExperience = async (event) => {
  const { value } = event.target.experienceId

  const deleteItem = confirm('Are you sure you want to delete this?')

  deleteItem &&
    (await $fetch(`/api/member/delete/experience/${value}`, {
      method: 'DELETE',
      onResponse({ response }) {
        emit('updateMember')
      },
      onResponseError({ response }) {
        // TODO: handle errors on client side
        console.log('something went wrong', response._data.message)
      },
    }))
}

const updateMemberWorkExperience = async () => {
  const bodyData = {
    company_name: state.form.workExperience.company_name,
    position: state.form.workExperience.position,
    start_date: new Date(
      state.form.workExperience.start_date.year,
      state.form.workExperience.start_date.month
    ),
    end_date: state.form.workExperience.currently_working
      ? null
      : new Date(
          state.form.workExperience.end_date.year,
          state.form.workExperience.end_date.month
        ),
  }
  try {
    await $fetch(
      `/api/member/update/experience/${state.form.workExperience.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(bodyData),
        onResponse({ response }) {
          if (response._data.success) {
            console.log(response._data)
            console.log('updated!')
          }
          emit('updateMember')
        },
        onResponseError({ response }) {
          // TODO: handle errors on client side
          console.log('something went wrong', response._data.message)
        },
      }
    )
  } catch (error) {
    console.log('ERROR')
    console.log(error)
  }
  showUpdateWorkExperienceForm.value = !showUpdateWorkExperienceForm
}

/**
 * Member Education
 *
 *
 */
const addMemberEducation = async () => {
  const bodyData = {
    institution_name: state.form.education.institution_name,
    degree: state.form.education.degree,
    graduated: state.form.education.still_studying
      ? null
      : new Date(
          state.form.education.graduated.year,
          state.form.education.graduated.month
        ),
  }
  await $fetch(`/api/member/create/education`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response._data.success) {
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
  showAddEducationForm.value = !showAddEducationForm
}

const deleteMemberEducation = async (event) => {
  const { value } = event.target.educationId

  const deleteItem = confirm('Are you sure you want to delete this?')

  deleteItem &&
    (await $fetch(`/api/member/delete/education/${value}`, {
      method: 'DELETE',
      onResponse({ response }) {
        emit('updateMember')
      },
      onResponseError({ response }) {
        // TODO: handle errors on client side
        console.log('something went wrong', response._data.message)
      },
    }))
}

const updateMemberEducation = async () => {
  const bodyData = {
    institution_name: state.form.education.institution_name,
    degree: state.form.education.degree,
    graduated: state.form.education.still_studying
      ? null
      : new Date(
          state.form.education.graduated.year,
          state.form.education.graduated.month
        ),
  }
  await $fetch(`/api/member/update/education/${state.form.education.id}`, {
    method: 'PATCH',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response._data.success) {
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
  showUpdateEducationForm.value = !showUpdateEducationForm
}
const sortRules = reactive({
  experience: (a, b) => {
    if (!a.end_date) return -1 // if a is null, a comes first
    if (!b.end_date) return 1 // b comes first
    return new Date(b.end_date) - new Date(a.end_date)
  },
  education: (a, b) => {
    if (!a.graduated) return -1
    if (!b.graduated) return 1
    return new Date(b.graduated) - new Date(a.graduated)
  },
})
const experienceSorted = reactive({
  list: props.experience.sort((a, b) => sortRules.experience(a, b)),
})
const educationSorted = reactive({
  list: props.education.sort((a, b) => sortRules.education(a, b)),
})
watchEffect(() => {
  if (props.experience)
    experienceSorted.list = props.experience.sort((a, b) =>
      sortRules.experience(a, b)
    )
  if (props.education)
    educationSorted.list = props.education.sort((a, b) =>
      sortRules.education(a, b)
    )
})
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
