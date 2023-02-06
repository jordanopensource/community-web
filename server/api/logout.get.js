export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`)
  const url = `${config.public.COMMUNITY_API_URL}/auth/logout`
  const options = {
    method: "GET",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie
    }
  }

  // delete the session cookie
  setCookie(event, `${config.public.SESSION_COOKIE_NAME}`, null)

  const response = await $fetch.raw(url, options);
  return response
});