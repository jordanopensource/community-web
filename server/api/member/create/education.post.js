export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  console.log(body)
  const sessionCookie = getCookie(event, `${config.public.sessionCookieName}`)
  const apiUrl = `${config.public.communityApiUrl}/education`
  const uploadOptions = {
    method: 'POST',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }

  const response = await $fetch.raw(apiUrl, uploadOptions)

  return response?._data
})
