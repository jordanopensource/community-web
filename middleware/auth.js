export default defineNuxtRouteMiddleware((to, from) => {
  if (to.name === 'login') {
    if (!!useCookie('auth').value) {
      // if user is logged in
      console.log('Already logged in')
      navigateTo('/')
    } else {
      console.log('Proceeding to log in')
      navigateTo(to.fullPath)
    }
  }
})
