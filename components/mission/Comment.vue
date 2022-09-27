<template>
  <div class="commentContainer">
    <div class="commentorAvatarSection">
      <div class="commentorInfo">
        <div class="commentor">
          <h5>
            George Khoury <br class="hidden" /><span class="commentDate"
              >Commented 2 days ago</span
            >
          </h5>
        </div>
        <div class="commentText">
          <p>
            JOSA pushes for more transparency in government through the release
            of open government data, improving access to government information,
            and releasing data and content under an open government license.
          </p>
        </div>
      </div>
      <div class="commentorAvatar"></div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.commentContainer {
  padding: 0.01em 16px;
  margin-bottom: 4rem;
  position: relative;
  margin-top: 50px;

  @media only screen and (max-width: 550px) {
    margin-bottom: 12rem;
  }
}
.commentorAvatarSection {
  width: 188px;
  height: 188px;
  background: white;
  border-radius: 50%;
}
.commentorAvatar {
  width: 60px;
  height: 60px;
  border-radius: 15%;
  background: url('https://avatars.githubusercontent.com/u/329810?v=4') center
    center;
  background-size: cover;
  position: absolute;
  top: 25%;
  left: 26px;
}
.commentorInfo {
  position: absolute;
  top: 0px;
  left: 110px;
  width: 70%;
  height: auto;
  background: white;
  border: 1px solid rgba(228, 227, 227, 0.931);
}
commentText {
  margin: 10px;
  margin-left: 20px;
  height: 85%;
  padding: 4px;
  padding-top: 0px;
  text-align: left;
  font-size: 1.11em;
  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
}

.commentor {
  background-color: #c8c8c8;
  padding: 0.6rem;
  padding-left: 2rem;
  font-weight: bold;
}

.commentDate {
  color: grey;
  font-size: 0.9rem;
  font-weight: lighter;
}

.hidden {
  @media screen and (min-width: 744px) {
    display: none;
  }
}
</style>
