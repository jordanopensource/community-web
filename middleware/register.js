export default defineNuxtRouteMiddleware(async(to, from) => {
  const config = useRuntimeConfig()
  if (process.server) {
    const cookieName = `${config.public.sessionCookieName}`
    if(useCookie(cookieName).value) {
      await isAuth(cookieName, useCookie(cookieName).value)
    } else {
      // if there's no cookie
      useAuthenticated().value = false
    }
  }
  if (to.name === 'register' && useAuthenticated().value) {
    return navigateTo('/')
  }
})
