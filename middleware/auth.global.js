export default defineNuxtRouteMiddleware(async () => {
  const { status, getSession, token, data } = useAuth()
  if (process.client) {
    const memberId = localStorage.getItem('userId')
    if (memberId) {
      userId().value = memberId
    } else if (token.value) {
      await getSession().then(() => {
        // TODO: this will be turned into its own composable
        userId().value = data.value?.id
        localStorage.setItem('userId', userId().value)
      })
    }
    useFetchMember()
    // NOTE: if we already have `status` from useAuth then
    // useAuthenticated is now redundant
    useAuthenticated().value = status.value === 'authenticated'
  }
})
