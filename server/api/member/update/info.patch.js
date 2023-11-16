export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const body = await readBody(event)
  const sessionCookie = getCookie(event, `${config.public.sessionCookieName}`);
  const apiUrl = `${config.public.communityApiUrl}/member`;
  const uploadOptions = {
    method: "PATCH",
    body: body,
    headers: {
      "Accept": "*/*",
      "Cookie": `${config.public.sessionCookieName}=` + sessionCookie,
    }
  }

  const response = await $fetch.raw(apiUrl, uploadOptions);

  return response;
})
