export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sessionCookie = getValidatedSessionCookie(event)
  const apiUrl = `/upload/members/cover/`
  const uploadOptions = {
    method: 'POST',
    body: body,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }
  const response = await $api(apiUrl, uploadOptions)
  return response
})
