export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionCookie = getValidatedSessionCookie(event)

  const url = `/member/${query.id}`
  const options = {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionCookie}`,
    },
  }

  return await $api(url, options)
})
