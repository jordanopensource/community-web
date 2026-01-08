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
          class="input-container flex-shrink-0 w-4/5"
          type="email"
          name="email"
          required
          placeholder="E-mail"
        />
        <input
          class="button-flat grow w-auto bg-[#0c97ac] text-white"
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

<script setup>
</script>

