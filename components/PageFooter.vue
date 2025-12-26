<template>
  <footer class="bg-community-black lg:h-64 w-full">
    <div class="container bg-community-black text-white lg:flex h-full items-center lg:justify-between">
      <div class="flex items-center pt-12 lg:pt-0">
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
      <div class="lg:flex pb-12 lg:pb-0 pt-5 lg:pt-0">
        <div class="flex items-center justify-end lg:px-5">
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
        <div class="text-right pt-5 lg:pt-0">
          <img
            class="h-4 inline"
            src=" /icons/icon-small-cc.svg"
            alt="CC"
            width="16"
            height="16"
            loading="lazy"
          />
          <span class="text-xs lg:text-sm font-light ml-2"
            >{{ new Date().getFullYear() }}, JOSA - Jordan Open Source Association</span
          >
        </div>
      </div>
    </div>
  </footer>
</template>
