import { useAuth } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.name === 'members-settings' && !from.name) {
    return navigateTo('/')
  }

  const { status, getSession, token, data: authSessionData } = useAuth()
  const userIdRef = userId()
  const memberDataRef = useMemberData()
  const isAuthRef = isAuth()

  // Early exit if no token
  if (!token.value) {
    // Ensure consistent state if no token
    isAuthRef.value = false
    userIdRef.value = null
    memberDataRef.value = null
    // Check for settings page redirect even if no token
    if (to.name === 'members-settings') {
      return navigateTo('/')
    }
    return
  }

  // If member data is already loaded for the current user
  // and the user is authenticated, no need to fetch again.
  // Check status.value to ensure useAuth has determined authentication status.
  if (
    memberDataRef.value &&
    userIdRef.value === memberDataRef.value?.member?.id &&
    status.value === 'authenticated'
  ) {
    isAuthRef.value = true // Ensure isAuthRef is also true
    return
  }

  // Await the session information directly
  await getSession()

  // Update auth status based on the session
  isAuthRef.value = status.value === 'authenticated'

  if (isAuthRef.value && authSessionData.value?.id) {
    userIdRef.value = authSessionData.value.id

    // Only fetch member data if it's not already loaded for the current user
    // or if the user ID has changed.
    if (
      !memberDataRef.value ||
      memberDataRef.value?.member?.id !== userIdRef.value
    ) {
      try {
        const fetchedMemberData = await useFetchMember(userIdRef.value)
        memberDataRef.value = fetchedMemberData || null
      } catch (error) {
        console.error(
          'Error in auth middleware while fetching member data:',
          error,
        )
        memberDataRef.value = null // Clear member data on error
      }
    }
  } else {
    // Not authenticated or no session user ID after getSession
    userIdRef.value = null
    memberDataRef.value = null
    // isAuthRef.value would have been set to false if status wasn't 'authenticated'
  }

  // Final check for settings page after attempting to authenticate and fetch data
  if (to.name === 'members-settings' && !isAuthRef.value) {
    return navigateTo('/')
  }
})
