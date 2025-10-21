export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const sessionCookie = getValidatedSessionCookie(event)

  const settingsOptions = {
    method: 'PATCH',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }
  return await $api('/settings', settingsOptions)
})
