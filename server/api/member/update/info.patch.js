export default defineEventHandler(async (event) => {
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

  return await $api('/member/', uploadOptions)
})
