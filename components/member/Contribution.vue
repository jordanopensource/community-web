<template>
  <div id="member-contributions" class="container details-container">
    <h2>Contributions</h2>
    <div class="slash-separator"></div>

    <div class="contribution">
      <h5 class="heading">JOSA Contributions</h5>
      <ul>
        <li>
          <div>
            <p class="title">Contribution Description</p>
            <p class="sub-title">Role</p>
          </div>
          <div class="date-container">
            <p>February 2020</p>
          </div>
        </li>
        <li>
          <div>
            <p class="title">JOSA Tech Talks - Image processing</p>
            <p class="sub-title">Speaker</p>
          </div>
          <div class="date-container">
            <p>April 2018</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.details-container {
  @apply bg-white;
  @apply mb-14;
  @apply p-10 px-8;
  @apply text-sm md:text-lg;
}

.slash-separator {
  @apply relative;
  @apply mt-8;
}
.slash-separator:before {
  @apply h-3;
  --border-width: 6px;
  --stripe-distance: 10px;
  position: absolute;
  content: '';
  left: calc(var(--border-width) * -1);
  right: calc(var(--border-width) * -1);
  top: calc(var(--border-width) * -1);
  bottom: calc(var(--border-width) * -1);
  background: repeating-linear-gradient(
    -45deg,
    #4b5563,
    transparent 1px,
    transparent var(--stripe-distance),
    #4b5563 calc(var(--stripe-distance) + 1px)
  );
  z-index: 1;
}

.contribution {
  @apply mt-16;
}

.heading {
  @apply text-gray-500;
  @apply mb-2;
  @apply font-light;
}

ul {
  @apply list-none;
  @apply flex flex-col;
}

li {
  @apply w-full;
  @apply ml-0 mt-2 py-3;
  @apply border-dotted border-t-2 border-gray-500;
  @apply flex flex-row justify-between;

  .title {
    @apply font-semibold text-sm md:text-2xl;
  }

  .sub-title {
    @apply text-sm md:text-lg;
  }

  .date-container {
    @apply text-gray-500;
  }
}
</style>
