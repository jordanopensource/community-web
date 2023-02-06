
export default defineNuxtRouteMiddleware(async(to, from) => {
  const config = useRuntimeConfig()
  const sessionCookie = useCookie(`${config.public.SESSION_COOKIE_NAME}`).value
  
  if (to.fullPath === '/login') {
    if (sessionCookie) {
      await isAuth(`${config.public.SESSION_COOKIE_NAME}`, sessionCookie)
    } else {
      useAuth().value = false
    }
    if (useAuth().value) {
      if (from.fullPath !== '/login') {
        return navigateTo(from.fullPath)
      }
      return navigateTo('/')
    }
  }
})
