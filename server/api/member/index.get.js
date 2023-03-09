export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()
  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);

  const url = `${config.public.COMMUNITY_API_URL}/member/${query.id}`
  const options = {
    method: "GET",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }

  const response = await $fetch.raw(url, options);
  return response._data
});
