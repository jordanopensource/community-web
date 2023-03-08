export default defineNuxtRouteMiddleware(async(to, from) => {
  const config = useRuntimeConfig()
  if (process.server) {
    const cookieName = `${config.public.SESSION_COOKIE_NAME}`
    if(useCookie(cookieName).value) {
      await isAuth(cookieName, useCookie(cookieName).value)
    } else {
      // if there's no cookie
      useAuth().value = false
    }
  }
  if (to.name === 'register' && useAuth().value) {
    return navigateTo('/')
  }
})
