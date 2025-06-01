// Nuxt 3 auto-imports utilities from server/utils, so direct imports might not be needed for these.
// However, explicitly importing can be clearer.
// import { useRuntimeConfig, getCookie, createError } from '#imports';

export const getValidatedSessionCookie = (event) => {
  const config = useRuntimeConfig(event)
  // Using the path as per your current info.patch.js
  const tokenCookieName = config.public.auth?.provider?.token?.cookieName

  if (!tokenCookieName) {
    console.error(
      'Auth module cookieName not found in runtime config at config.public.auth?.provider?.token?.cookieName.',
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Server configuration error: Auth cookie name not found.',
    })
  }

  const sessionCookie = getCookie(event, tokenCookieName)
  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Session cookie is missing or invalid.',
    })
  }
  return sessionCookie
}
