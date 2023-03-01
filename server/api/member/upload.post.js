export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const body = await readBody(event)

  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);
  const apiUrl = `${config.public.COMMUNITY_API_URL}/upload/members/cover/`;
  const uploadOptions = {
    method: "POST",
    body: body,
    headers: {
      "Accept": "*/*",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }
  const response = await fetch(apiUrl, uploadOptions);
  return response;
})
