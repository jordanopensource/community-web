export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await useBody(event)
  const options = {
    method: 'GET',
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
  }
  const url = `${config.public.COMMUNITY_API_URL}/auth/forgot-password/${body.email}`
  const response = await $fetch.raw(url, options);
  return response
});