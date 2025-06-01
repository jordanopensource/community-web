export default defineEventHandler(async (event) => {
  const { endpoint, id } = event.context.params
  const apiUrl = `/${endpoint}/${id}`
  const body = await readBody(event)
  const sessionCookie = getValidatedSessionCookie(event)

  const uploadOptions = {
    method: 'PATCH',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }

  return await $api(apiUrl, uploadOptions)
})
