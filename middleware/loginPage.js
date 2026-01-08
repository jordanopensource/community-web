export default defineNuxtRouteMiddleware(async (to, from) => {
  const { status } = useAuth()
  // if went to login page while already authenticated
  if (to.name === 'login' && status.value === 'authenticated') {
    if (from.fullPath !== '/login') {
      return navigateTo(from.fullPath)
    }
    return navigateTo('/')
  }
})
