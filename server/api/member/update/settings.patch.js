export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await useBody(event)
  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);

  const apiUrl = `${config.public.COMMUNITY_API_URL}/settings`;
  const settingsOptions = {
    method: "PATCH",
    body: body.settings,
    headers: {
      "Accept": "*/*",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }
  const memberOptions = {
    method: 'PATCH',
    body: body.member,
    headers: {
      "Accept": "*/*",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }

  // TODO: handle error on member response
  const memberResponse = await $fetch.raw('/api/member/update/info', memberOptions);
  const settingsResponse = await $fetch.raw(apiUrl, settingsOptions);

  return settingsResponse._data;
})
