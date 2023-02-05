
export default defineNuxtRouteMiddleware(async(to, from) => {
  const sessionCookie = useCookie('connect.sid').value
  if (to.fullPath === '/login') {
    if (sessionCookie) {
      await isAuth('connect.sid', sessionCookie)
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
