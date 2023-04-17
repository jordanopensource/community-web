export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const body = await readBody(event)
  console.log(body);
  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);
  const apiUrl = `${config.public.communityApiUrl}/education`;
  const uploadOptions = {
    method: "POST",
    body: body,
    headers: {
      "Accept": "*/*",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }

  const response = await $fetch.raw(apiUrl, uploadOptions);

  return response;
})
