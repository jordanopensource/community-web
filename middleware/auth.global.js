export default defineNuxtRouteMiddleware(async () => {
  const { status, getSession, token, data } = useAuth()
  if (process.client) {
    const memberId = localStorage.getItem('userId')
    if (memberId) {
      userId().value = memberId
    } else if (token.value) {
      await getSession().then(() => {
        updateUserId(data.value?.id)
      })
    }
    useFetchMember()
    isAuth().value = status.value === 'authenticated'
  }
})
