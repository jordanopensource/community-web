<template>
  <div id="banner" class="details-container">
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
    <div class="relative">
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
        <div v-if="memberAuth" class="file-upload-cover">
          <div v-if="state.images.cover.uploading" class="loader"></div>
          <FormAppControlInput
            v-else
            v-model:value="state.file"
            inputType="file"
            acceptedFiles="image/*"
            :editIcon="true"
            @change="uploadImage($event, 'cover')"
          />
        </div>
      </div>
      <div class="invisible-white-space"></div>
      <div id="avatar-info-container" class="relative">
        <img
          class="avatar"
          alt="avatar"
          :src="
            props.member.avatar_url
              ? props.member.avatar_url
              : placeHolderImages.avatar
          "
        />
        <div v-if="memberAuth" class="file-upload-avatar">
          <div v-if="state.images.avatar.uploading" class="loader"></div>
          <FormAppControlInput
            v-else
            v-model:value="state.file"
            inputType="file"
            acceptedFiles="image/*"
            :editIcon="true"
            @change="uploadImage($event, 'avatar')"
          />
        </div>
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
          class="edit-btn"
          :class="showUpdateInfoForm ? 'bg-xIcon' : 'bg-editIcon'"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['updateMember'])
const config = useRuntimeConfig()
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
  images: {
    cover: {
      url: props.member.cover_url,
      uploading: false,
    },
    avatar: {
      url: props.member.avatar_url,
      uploading: false,
    },
  },
  loading: false,
  success: false,
  error: false,
})

// placeholder images for when there are no images
const placeHolderImages = {
  cover: '/images/placeholders/729x164.png',
  avatar: '/images/placeholders/avatar.png',
  editIcon: '/icons/edit.svg',
}

// handle uploading of the cover/avatar photo request
const uploadImage = async (event, imageType) => {
  state.error = false
  state.loading = true
  state.images[imageType].uploading = true
  const { files } = await event.target
  const image = new FormData()
  image.append('file', files[0], files[0].name)
  await fetch(
    `${config.public.communityApiUrl}/upload/members/${imageType}/${
      userId().value
    }`,
    {
      method: 'POST',
      body: image,
    }
  )
    .then((response) => response.json())
    .then((parsedData) => {
      if (parsedData.success) {
        const { cover_url, avatar_url } = parsedData.data
        // update the state with the avatar and cover images values (if exist)
        // the 'last-updated' query is to prevent the browser from
        // using the cached image whenever a new one is available.
        // This is because the name of the images is based on the userId.
        state.images.cover.url = cover_url
          ? cover_url + '?last-updated=' + Date.now()
          : props.member.cover_url
        state.images.avatar.url = avatar_url
          ? avatar_url + '?last-updated=' + Date.now()
          : props.member.avatar_url
        useMember().value[`${imageType}_url`] = state.images[imageType].url
      }
    })
    .catch((error) => {
      state.loading = false
      state.error = true
      state.success = false
    })
    .finally(() => {
      updateGeneralInfo()
    })
}

// handle updating the users general info
const updateGeneralInfo = async (event) => {
  const bodyData = {
    headline: state.form.memberHeadline,
    location: `${state.form.memberCity}, ${state.form.memberCountry}`,
    phone: state.form.memberPhone,
    cover_url: state.images.cover.url,
    avatar_url: state.images.avatar.url,
  }

  await $fetch(`/api/member/update/info`, {
    method: 'PATCH',
    body: JSON.stringify(bodyData),
    onResponse({ response }) {
      if (response._data) {
        state.error = false
        state.success = true
        state.loading = false
      }
      emit('updateMember')
    },
    onResponseError({ response }) {
      state.error = false
      state.success = true
      state.loading = false
      console.log('something went wrong', response._data.message)
    },
  })
  showUpdateInfoForm.value = !showUpdateInfoForm
  state.file = null
  state.images.cover.uploading = false
  state.images.avatar.uploading = false
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
  @apply rounded-lg object-cover;
}

.placeholder {
  @apply w-64 mr-8;
}

.avatar {
  @apply w-36 h-36;
  @apply ml-5 md:ml-10;
  margin-top: -6.5rem;
}
.avatar:before {
  @apply w-36 h-36;
  @apply rounded-lg;
  content: ' ';
  display: block;
  background-image: url(/images/placeholders/avatar.png);
  background-size: contain;
  text-indent: -9999px;
}
.file-upload-cover {
  @apply absolute top-1 right-2;
}
.file-upload-avatar {
  @apply absolute top-0;
  left: 9rem;
}
@media (min-width: 1024px) {
  .file-upload-avatar {
    @apply absolute top-0;
    left: 13rem;
  }
  .avatar {
    @apply -mt-40;
    width: 200px;
    height: 200px;
  }
  .avatar:before {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 640px) {
  .file-upload-avatar {
    @apply absolute -top-1;
    left: 4.4rem;
  }
  .file-upload-cover {
    @apply absolute;
    top: 0;
    right: 0.3rem;
  }
  .avatar {
    margin-top: -3.2rem;
    width: 72px;
    height: 72px;
  }
  .avatar:before {
    width: 72px;
    height: 72px;
  }
}

.cover {
  @apply w-full;
  @apply rounded-b-none;
  height: 20vw;
  max-height: 364px;
}
.cover:before {
  @apply w-full;
  @apply rounded-b-none rounded-lg;
  height: 20vw;
  max-height: 364px;
  content: ' ';
  display: block;
  background-image: url(/images/placeholders/729x164.png);
  background-size: contain;
  text-indent: -9999px;
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
