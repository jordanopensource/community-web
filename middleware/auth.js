export default defineNuxtRouteMiddleware(async () => {
  if (process.server) {
    if(useCookie('connect.sid').value) {
      await isAuth('connect.sid', useCookie('connect.sid').value)
    } else {
      useAuth().value = false
    }
  }
})
