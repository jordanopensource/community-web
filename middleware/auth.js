export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  if (process.server) {
    if(useCookie(`${config.public.sessionCookieName}`).value) {
      await isAuth(`${config.public.sessionCookieName}`, useCookie(`${config.public.sessionCookieName}`).value)
    } else {
      useAuthenticated().value = false
    }
  }
  if (to.name === 'members-settings' && !useAuthenticated().value) {
    return navigateTo(`/`)
  }
})
