
// store authorization status
export const useAuthenticated = () => useState('auth', () => false)

// store the user id
export const userId = () => useState('userId', () => '')

// check if user is authenticated and update the store accordingly
export const isAuth = async (cookieName, cookieValue) => {
  const authenticated = useAuthenticated()
  const userID = userId();
  const config = useRuntimeConfig()

  const url = `${config.public.communityApiUrl}/auth/`
  await useFetch(url, {
    method: 'GET',
    headers: {
      "Accept": "*/*",
      "Cookie": `${cookieName}=${cookieValue}`
    },
    onResponse({ response }) {
      authenticated.value = response.ok
      userID.value = id
    },
    onResponseError({ response }) {
      if (response.status === 403) {
        // TODO: handle expired session / unauthorized
      }
    }
  })
}
