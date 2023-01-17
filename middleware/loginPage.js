export default defineNuxtRouteMiddleware((to, from) => {
  if (to.name === 'login') {
    if (!!useCookie('auth').value) { // if user is logged in
      if (from.fullPath !== '/login'){
        return navigateTo(from.fullPath)
      }
      else return navigateTo('/')
    }
  }
})
