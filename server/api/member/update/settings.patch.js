export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await useBody(event)
  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);

  const apiUrl = `${config.public.COMMUNITY_API_URL}/settings`;
  const settingsOptions = {
    method: "PATCH",
    body: body,
    headers: {
      "Accept": "*/*",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }
  const settingsResponse = await $fetch.raw(apiUrl, settingsOptions);

  return settingsResponse._data;
})
