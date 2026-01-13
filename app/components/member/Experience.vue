<template>
  <div id="member-experience-and-education" class="container details-container">
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
    <h2 class="text-xl lg:text-2xl">Experience and Education</h2>
    <div v-if="memberAuth" class="flex flex-row gap-x-2 justify-end">
      <MemberPermissionDropDown
        :permission-status="state.settings.experienceAndEducation"
        target-settings="experienceAndEducation"
        @update-member="emit('updateMember')"
      />
    </div>
    <div class="divider-slashes"></div>
    <!-- WORK EXPERIENCE -->
    <div class="experience">
      <div class="flex justify-between w-full">
        <h3 class="heading">Work Experience</h3>
        <div
          v-if="memberAuth"
          class="cursor-pointer bg-contain w-5 h-5 bg-no-repeat"
          :class="showAddWorkExperienceForm ? 'bg-xIcon' : 'bg-addIcon'"
          @click="
            () => {
              showAddWorkExperienceForm = !showAddWorkExperienceForm
              showUpdateWorkExperienceForm = false
              state.form.workExperience = { ...defaultWorkExperience }
            }
          "
        ></div>
      </div>
      <ul v-if="props.experience.length">
        <li
          v-for="(experience, index) in experienceSorted.list"
          :key="index"
          class="divider-dotted pb-2.5"
        >
          <div class="w-full flex flex-col md:flex-row">
            <div class="min-w-max">
              <h4 class="title">{{ experience.company_name }}</h4>
              <h5 class="sub-title">{{ experience.position }}</h5>
            </div>
            <div class="w-full flex flex-row justify-between">
              <p class="date-container">
                {{ formatDate(experience.start_date) }} &ndash;
                {{
                  experience.end_date
                    ? formatDate(experience.end_date)
                    : 'Current'
                }}
              </p>
              <div
                v-if="memberAuth"
                class="flex flex-row justify-around gap-x-2 m-2"
              >
                <!-- Delete Work Experience Form -->
                <form
                  class="inline-flex w-4 h-4"
                  @submit.prevent="deleteMemberWorkExperience"
                >
                  <input
                    type="hidden"
                    name="experienceId"
                    :value="experience.id"
                  />
                  <FormAppButton btn-style="delete-btn"></FormAppButton>
                </form>
                <!-- Update Work Experience Form Trigger -->
                <div
                  class="edit-btn bg-editIcon"
                  @click="
                    () => {
                      showUpdateWorkExperienceForm = true
                      showAddWorkExperienceForm = false
                      state.form.workExperience = { ...experience }
                    }
                  "
                ></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- Add Work Experience Form -->
      <div v-if="showAddWorkExperienceForm">
        <form
          class="border px-16 py-8"
          @submit.prevent="addMemberWorkExperience"
        >
          <FormAppControlInput
            v-model:value="state.form.workExperience.company_name"
            is-required
          >
            <b>Company Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.workExperience.position"
            is-required
          >
            <b>Position</b>
          </FormAppControlInput>
          <label><b>Start Date</b></label>
          <VueDatePicker
            v-model="state.form.workExperience.start_date"
            month-picker
            placeholder="Select start date"
            :max-date="new Date()"
            required
          />
          <label class="block mt-4">
            <b>End Date</b>
          </label>
          <FormAppControlInput
            input-type="checkbox"
            label-id="currently-working-add"
            class="mt-2"
            @checkbox-changed="
              state.form.workExperience.currently_working = $event
            "
          >
            Currently working here
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.workExperience.currently_working"
            v-model="state.form.workExperience.end_date"
            month-picker
            required
            placeholder="Select end date"
            :min-date="
              new Date(
                state.form.workExperience.start_date.year,
                state.form.workExperience.start_date.month,
              )
            "
          />
          <FormAppButton class="mt-4"> Add </FormAppButton>
        </form>
      </div>
      <!-- Update Work Experience Form -->
      <div v-if="showUpdateWorkExperienceForm">
        <form
          class="border px-16 py-8"
          @submit.prevent="updateMemberWorkExperience"
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
            is-required
          >
            <b>Company Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.workExperience.position"
            :value="state.form.workExperience.position"
            is-required
          >
            <b>Position</b>
          </FormAppControlInput>
          <label><b>Start Date</b></label>
          <VueDatePicker
            v-model="state.form.workExperience.start_date"
            month-picker
            placeholder="Select start date"
            :max-date="new Date()"
            required
          />
          <label class="block mt-4">
            <b>End Date</b>
          </label>
          <FormAppControlInput
            input-type="checkbox"
            :is-checked="state.form.workExperience.end_date ? false : true"
            label-id="currently-working-edit"
            class="mt-2"
            @checkbox-changed="
              state.form.workExperience.currently_working = $event
            "
          >
            Currently working here
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.workExperience.currently_working"
            v-model="state.form.workExperience.end_date"
            month-picker
            required
            placeholder="Select end date"
            :min-date="
              new Date(
                state.form.workExperience.start_date.year,
                state.form.workExperience.start_date.month,
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
          class="cursor-pointer bg-contain w-5 h-5 bg-no-repeat"
          :class="showAddEducationForm ? 'bg-xIcon' : 'bg-addIcon'"
          @click="
            () => {
              showAddEducationForm = !showAddEducationForm
              showUpdateEducationForm = false
              state.form.education = { ...defaultEducation }
            }
          "
        ></div>
      </div>
      <ul v-if="props.education.length">
        <li
          v-for="(education, index) in educationSorted.list"
          :key="index"
          class="divider-dotted pb-2.5"
        >
          <div class="w-full flex flex-col md:flex-row">
            <div class="min-w-max">
              <h4 class="title">{{ education.institution_name }}</h4>
              <h5 class="sub-title">{{ education.degree }}</h5>
            </div>
            <div class="w-full flex flex-row justify-between">
              <p class="date-container">
                {{
                  education.graduated
                    ? formatDate(education.graduated)
                    : 'Current'
                }}
              </p>
              <div
                v-if="memberAuth"
                class="flex flex-row justify-around gap-x-2 m-2"
              >
                <!-- Delete Education Form Button -->
                <form
                  class="inline-flex w-4 h-4"
                  @submit.prevent="deleteMemberEducation"
                >
                  <input
                    type="hidden"
                    name="educationId"
                    :value="education.id"
                  />
                  <FormAppButton btn-style="delete-btn"></FormAppButton>
                </form>
                <!-- Update Education trigger  -->
                <div
                  class="edit-btn bg-editIcon"
                  @click="
                    () => {
                      showUpdateEducationForm = true
                      showAddEducationForm = false
                      state.form.education = { ...education }
                    }
                  "
                ></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- Add Education Form -->
      <div v-if="showAddEducationForm">
        <form class="border px-16 py-8" @submit.prevent="addMemberEducation">
          <FormAppControlInput
            v-model:value="state.form.education.institution_name"
            is-required
          >
            <b>Institution Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.education.degree"
            is-required
          >
            <b>Degree</b>
          </FormAppControlInput>
          <label class="block"><b>Graduation Date</b></label>
          <FormAppControlInput
            input-type="checkbox"
            label-id="currently-studying-add"
            @checkbox-changed="state.form.education.still_studying = $event"
          >
            I'm still studying
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.education.still_studying"
            v-model="state.form.education.graduated"
            month-picker
            placeholder="Select graduation date"
            required
          />

          <FormAppButton class="mt-4"> Add </FormAppButton>
        </form>
      </div>
      <!-- Update Education Form -->
      <div v-if="showUpdateEducationForm">
        <form class="border px-16 py-8" @submit.prevent="updateMemberEducation">
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
            is-required
          >
            <b>Institution Name</b>
          </FormAppControlInput>
          <FormAppControlInput
            v-model:value="state.form.education.degree"
            :value="state.form.education.degree"
            is-required
          >
            <b>Degree</b>
          </FormAppControlInput>
          <label class="block"><b>Graduation Date</b></label>
          <FormAppControlInput
            input-type="checkbox"
            :is-checked="state.form.education.graduated ? false : true"
            label-id="currently-studying-edit"
            @checkbox-changed="state.form.education.still_studying = $event"
          >
            I'm still studying
          </FormAppControlInput>
          <VueDatePicker
            v-if="!state.form.education.still_studying"
            v-model="state.form.education.graduated"
            month-picker
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
  () => false,
)
const showUpdateWorkExperienceForm = useState(
  'showUpdateWorkExperienceForm',
  () => false,
)
const showAddEducationForm = useState('showAddEducationForm', () => false)
const showUpdateEducationForm = useState('showUpdateEducationForm', () => false)

const props = defineProps({
  education: {
    type: Object,
    default: () => {},
  },
  experience: {
    type: Object,
    default: () => {},
  },
  memberAuth: {
    type: Boolean,
    default: false,
  },
  settings: {
    type: Object,
    default: () => {},
  },
})

const defaultWorkExperience = {
  company_name: '',
  position: '',
  start_date: '',
  currently_working: false,
  end_date: null,
  id: '',
}

const defaultEducation = {
  institution_name: '',
  degree: '',
  still_studying: false,
  graduated: '',
  id: '',
}

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
  loading: false,
  success: false,
  error: false,
})

/**
 * Member Work Experience
 *
 *
 */
const addMemberWorkExperience = async () => {
  state.loading = true
  const bodyData = {
    company_name: state.form.workExperience.company_name,
    position: state.form.workExperience.position,
    start_date: new Date(
      state.form.workExperience.start_date.year,
      state.form.workExperience.start_date.month,
    ),
    end_date: state.form.workExperience.currently_working
      ? null
      : new Date(
          state.form.workExperience.end_date.year,
          state.form.workExperience.end_date.month,
        ),
  }
  await useFetch(`/api/member/create/experience`, {
    method: 'POST',
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
  showAddWorkExperienceForm.value = !showAddWorkExperienceForm
}

const deleteMemberWorkExperience = async (event) => {
  const { value } = event.target.experienceId
  state.loading = true
  const deleteItem = confirm('Are you sure you want to delete this?')

  deleteItem &&
    (await $fetch(`/api/member/delete/experience/${value}`, {
      method: 'DELETE',
      onResponse({ response }) {
        state.error = false
        state.success = true
        state.loading = false
        emit('updateMember')
      },
      onResponseError({ response }) {
        state.error = true
        state.success = false
        state.loading = false
        console.log('something went wrong', response._data.message)
      },
    }))
}

const updateMemberWorkExperience = async () => {
  state.loading = true
  const bodyData = {
    company_name: state.form.workExperience.company_name,
    position: state.form.workExperience.position,
    start_date: new Date(
      state.form.workExperience.start_date.year,
      state.form.workExperience.start_date.month,
    ),
    end_date: state.form.workExperience.currently_working
      ? null
      : new Date(
          state.form.workExperience.end_date.year,
          state.form.workExperience.end_date.month,
        ),
  }
  try {
    await $fetch(
      `/api/member/update/experience/${state.form.workExperience.id}`,
      {
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
      },
    )
  } catch (error) {
    console.log('ERROR')
    console.log(error)
    state.error = true
    state.success = false
    state.loading = false
  }
  showUpdateWorkExperienceForm.value = !showUpdateWorkExperienceForm
}

/**
 * Member Education
 *
 *
 */
const addMemberEducation = async () => {
  state.loading = true
  const bodyData = {
    institution_name: state.form.education.institution_name,
    degree: state.form.education.degree,
    graduated: state.form.education.still_studying
      ? null
      : new Date(
          state.form.education.graduated.year,
          state.form.education.graduated.month,
        ),
  }
  await $fetch(`/api/member/create/education`, {
    method: 'POST',
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
  showAddEducationForm.value = !showAddEducationForm
}

const deleteMemberEducation = async (event) => {
  const { value } = event.target.educationId
  state.loading = true
  const deleteItem = confirm('Are you sure you want to delete this?')

  deleteItem &&
    (await $fetch(`/api/member/delete/education/${value}`, {
      method: 'DELETE',
      onResponse({ response }) {
        state.error = false
        state.success = true
        state.loading = false
        emit('updateMember')
      },
      onResponseError({ response }) {
        state.error = true
        state.success = false
        state.loading = false
        console.log('something went wrong', response._data.message)
      },
    }))
}

const updateMemberEducation = async () => {
  state.loading = true
  const bodyData = {
    institution_name: state.form.education.institution_name,
    degree: state.form.education.degree,
    graduated: state.form.education.still_studying
      ? null
      : new Date(
          state.form.education.graduated.year,
          state.form.education.graduated.month,
        ),
  }
  await $fetch(`/api/member/update/education/${state.form.education.id}`, {
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
      sortRules.experience(a, b),
    )
  if (props.education)
    educationSorted.list = props.education.sort((a, b) =>
      sortRules.education(a, b),
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
