<template>
  <div id="member-avatar" class="details-container">
    <div class="relative">
      <img
        class="cover"
        alt="cover"
        :src="props.member.cover ? props.member.cover : placeHolderImages.cover"
      />
      <div class="invisible-white-space"></div>
      <div
        id="avatar-info-container"
        class="flex flex-row relative gap-x-4 -mt-8 lg:-mt-12"
      >
        <img
          class="avatar"
          alt="avatar"
          :src="
            props.member.avatar ? props.member.avatar : placeHolderImages.avatar
          "
        />
        <div class="general-info">
          <div class="flex flex-col items-start">
            <p class="member-name">
              {{ props.member.first_name }} {{ props.member.last_name }}
            </p>
            <p class="member-headline">
              {{
                props.member.headline
                  ? props.member.headline
                  : 'This is the headline but it can get longer than you can imagine.'
              }}
            </p>
            <p class="member-location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
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
.details-container {
  @apply bg-white;
  @apply my-14;
  @apply p-10 px-8 lg:px-20;
  @apply text-sm md:text-lg;
}

img {
  @apply rounded-3xl;
}

.placeholder {
  @apply w-64 mr-8;
}
.avatar {
  @apply w-24 h-24 md:w-52 md:h-52;
  @apply ml-4;
}

.cover {
  @apply w-full h-16 md:h-44;
}

.general-info {
  @apply self-center flex mt-9 lg:mt-8;
  .member-name {
    @apply text-sm md:text-3xl font-semibold;
  }
  .member-headline {
    @apply text-sm md:text-xl;
    @apply text-left;
    @apply my-2;
  }

  .member-location {
    @apply flex flex-row;
    @apply text-gray-600;
    @apply my-2;
  }
}
.invisible-white-space {
  @apply mr-4 w-64;
  @apply xl:w-44;
  @apply 2xl:w-0 2xl:mr-0;
}
</style>
