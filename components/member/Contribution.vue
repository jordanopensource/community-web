<template>
  <div id="member-contributions" class="details-container">
    <h2 class="text-xl lg:text-2xl">Contributions</h2>
    <div class="divider-slashes"></div>

    <div v-if="props.contributions.length" class="contribution">
      <h3 class="heading">JOSA Contributions</h3>
      <ul>
        <li
          v-for="(contribution, index) in contributionsSorted"
          :key="index"
          class="divider-dotted pb-2.5"
        >
          <div class="w-full flex flex-col md:flex-row">
            <div>
              <h4 class="title">{{ contribution.description }}</h4>
              <h5 class="sub-title">{{ contribution.role }}</h5>
            </div>
            <p class="date-container">
              {{ formatDate(contribution.finished_at) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- Open Source Contributions -->
    <div
      v-if="
        opensourceContributions.github_contributions ||
        opensourceContributions.wikimedia_contributions
      "
      class="contribution"
    >
      <h3 class="heading">Other Open Source Contributions</h3>
      <ul class="opensource-contributions">
        <!-- Wikimedia Contributions -->
        <li
          v-if="
            state.showWikimediaContributions &&
            opensourceContributions.wikimedia_contributions
          "
          v-for="item in state.wikimediaContributions
            .filter((item) => item.edits !== 0)
            .sort((a, b) => a.edits < b.edits)"
          class="divider-dotted pb-2.5"
        >
          <img
            src="/icons/Wikipedia_W.svg"
            class="rounded-full bg-black w-10 h-10 p-1"
          />
          <div class="w-full flex flex-col md:flex-row">
            <div>
              <h4 class="title">{{ item.name }}</h4>
              <h5 class="sub-title">{{ item.edits }} contributions</h5>
            </div>
          </div>
        </li>

        <!-- GitHub Contributions -->
        <li
          v-if="
            state.showGitHubContributions &&
            opensourceContributions.github_contributions
          "
          v-for="item in opensourceContributions.github_contributions.slice(
            0,
            state.githubMaximumShown
          )"
          class="divider-dotted pb-2.5"
        >
          <img src="/icons/github-mark.svg" class="w-10 h-10" />
          <div class="w-full flex flex-col md:flex-row">
            <div>
              <h4 class="title">
                <a :href="item.url" target="_blank">{{
                  item.url.replace('https://github.com/', '')
                }}</a>
              </h4>
              <h5 class="sub-title">{{ item.totalCommits }} contributions</h5>
            </div>
          </div>
        </li>
        <FormAppButton @click="showMore">
          Show {{ state.isShowMore ? 'more' : 'less' }}
        </FormAppButton>
      </ul>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  contributions: {
    type: Array,
    default: [],
  },
  opensourceContributions: {
    type: Object,
    default: {},
  },
  settings: {
    type: Object,
    default: {},
  },
})

const contributionsSorted = props.contributions.sort(
  (a, b) => new Date(b.end_date) > new Date(a.end_date)
)

const state = reactive({
  wikimediaContributions: [],
  githubMaximumShown: 3,
  isShowMore: true,
  showGitHubContributions:
    (useAuth().value && useRoute().params.id === userId().value) ||
    !props.settings.hideGithubContributions,
  showWikimediaContributions:
    (useAuth().value && useRoute().params.id === userId().value) ||
    !props.settings.hideWikimediaContributions,
})

const wikimediaEdits = props.opensourceContributions.wikimedia_contributions
if (Object.keys(wikimediaEdits).length) {
  state.wikimediaContributions = [
    {
      name: 'ar.wikipedia.org',
      edits: wikimediaEdits.editcount['ar.wikipedia.org'],
    },
    {
      name: 'en.wikipedia.org',
      edits: wikimediaEdits.editcount['en.wikipedia.org'],
    },
    {
      name: 'wikidata.org',
      edits: wikimediaEdits.editcount['wikidata.org'],
    },
    {
      name: 'commons.wikimedia.org',
      edits: wikimediaEdits.editcount['commons.wikimedia.org'],
    },
  ]
}
const showMore = () => {
  state.isShowMore = !state.isShowMore
  if (
    state.githubMaximumShown ===
    props.opensourceContributions.github_contributions.length
  ) {
    state.githubMaximumShown = 3
  } else
    state.githubMaximumShown =
      props.opensourceContributions.github_contributions.length
}
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
.divider-slashes {
  @apply mt-5 mb-10;
  @apply h-3;
}

.contribution {
  @apply mt-5;
}

.heading {
  @apply text-gray-500;
  @apply mb-5;
  font-family: 'IBM Sans';
}

ul {
  @apply list-none;
  @apply flex flex-col;
}

li {
  @apply w-full;
  @apply ml-0 mb-5;
  @apply flex flex-row justify-between gap-x-4;
  @apply text-xl;

  .title {
    @apply font-semibold text-base lg:text-xl;
    font-family: 'IBM Sans';
  }
  .sub-title {
    @apply font-normal text-base lg:text-xl;
    font-family: 'IBM Sans';
  }
  .date-container {
    @apply text-sm lg:text-lg text-gray-500;
    @apply text-right;
    @apply md:ml-auto;
  }
}
</style>
