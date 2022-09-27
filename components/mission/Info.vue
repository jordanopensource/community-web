<template>
  <div class="card-container">
    <div>
      <h5 class="breadcrumb">{{ props.mission.category.title }}</h5>
    </div>
    <div class="p-4 flex gap-x-4">
      <h3 class="text-2xl lg:text-4xl font-semibold mb-2">
        {{ props.mission.title }}
      </h3>
      <span
        class="badge"
        :class="props.mission.assignedId ? 'assigned' : 'open'"
        >{{ props.mission.assignedId ? 'Assigned' : 'Open' }}</span
      >
    </div>
    <div class="mission-summary">
      <div class="flex flex-col gap-y-4">
        <p class="flex flex-row gap-x-2 items-end">
          <span class="prefix">
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M15.08 16L12 14.15L8.93 16L9.74 12.5L7.03 10.16L10.61 9.85L12 6.55L13.39 9.84L16.97 10.15L14.26 12.5L15.08 16Z"
              />
            </svg>
          </span>
          {{ props.mission.points }}
        </p>
        <p class="flex flex-row gap-x-2 items-end">
          <span class="prefix"
            ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M14 17L11 11.8V7H12.5V11.4L15.3 16.3L14 17Z"
              />
            </svg>
            Due Date:
          </span>
          {{ formatDate(props.mission.due_date) }}
        </p>
      </div>
      <p class="flex flex-row gap-x-2">
        <span class="prefix items-baseline"
          >Level:
          <span class="level-container">
            <span class="dot selected"></span>
            <span
              class="dot"
              :class="
                (props.mission.level === 'INTERMEDIATE' ||
                  props.mission.level === 'ADVANCED') &&
                'selected'
              "
            ></span>
            <span
              class="dot"
              :class="props.mission.level === 'ADVANCED' && 'selected'"
            ></span>
          </span>
        </span>
      </p>
    </div>
    <div class="spacer"></div>
    <div>
      <hr />
    </div>
    <div class="spacer"></div>
    <div class="wrapper">
      <div class="info">
        <p class="description">
          {{ props.mission.description }}
        </p>
        <!-- <img
          class="missionImage"
          src="https://josa-api.fra1.digitaloceanspaces.com/portal/bots_new_34369aabb5.svg"
        /> -->
      </div>
      <div id="two">
        <div class="personel">
          <h5>Owner</h5>
          <img
            class="memberAvatar"
            :src="
              props.mission.owner.avatar_url
                ? props.mission.owner.avatar_url
                : placeHolderImages.avatar
            "
          />
          <h3 class="memberName">
            {{ props.mission.owner.first_name_en }}
            {{ props.mission.owner.last_name_en }}
          </h3>
          <br /><br />
          <h5>Assigned to</h5>
          <!-- <div class="flex gap-x-4 items-center"> -->
          <div v-if="props.mission.assigned !== null">
            <img
              class="memberAvatar"
              :src="
                props.mission.assigned.avatar_url
                  ? props.mission.assigned.avatar_url
                  : placeHolderImages.avatar
              "
            />
            <h3 class="memberName">
              {{ props.mission.assigned.first_name_en }}
              {{ props.mission.assigned.last_name_en }}
            </h3>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    <div>
      <hr />
    </div>
    <div class="spacer"></div>
  </div>
</template>
<script setup>
const placeHolderImages = {
  cover: '/images/placeholders/729x164.png',
  avatar: '/images/placeholders/avatar.png',
}
const props = defineProps({
  mission: {
    type: Object,
    default: {},
  },
})

const formatDate = (date) => {
  const newDate = new Date(date)
  const [day, month, year] = [
    newDate.getDate(),
    newDate.getMonth(),
    newDate.getFullYear(),
  ]
  return `${day}/${month}/${year}`
}
</script>
<style lang="postcss" scoped>
.card-container {
  @apply bg-white my-10;
  padding: 1.5rem;
  height: auto;
}

.item-min-width {
  min-width: 150px;
}
.mission-summary {
  @apply text-base;
  @apply flex flex-row;
  @apply justify-between items-end;
  @apply w-full;
  @apply p-4 pt-0;

  p {
    @apply font-medium;
  }

  span {
    @apply font-normal;
  }
}

.badge {
  @apply text-white text-sm;
  @apply py-1 px-2;
  @apply rounded-md;
  @apply h-fit w-fit;
}
.open {
  background-color: #6db981;
}
.assigned {
  background-color: #ee4d7a;
}

.prefix {
  color: #808080;
  @apply flex flex-row gap-x-2;
}

.level-container {
  @apply flex flex-row gap-x-1 items-end;
}
.dot {
  @apply w-3 h-3;
  @apply bg-gray-200;
  @apply rounded-full;
}
.selected {
  background-color: #00b199;
}

.breadcrumb {
  color: rgb(83, 135, 226);
  margin-left: 1rem;
}

hr {
  border: 1px dashed grey;
  width: 70%;
  margin: auto;
}

.wrapper {
  overflow: hidden;
  min-height: 200px;
  padding: 10px;
}
.info {
  background-color: white;
  float: left;
  margin-right: 20px;
  width: 70%;
}

#two {
  background-color: white;
  overflow: hidden;
  margin: 10px;
  min-height: 170px;
}

@media screen and (max-width: 720px) {
  #info {
    float: none;
    margin-right: 0;
    width: auto;
    border: 0;
  }
}

.description {
  margin-bottom: 2rem;
}

.missionImage {
  margin-bottom: 2rem;
}

.spacer {
  height: 1.5rem;
}

.memberAvatar {
  max-width: 50px;
  border-radius: 15%;
  margin-top: 0.5rem;
}

.memberName {
  font-weight: bold;
  display: inline-block;
}
</style>
