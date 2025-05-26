export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const sessionCookie = getCookie(event, `${config.public.sessionCookieName}`)

  const apiUrl = `${config.public.communityApiUrl}/settings`
  const settingsOptions = {
    method: 'PATCH',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }
  const settingsResponse = await $fetch.raw(apiUrl, settingsOptions)

  return settingsResponse._data
})
