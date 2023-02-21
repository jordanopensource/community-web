<template>
  <div id="banner" class="details-container">
    <div class="relative">
      <img
        class="cover"
        alt="cover"
        :src="
          props.member.cover_url
            ? props.member.cover_url
            : placeHolderImages.cover
        "
      />
      <!-- <div v-if="memberAuth">
        <FormAppControlInput
          v-model:value="state.file"
          inputType="file"
          :editIcon="true"
          @change="uploadCover"
        />
      </div> -->
      <div class="invisible-white-space"></div>
      <div id="avatar-info-container" class="flex flex-row relative gap-x-7">
        <img
          class="avatar"
          alt="avatar"
          :src="
            props.member.avatar_url
              ? props.member.avatar_url
              : placeHolderImages.avatar
          "
        />
        <!-- <div v-if="memberAuth" class="relative z-10">
          <FormAppControlInput
            v-model:value="state.file"
            inputType="file"
            :editIcon="true"
          />
        </div> -->
      </div>
      <div class="general-info">
        <div class="flex flex-col items-start gap-y-5">
          <h1 class="member-name">
            {{ props.member.first_name_en }} {{ props.member.last_name_en }}
          </h1>
          <div v-if="!showUpdateInfoForm">
            <h2 class="member-headline">
              {{
                props.member.headline
                  ? props.member.headline
                  : 'This is the headline but it can get longer than you can imagine.'
              }}
            </h2>
            <p class="member-location">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                  fill="rgba(75,85,99,1)"
                />
              </svg>
              {{
                props.member.location ? props.member.location : 'Amman, Jordan'
              }}
            </p>
          </div>
          <div v-else>
            <form @submit.prevent="updateGeneralInfo">
              <FormAppControlInput
                v-model:value="state.form.memberHeadline"
                inputType="textarea"
                :value="props.member.headline"
              >
                <b>Headline</b>
              </FormAppControlInput>
              <FormAppControlInput
                v-model:value="state.form.memberCity"
                :value="props.member.location.split(',')[0]"
              >
                <b>City</b>
              </FormAppControlInput>
              <FormAppControlInput
                v-model:value="state.form.memberCountry"
                :value="props.member.location.split(',')[1]"
              >
                <b>Country</b>
              </FormAppControlInput>
              <FormAppControlInput
                v-model:value="state.form.memberPhone"
                :value="Number(props.value.phone)"
                inputType="tel"
                placeholder="962799888777"
                pattern="+[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}"
                ><b>Phone Number</b></FormAppControlInput
              >
              <FormAppButton> Save </FormAppButton>
            </form>
          </div>
        </div>
        <div
          v-if="memberAuth"
          @click="() => (showUpdateInfoForm = !showUpdateInfoForm)"
        >
          <img
            v-if="!showUpdateInfoForm"
            src="/icons/edit.svg"
            alt=""
            class="cursor-pointer"
          />
          <img v-else src="/icons/x.svg" alt="" class="cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['updateMember'])
const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
  memberAuth: {
    type: Boolean,
    default: false,
  },
})

const showUpdateInfoForm = useState('showUpdateInfoForm', () => false)

const state = reactive({
  file: '',
  form: {
    memberHeadline: props.member.headline,
    memberPhone: props.member.phone,
    memberCity: props.member.location?.split(',')[0],
    memberCountry: props.member.location?.split(',')[1],
  },
})

// placeholder images for when there are no images
const placeHolderImages = {
  cover: '/images/placeholders/729x164.png',
  avatar: '/images/placeholders/avatar.png',
  editIcon: '/icons/edit.svg',
}

// handle uploading of the cover photo request
const uploadCover = async (event) => {
  const { files } = event.target
  console.log(files[0])
  let image = new FormData()
  // image.append('file', files[0], files[0].name)
  image.append('file-name', files[0].name)
  image.append('file-type', files[0].type)
  await useFetch(`/api/member/upload`, {
    method: 'PATCH',
    body: image,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onResponse({ response }) {
      if (response._data.success) {
        console.log('uploaded!')
      }
      emit('updateMember')
    },
    onResponseError({ response }) {
      // TODO: handle errors on client side
      console.log('something went wrong', response._data.message)
    },
  })
}

// handle updating the users general info
const updateGeneralInfo = async (event) => {
  const bodyData = {
    headline: state.form.memberHeadline,
    location: `${state.form.memberCity}, ${state.form.memberCountry}`,
    phone: state.form.memberPhone,
  }

  await $fetch(`/api/member/update/info`, {
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
  showUpdateInfoForm.value = !showUpdateInfoForm
}
</script>

<style lang="postcss" scoped>
#banner {
  @apply p-0 pb-5 md:pb-10;
}

.details-container {
  @apply text-sm md:text-base;
}

img {
  @apply rounded-lg;
}

.placeholder {
  @apply w-64 mr-8;
}

.avatar {
  @apply w-36 h-36;
  @apply ml-5 md:ml-10;
  margin-top: -6.5rem;
}

@media (min-width: 1024px) {
  .avatar {
    @apply -mt-40;
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 640px) {
  .avatar {
    margin-top: -3.2rem;
    width: 72px;
    height: 72px;
  }
}

.cover {
  @apply w-full;
  @apply rounded-b-none;
  height: 25%;
}

.general-info {
  @apply self-center justify-between flex mt-5;
  @apply mx-5 md:mx-10;

  .member-name {
    @apply font-medium text-community-black-text;
    @apply text-2xl md:text-4xl;
    font-family: 'IBM Sans';
  }

  .member-headline {
    @apply text-left text-lg leading-6 md:text-2xl;
    font-family: 'IBM Sans';
  }

  .member-location {
    @apply flex flex-row;
    @apply text-gray-600;
    align-items: center;

    svg {
      @apply w-3.5 h-3.5;
    }

    @media (min-width: 768px) {
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}

.invisible-white-space {
  @apply mr-4 w-64;
  @apply xl:w-44;
  @apply 2xl:w-0 2xl:mr-0;
}

.edit-svg-white svg path {
  @apply stroke-white;
}
</style>
