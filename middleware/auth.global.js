export default defineNuxtRouteMiddleware(async (to) => {
  const { status, getSession, token, data } = useAuth()
  if (process.client) {
    const memberId = localStorage.getItem('userId')
    if (memberId) {
      userId().value = memberId
    } else if (token.value) {
      getSession().then(() => {
        updateUserId(data.value?.id)
      })
    }
    try {
      if (!(useMemberData().value || await useFetchMember())) {
        isAuth().value = false
        updateUserId(null)
        updateMember(null)
      } else {
        isAuth().value = status.value === 'authenticated'
      }
    } catch (error) {
      console.error(error)
      isAuth().value = false
    }
  }
  if (to.name === 'members-settings' && !isAuth().value) {
    return navigateTo(`/`)
  }
})
