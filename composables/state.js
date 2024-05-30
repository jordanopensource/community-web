
// store authorization status
export const useAuthenticated = () => useState('auth', () => false)

// store the user id
export const userId = () => useState('userId', () => '')

// member data required for user widget
export const useMember = () => useState('member', () => { })

// check if user is authenticated and update the store accordingly
export const isAuth = async (cookieName, cookieValue) => {
  const authenticated = useAuthenticated()
  const userID = userId();
  const member = useMember();
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
      const { first_name_en, last_name_en, id, avatar_url, type, josa_member_id } = response._data
      member.value = { first_name_en, last_name_en, id, avatar_url, type, josa_member_id }
      userID.value = id
    },
    onResponseError({ response }) {
      if (response.status === 403) {
        // TODO: handle expired session / unauthorized
      }
    }
  })
}
