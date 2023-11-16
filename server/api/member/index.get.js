export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()
  const sessionCookie = getCookie(event, `${config.public.sessionCookieName}`);

  const url = `${config.public.communityApiUrl}/member/${query.id}`
  const options = {
    method: "GET",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Cookie": `${config.public.sessionCookieName}=` + sessionCookie,
    }
  }

  const response = await $fetch.raw(url, options);
  return response._data
});
