export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await useBody(event)
  const url = `${config.public.COMMUNITY_API_URL}/auth/login`
  const options = {
    method: "POST",
    body: body,
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
  }
  const response = await $fetch.raw(url, options);
  appendHeader(event, 'Set-Cookie', response.headers.get('set-cookie')) // assuming we only set one cookie
  return response
});