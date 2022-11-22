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
      <div class="invisible-white-space"></div>
      <div
        id="avatar-info-container"
        class="flex flex-row relative gap-x-7"
      >
        <img
          class="avatar"
          alt="avatar"
          :src="
            props.member.avatar_url
              ? props.member.avatar_url
              : placeHolderImages.avatar
          "
        />
      </div>
      <div class="general-info">
          <div class="flex flex-col items-start gap-y-5">
            <h1 class="member-name">
              {{ props.member.first_name_en }} {{ props.member.last_name_en }}
            </h1>
            <h2 class="member-headline">
              {{
                props.member.headline
                  ? props.member.headline
                  : 'This is the headline but it can get longer than you can imagine.'
              }}
            </h2>
            <p class="member-location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
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
        </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
})
const placeHolderImages = {
  cover: '/images/placeholders/729x164.png',
  avatar: '/images/placeholders/avatar.png',
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
      width:  200px;
      height: 200px;
    }
}
@media (max-width: 640px) {
    .avatar {
      margin-top: -3.2rem;
      width:  72px;
      height: 72px;
    }
}

.cover {
  @apply w-full;
  @apply rounded-b-none;
  height: 25%;
}

.general-info {
  @apply self-center flex mt-5;
  @apply mx-5 md:mx-10;
  .member-name {
    @apply font-medium text-josa-black-text;
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
</style>
