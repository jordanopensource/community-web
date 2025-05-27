export default defineEventHandler(async (event) => {
  const sessionCookie = getValidatedSessionCookie(event)
  const body = await readBody(event)

  const uploadOptions = {
    method: 'POST',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }

  return await $api('/experience', uploadOptions)
})
