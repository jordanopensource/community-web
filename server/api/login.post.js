export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const url = `${config.public.communityApiUrl}/auth/`
  const loginOptions = {
    method: "POST",
    body: body,
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
  }

  const loginResponse = await $fetch.raw(url + 'login', loginOptions);

  const authResponse = await $fetch.raw(url, {
    method: 'GET',
    headers: {
      "Accept": "*/*",
      "Cookie": loginResponse.headers.get('set-cookie')
    }
  })
  appendHeader(event, 'Set-Cookie', loginResponse.headers.get('set-cookie')) // assuming we only set one cookie
  return authResponse._data
});
