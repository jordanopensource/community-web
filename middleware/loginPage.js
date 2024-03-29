
export default defineNuxtRouteMiddleware(async(to, from) => {
  const config = useRuntimeConfig()
  if (process.server) {
    const cookieName = `${config.public.sessionCookieName}`
    if(useCookie(cookieName).value) {
      await isAuth(cookieName, useCookie(cookieName).value)
    } else {
      // if there's no cookie
      useAuth().value = false
    }
  }
  if (to.name === 'login' && useAuth().value) {
    if (from.fullPath !== '/login') {
      return navigateTo(from.fullPath)
    }
    return navigateTo('/')
  }
})
