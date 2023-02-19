export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  if (process.server) {
    if(useCookie(`${config.public.SESSION_COOKIE_NAME}`).value) {
      await isAuth(`${config.public.SESSION_COOKIE_NAME}`, useCookie(`${config.public.SESSION_COOKIE_NAME}`).value)
    } else {
      useAuth().value = false
    }
  }
  if (to.fullPath === '/members/settings/' && !useAuth().value) {
    return navigateTo(`/`)
  }
})
