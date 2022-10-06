<template>
  <div class="card-container">
    <div class="border-b-2 border-josa-warm-grey-light">
      <div class="flex p-4">
        <div class="mr-8 w-40 item-min-width">
          <img
            width="100"
            height="100"
            alt="bot-lightbulb"
            :src="
              props.member.avatar_url
                ? props.member.avatar_url
                : avatarPlaceholder
            "
            class="rounded-lg w-full"
            loading="lazy"
          />
        </div>
        <div>
          <h3 class="text-xl lg:text-3xl font-semibold mb-2">
            <NuxtLink :to="`/members/${props.member.id}`" target="_blank">
              {{ props.member.first_name_en }} {{ props.member.last_name_en }}
            </NuxtLink>
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
      <div v-if="props.member.type !== 0" class="badge-details">
        <div class="badge-color"></div>
        <p>JOSA Member</p>
      </div>
      <div
        v-if="props.member.josa_member_id && props.member.type !== 0"
        class="border-r-2 border-l-2 border-josa-warm-grey-light px-4"
      >
        <p>
          <span>Member ID:</span> #{{ props.member.type }}-{{
            props.member.josa_member_id
          }}
        </p>
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
const avatarPlaceholder = '/images/placeholders/avatar.png';
const props = defineProps({
  member: {
    type: Object,
    default: {},
  },
});
</script>
<style lang="postcss" scoped>
.card-container {
  @apply bg-white my-10;
}

.item-min-width {
  min-width: 150px;
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
