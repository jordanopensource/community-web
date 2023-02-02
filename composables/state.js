
// store authorization status
export const useAuth = () => useState('auth',  () => false)

// store the user id
export const userId = () => useState('userId',  () => '')

// check if user is authenticated and update the store accordingly
export const isAuth = async (cookieName, cookieValue) => {
  const authenticated = useAuth()
  const userID = userId();
  const config = useRuntimeConfig()

  const url = `${config.public.COMMUNITY_API_URL}/auth/`
  await useFetch(url, {
    method: 'GET',
    headers: {
      "Accept": "*/*",
      "Cookie": cookieName + '=' + cookieValue
    },
    onResponse({response}) {
      authenticated.value = response.ok
      userID.value = response._data.id
    },
    onResponseError({response}) {
      if (response.status === 403) {
        // TODO: handle expired session / unauthorized
      }
    }
  })
}