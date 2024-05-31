export const useFetchMember = async () => {
  const apiUrl = useRuntimeConfig().public.communityApiUrl
  console.info("API URL: ", apiUrl)

  const { token } = useAuth()
  console.info("MEMBER TOKEN: ", token.value)

  const memberId = userId().value
  console.log("MEMBER ID: ", memberId)

  // TODO: maybe this could be refactored to be used for both authenticated and unauthenticated users?
  if (!token.value) return null
  try {
    const data = await $fetch(`${apiUrl}/member/${memberId}`, {
      headers: {
        Authorization: token.value
      }
    })
    localStorage.setItem('member', JSON.stringify(data))
    return data
  } catch (error) {
    console.error('Error fetching member profile:', error)
    return null
  }
}
