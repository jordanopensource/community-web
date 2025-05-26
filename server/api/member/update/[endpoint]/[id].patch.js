export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { endpoint, id } = event.context.params
  const sessionCookie = getCookie(event, `${config.public.sessionCookieName}`)
  const apiUrl = `${config.public.communityApiUrl}/${endpoint}/${id}`
  const uploadOptions = {
    method: 'PATCH',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }

  const response = await $fetch.raw(apiUrl, uploadOptions)

  return response._data
})
