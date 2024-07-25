export default defineNuxtRouteMiddleware(async (to) => {
  const { status, getSession, token, data } = useAuth()

  if (!token.value) return

  const memberData = useMemberData().value
  if (memberData && userId().value === memberData?.member?.id) return

  getSession().then(async () => {
    updateUserId(data.value?.id)
    try {
      updateMember(await useFetchMember(userId().value))
    } catch (error) {
      console.error(error)
    }
    isAuth().value = status.value === 'authenticated'
    console.info('session updated')
  })
  if (to.name === 'members-settings' && !isAuth().value) {
    return navigateTo(`/`)
  }
})
