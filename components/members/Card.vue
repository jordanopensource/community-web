<template>
  <div class="card-container">
    <div class="border-b-2 border-josa-warm-grey-light">
      <div class="flex p-6">
        <div class="mr-4 md:w-36 w-fit h-fit item-min-width shrink-0">
          <img
            alt="bot-lightbulb"
            :src="
              props.member.avatar_url
                ? props.member.avatar_url
                : avatarPlaceholder
            "
            class="rounded-md w-16 md:w-full"
            loading="lazy"
          />
        </div>
        <div>
          <h3
            class="title text-base md:text-lg flex-nowrap lg:text-2xl mb-1 md:mb-2"
          >
            <NuxtLink :to="`/members/${props.member.id}`" target="_blank">
              {{ props.member.first_name_en }} {{ props.member.last_name_en }}
            </NuxtLink>
          </h3>
          <p class="text-sm md:text-base">
            {{
              member.headline
                ? member.headline
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra eu sapien et tincidunt. Nunc dui risus, tempus vel eros ut, tempor sollicitudin elit.'
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="member-card">
      <div v-if="props.member.type !== 0" class="badge-details">
        <span class="badge-color"></span>
        <span>JOSA Member</span>
      </div>
      <div
        v-if="props.member.josa_member_id && props.member.type !== 0"
        class="border-r-2 border-l-2 border-josa-warm-grey-light px-2 md:px-4"
      >
        <p>
          <span class="member-info-heading">Member ID:</span>
          <span class="member-info-value">
            #{{ props.member.type }}-{{
            props.member.josa_member_id
          }}
          </span>
        </p>
      </div>
      <div>
        <p>
          <span class="member-info-heading member-since">Member Since</span>
          <span class="member-info-value">
            {{
            props.member.member_since
              ? formatDate(props.member.member_since)
              : 'January 2023'
          }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
const avatarPlaceholder = '/images/placeholders/avatar.png'
const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
})

const formatDate = (date) => {
  const newDate = new Date(date)
  const [month, year] = [
    newDate.toLocaleString('default', { month: 'long' }),
    newDate.getFullYear(),
  ]
  return `${month} ${year}`
}
</script>
<style lang="postcss" scoped>
.card-container {
  @apply bg-white my-10;
  @apply rounded-md;
}
.member-card {
  @apply text-xs md:text-sm;
  @apply flex flex-row gap-x-2 md:gap-x-4;
  @apply w-full;
  @apply font-medium;
  @apply p-6;
  @apply leading-4;
  .badge-details {
    @apply flex flex-row;
  }
  .badge-color {
    @apply w-3 h-3 md:w-4 md:h-4;
    @apply mr-1 md:mr-2;
    @apply rounded-sm;
    @apply bg-josa-blue;
    @apply shrink-0;
    @apply mt-0.5 md:mt-0;
  }

  .member-info-value {
    @apply font-medium;
    @apply inline-block;
  }

  .member-info-heading {
    @apply font-light;
    @apply mr-2;
    @apply text-gray-500;
  }
}
</style>
