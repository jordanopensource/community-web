<template>
  <div id="footer">
    <div class="container flex flex-col md:flex-row">
      <div class="logo text-center md:text-left">
        <p class="w-full">
          <img
            class="w-6 inline-block"
            src="@/static/icons/code-solid.svg"
            alt="JOSA Logo"
          />
          with
          <img
            class="w-6 inline-block"
            src="@/static/icons/heart.svg"
            alt="JOSA Logo"
          />
          by JOSA
        </p>
      </div>
      <div class="block md:hidden py-8">
        <hr />
      </div>
      <div id="copyright-info" class="flex-col md:flex-row">
        <div
          class="flex flex-row justify-center md:justify-start py-2 md:px-2 md:py-0"
        >
          <a
            v-for="link in state.socialMediaLinks"
            :key="link.id"
            class="px-2"
            :href="link.path"
            target="_blank"
          >
            <img
              class="w-6 text-josa-warm-grey-light"
              :src="getIconUrl(link.icon)"
            />
          </a>
        </div>
        <div class="flex flex-row justify-center md:justify-start">
          <img
            class="cc-logo w-5 mx-2"
            src="@/static/logo/cc.svg"
            alt="cc-logo"
            loading="lazy"
          />
          <p class="text-sm licenseText text-justify">
            2022, JOSA - Jordan Open Source Assosiation
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  socialMediaLinks: [
    {
      icon: 'facebook-square',
      path: 'https://facebook.com/jordanopensource',
      id: '/jordanopensource',
    },
    {
      icon: 'twitter',
      path: 'https://twitter.com/jo_osa',
      id: '@jo_osa',
    },
    {
      icon: 'github',
      path: 'https://github.com/jordanopensource',
      id: '/josa-portal-web',
    },
  ],
})

const getIconUrl = (iconName) => {
  return (
    '/' +
    new URL(`../static/icons/${iconName}.svg`, import.meta.url).href.split(
      '3000/'
    )[1]
  )
}
</script>

<style lang="postcss" scoped>
#footer {
  @apply bg-josa-black-darker text-josa-warm-grey-light;
  line-height: 1.6;
}

.container {
  @apply px-6 py-24 !important;
}
@screen md {
  .container {
    @apply px-12 py-24 !important;
  }
}

.container {
  @apply py-10 !important;
}

section {
  @apply flex-grow;
}

section:first-child {
  @apply pl-0;
}

section:last-child {
  @apply pr-0;
}

h5 {
  @apply uppercase pb-2 text-josa-warm-grey-light;
}

hr {
  @apply border-dotted;
}

img {
  max-width: 240px;
}

/deep/ a {
  @apply block;
}

.licenseText {
  @apply text-josa-warm-grey-dark;
}

.licenseAnchor {
  @apply inline;
}

.logo,
#copyright-info {
  @apply w-full flex align-middle justify-center;
}

#copyright-info {
  @apply justify-end;
}

@screen md {
  .logo,
  #copyright {
    @apply w-1/2 justify-start;
  }
}

@screen md {
  section {
    @apply px-4;
  }
}

@screen lg {
  .logo {
    @apply w-2/3;
  }

  #copyright-info {
    @apply w-2/3;
  }
}
@screen lg {
  .logo {
    @apply w-2/3;
  }

  #copyright-info {
    @apply w-2/3;
  }
}
</style>
