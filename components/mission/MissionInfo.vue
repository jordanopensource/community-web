<template>
    <div class="spacer"></div>
    <div>
      <hr />
    </div>
    <div class="spacer"></div>
    <div class="wrapper">
      <div class="info">
        <p class="description"> JOSA pushes for more transparency in government through the release of open government data, improving access to government information, and releasing data and content under an open government license. We believe an open government improves accountability and is a driver to economic growth. </p>
        <img class="missionImage" src="https://josa-api.fra1.digitaloceanspaces.com/portal/bots_new_34369aabb5.svg" />
      </div>
      <div class="contributors">
        <div>
          <h5>Owner</h5>
          <img class="memberAvatar" src="https://avatars.githubusercontent.com/u/7326249?v=4" />
          <h3 class="name">Issa Mahasneh</h3>
          <br /><br/>
          <h5>Assigned to</h5>
          <img class="memberAvatar" src="https://avatars.githubusercontent.com/u/79845228?v=4" />
          <h3 class="name">Marina Alsahawneh</h3>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    <div>
      <hr />
    </div>
    <div class="spacer"></div>
</template>

<style>
  .spacer {
    @apply h-6;
  }

  .wrapper {
     min-height: 200px;
     @apply p-2 overflow-hidden;
  }

  .info {
    @apply bg-white float-left mr-5;
    width:70%;
  }

  .description, .missionImage {
    @apply mb-8;
  }

  .contributors {
    @apply bg-white overflow-hidden m-2;
    min-height:170px;
  }

  .memberAvatar {
    max-width: 50px;
    border-radius: 15%;
    @apply mt-2;
  }

  .name {
    @apply font-bold inline-block;
  }

</style>