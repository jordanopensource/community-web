<template>
  <footer class="footer-section">
    <div class="footer-container">
      <div class="credit-container">
        <img
          class="h-5"
          src=" /icons/icon-small-coded.svg"
          alt="Made"
          width="45"
          height="20"
          loading="lazy"
        />
        <span class="px-2 text-lg">with</span>
        <img
          class="h-5"
          src=" /icons/icon-small-love.svg"
          alt="Love"
          width="23"
          height="20"
          loading="lazy"
        />
        <span class="px-2 text-lg">by</span>
        <img
          class="h-5"
          src=" /icons/icon-small-josa.svg"
          alt="JOSA"
          width="80"
          height="20"
          loading="lazy"
        />
      </div>
      <div class="info-container">
        <div class="social-media-container">
          <a
            href="https://github.com/jordanopensource"
            target="_blank"
            aria-label="JOSA Github Account"
          >
            <img
              class="h-5 px-2"
              src=" /icons/icon-small-github.svg"
              alt="Github Account"
              width="36"
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
              src=" /icons/icon-small-twitter.svg"
              alt="Twitter Account"
              width="40"
              height="20"
              loading="lazy"
          /></a>
          <a
            href="https://www.facebook.com/jordanopensource/"
            target="_blank"
            aria-label="JOSA Facebook Page"
          >
            <img
              class="h-5 px-2"
              src=" /icons/icon-small-fb.svg"
              alt="Facebook Page"
              width="36"
              height="20"
              loading="lazy"
            />
          </a>
        </div>
        <div class="copyright-container">
          <img
            class="h-4 inline"
            src=" /icons/icon-small-cc.svg"
            alt="CC"
            width="16"
            height="16"
            loading="lazy"
          />
          <span class="copyright-text"
            >2023, JOSA - Jordan Open Source Association</span
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.footer-section {
  @apply bg-josa-black;
  @apply lg:h-64 w-full;
}
.footer-container {
  @apply container;
  @apply bg-josa-black text-white;
  @apply lg:flex h-full items-center lg:justify-between;
}

.credit-container {
  @apply flex items-center;
  @apply pt-12 lg:pt-0;
}

.info-container {
  @apply lg:flex pb-12 lg:pb-0 pt-5 lg:pt-0;
}

.social-media-container {
  @apply flex items-center justify-end lg:px-5;
}

.copyright-container {
  @apply text-right pt-5 lg:pt-0;

  .copyright-text {
    @apply text-xs lg:text-sm font-light;
    @apply ml-2;
  }
}
</style>
