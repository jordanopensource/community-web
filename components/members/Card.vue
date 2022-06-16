<template>
  <div class="card-container">
    <div class="border-b-2 border-josa-warm-grey-light">
      <div class="flex p-4">
        <div class="mr-8">
          <img
            width="100"
            height="100"
            alt="bot-lightbulb"
            :src="member.avatar ? member.avatar : avatarPlaceholder"
            class="rounded w-full"
            loading="lazy"
          />
        </div>
        <div>
          <h3 class="text-xl lg:text-3xl font-semibold mb-2">
            {{ member.first_name }} {{ member.last_name }}
          </h3>
          <p>
            {{
              member.headline
                ? member.headline
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra eu sapien et tincidunt. Nunc dui risus, tempus vel eros ut, tempor sollicitudin elit. Pellentesque pharetra purus at nunc aliquet auctor'
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="member-card">
      <div class="badge-details">
        <div class="badge-color"></div>
        <p>JOSA Member</p>
      </div>
      <div class="border-r-2 border-l-2 border-josa-warm-grey-light px-4">
        <p><span>Member ID:</span> {{ props.member.member_id }}</p>
      </div>
      <div>
        <p>
          <span>Member Since</span>
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
</script>
<style lang="postcss" scoped>
.card-container {
  @apply bg-white my-10;
}

.member-card {
  @apply text-sm;
  @apply flex flex-row gap-x-4;
  @apply w-full;
  @apply font-semibold;
  @apply p-4;
  .badge-details {
    @apply flex flex-row;
  }
  .badge-color {
    @apply w-5 h-5;
    @apply mr-2;
    @apply rounded-sm;
    @apply bg-josa-blue;
  }

  span {
    @apply font-light;
  }
}
</style>
