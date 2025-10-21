export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sessionCookie = getValidatedSessionCookie(event)
  const uploadOptions = {
    method: 'POST',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }

  return await $api('/education', uploadOptions)
})
