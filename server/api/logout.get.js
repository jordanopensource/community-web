export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const sessionCookie = getCookie(event, 'connect.sid')
  const url = `${config.public.COMMUNITY_API_URL}/auth/logout`
  const options = {
    method: "GET",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Cookie": "connect.sid=" + sessionCookie
    }
  }

  // delete the session cookie
  setCookie(event, 'connect.sid', null)

  const response = await $fetch.raw(url, options);
  return response
});