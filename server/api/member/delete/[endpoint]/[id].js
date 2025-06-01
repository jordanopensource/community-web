export default defineEventHandler(async (event) => {
  const sessionCookie = getValidatedSessionCookie(event)
  const { endpoint, id } = event.context.params
  const apiUrl = `/${endpoint}/${id}`
  const uploadOptions = {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }

  return await $api(apiUrl, uploadOptions)
})
