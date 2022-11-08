<template>
  <div class="card-container">
    <div class="border-b-2 border-josa-warm-grey-light">
      <div class="flex p-5 md:p-6">
        <div class="mr-4 md:w-36 w-fit h-fit item-min-width shrink-0">
          <img
            alt="bot-lightbulb"
            :src="
              props.member.avatar_url
                ? props.member.avatar_url
                : avatarPlaceholder
            "
            class="rounded-xl w-16 md:w-full"
            loading="lazy"
          />
        </div>
        <div>
          <h3
            class="text-base md:text-lg flex-nowrap lg:text-3xl font-semibold mb-1 md:mb-2"
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
        <div class="badge-color"></div>
        <p>JOSA Member</p>
      </div>
      <div
        v-if="props.member.josa_member_id && props.member.type !== 0"
        class="border-r-2 border-l-2 border-josa-warm-grey-light px-2 md:px-4"
      >
        <p>
          <span>Member ID:</span> #{{ props.member.type }}-{{
            props.member.josa_member_id
          }}
        </p>
      </div>
      <div>
        <p>
          <span class="member-since">Member Since</span>
          {{
            props.member.member_since
              ? formatDate(props.member.member_since)
              : 'January 2023'
          }}
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
}
.member-card {
  @apply text-xs md:text-sm;
  @apply flex flex-row gap-x-2 md:gap-x-4;
  @apply w-full;
  @apply font-semibold;
  @apply p-4 md:p-8 pt-5;
  .badge-details {
    @apply flex flex-row;
  }
  .badge-color {
    @apply w-3 h-3 md:w-5 md:h-5;
    @apply mr-1 md:mr-2;
    @apply rounded-sm;
    @apply bg-josa-blue;
    @apply shrink-0;
  }

  span {
    @apply font-light;
  }
}
</style>
