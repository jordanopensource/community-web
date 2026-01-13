<template>
  <div class="input-control form-wrapper">
    <form
      method="post"
      action="https://monk.josa.ngo/subscription/form"
      class="w-full h-fit flex flex-col"
    >
      <label for="email"> Enter email for early access: </label>
      <div class="flex flex-row items-center">
        <input type="hidden" name="nonce" />
        <input
          class="input-container flex-shrink-0 early-access-email"
          type="email"
          name="email"
          required
          placeholder="E-mail"
        />
        <input
          class="button-flat submit-button grow w-auto"
          type="submit"
          value="&rarr;"
        />
      </div>
      <input
        id="bd0e9"
        type="hidden"
        name="l"
        value="bd0e9e61-f90b-436c-811a-e6bc71c1beff"
      />
      <FormAppTermsAndConditions />
    </form>
  </div>
</template>
<style lang="postcss" scoped>
.early-access-email {
  @apply w-4/5 !important;
}

.submit-button {
  background-color: #0c97ac;
  color: white;
}
</style>
