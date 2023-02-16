export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await useBody(event)
  const options = {
    method: 'POST',
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json"
    },
    body: body
  }
  const url = `${config.public.COMMUNITY_API_URL}/auth/forgot-password/`
  const response = await $fetch.raw(url, options);
  return response._data
});