export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const sessionCookie = getCookie(event, `${config.public.sessionCookieName}`)
  const url = `${config.public.communityApiUrl}/auth/logout`
  const options = {
    method: "GET",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Cookie": `${config.public.sessionCookieName}=` + sessionCookie
    }
  }

  // delete the session cookie
  setCookie(event, `${config.public.sessionCookieName}`, null)

  const response = await $fetch.raw(url, options);
  return response
});
