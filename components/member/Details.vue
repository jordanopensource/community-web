<template>
  <div id="member-detail" class="container details-container">
    <div class="relative">
      <img
        class="cover"
        :src="props.member.cover ? props.member.cover : placeHolderImages.cover"
      />
      <div
        id="avatar-info-container"
        class="flex flex-col lg:flex-row mx-8 relative justify-center items-center"
      >
        <img
          class="avatar"
          :src="
            props.member.avatar ? props.member.avatar : placeHolderImages.avatar
          "
        />
        <div class="mr-4 w-64 2xl:w-auto 2xl:mr-0"></div>
        <div class="general-info">
          <div class="flex flex-col items-center lg:items-start">
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
    <div class="slash-separator"></div>
    <div class="member-card">
      <div class="badge-details">
        <div class="badge-color"></div>
        <p>JOSA Member</p>
      </div>
      <div>
        <h5>Member ID</h5>
        <p>{{ props.member.member_id }}</p>
      </div>
      <div>
        <h5>Member Since</h5>
        <p>
          {{
            props.member.member_since
              ? formatDate(props.member.member_since)
              : 'January 2023'
          }}
        </p>
      </div>
    </div>
    <h5 class="heading">About</h5>
    <p class="member-about">
      {{
        props.member.about
          ? props.member.about
          : 'Lorem Ipsum is what the good animal did, and when they were safely on the other side, and had walked on a little while, the woods grew more and more familiar to them.'
      }}
    </p>
    <div class="skills">
      <h5 class="heading">Skills</h5>
      <ul>
        <li v-for="(skill, index) in memberSkills" :key="`skill-${index}`">
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const placeHolderImages = {
  cover: '/images/placeholders/729x164.png',
  avatar: '/images/placeholders/avatar.png',
}

const memberSkills = ['Linux Operating System', 'File System']

const props = defineProps({
  member: {
    type: Object,
    default: {},
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
</script>
<style lang="postcss" scoped>
.details-container {
  @apply bg-white;
  @apply my-14;
  @apply p-10 px-8 lg:px-20;
  @apply text-lg;
}

img {
  @apply rounded-3xl;
}

.placeholder {
  @apply w-64 mr-8;
}
.avatar {
  width: 200px;
  height: 200px;
  @apply lg:self-start;
  @apply mb-10;
  @apply lg:absolute left-0 bottom-0;
}

.cover {
  @apply -mb-8 lg:mb-4;
}

.general-info {
  @apply self-center flex;
  .member-name {
    @apply text-3xl font-semibold;
  }
  .member-headline {
    @apply text-xl;
    @apply text-center lg:text-left;
    @apply my-2;
  }

  .member-location {
    @apply flex flex-row;
    @apply text-gray-600;
    @apply my-2;
  }
}

.slash-separator {
  @apply relative;
  @apply mt-8;
}
.slash-separator:before {
  @apply h-3;
  --border-width: 6px;
  --stripe-distance: 10px;
  position: absolute;
  content: '';
  left: calc(var(--border-width) * -1);
  right: calc(var(--border-width) * -1);
  top: calc(var(--border-width) * -1);
  bottom: calc(var(--border-width) * -1);
  background: repeating-linear-gradient(
    -45deg,
    #4b5563,
    transparent 1px,
    transparent var(--stripe-distance),
    #4b5563 calc(var(--stripe-distance) + 1px)
  );
  z-index: 1;
}

.member-card {
  @apply flex flex-col justify-between;
  @apply lg:flex-row;
  @apply w-full;
  @apply bg-slate-100;
  @apply rounded-xl;
  @apply p-4 mt-20 mb-4;
  @apply font-semibold;

  h5 {
    @apply font-light;
  }

  .badge-details {
    @apply flex flex-row;
    @apply items-center;
    .badge-color {
      @apply w-5 h-5;
      @apply mr-2;
      @apply rounded-sm;
      @apply bg-josa-blue;
    }
  }
}

.member-card > div {
  @apply my-3 lg:my-auto;
}

.heading {
  @apply text-gray-500;
  @apply mt-8 mb-2;
}

.skills {
  ul {
    @apply list-none;
    @apply flex flex-col lg:flex-row;
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
