<template>
  <footer class="footer-section">
    <div class="footer-container container">
      <div class="flex items-center justify-center lg:justify-start p-8 lg:p-0">
        <img
          class="h-5"
          src="@/static/icons/icon-small-coded.svg"
          alt="Made"
          width="45"
          height="20"
          loading="lazy"
        />
        <span class="px-2 text-lg">with</span>
        <img
          class="h-5"
          src="@/static/icons/icon-small-love.svg"
          alt="Love"
          width="23"
          height="20"
          loading="lazy"
        />
        <span class="px-2 text-lg">by</span>
        <img
          class="h-5"
          src="@/static/icons/icon-small-josa.svg"
          alt="JOSA"
          width="80"
          height="20"
          loading="lazy"
        />
      </div>
      <div class="lg:flex px-8 pb-8 lg:px-0 lg:pb-0">
        <div class="flex items-center justify-center lg:justify-end">
          <div class="flex lg:px-5">
            <a
              href="https://github.com/jordanopensource"
              target="_blank"
              aria-label="JOSA Github Account"
            >
              <img
                class="h-5 px-2"
                src="@/static/icons/icon-small-github.svg"
                alt="Github Account"
                width="auto"
                height="20"
                loading="lazy"
            /></a>
            <a
              href="https://twitter.com/jo_osa"
              target="_blank"
              aria-label="JOSA Twitter Account"
            >
              <img
                class="h-5 px-2"
                src="@/static/icons/icon-small-twitter.svg"
                alt="Twitter Account"
                width="auto"
                height="20"
                loading="lazy"
            /></a>
            <a
              href="https://www.facebook.com/jordanopensource/"
              target="_blank"
              aria-label="JOSA Facebook Page"
            >
              <img
                class="h-5 pl-2 lg:px-2"
                src="@/static/icons/icon-small-fb.svg"
                alt="Facebook Page"
                width="auto"
                height="20"
                loading="lazy"
              />
            </a>
          </div>
        </div>
        <div class="text-center lg:text-right pt-5 lg:pt-0">
          <p class="text-xs lg:text-sm font-light">
            <img
              class="h-4 inline"
              src="@/static/icons/icon-small-cc.svg"
              alt="CC"
              width="auto"
              height="16"
              loading="lazy"
            />
            2022, JOSA - Jordan Open Source Association
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.footer-section {
  background-color: #edeeef;
  @apply bg-josa-black;
  @apply lg:h-32 lg:w-full;
}
.footer-container {
  @apply bg-josa-black text-white;
  @apply lg:flex h-full items-center lg:justify-between;
  @apply px-16;
}
</style>
