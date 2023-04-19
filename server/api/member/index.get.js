export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()
  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);
  console.log(`---------------`);
  console.log(`Session cookie: `, sessionCookie);
  console.log(`---------------`);
  const url = `${config.public.communityApiUrl}/member/${query.id}`
  console.log(`---------------`);
  console.log(`Full Url`, url);
  console.log(`---------------`);
  const options = {
    method: "GET",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }

  await $fetch.raw(url, options).then(response => { console.log(response._data); }).catch(error => {
    console.log(error);
  });
  const response = await $fetch.raw(url, options)
  return response._data
});
