export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  try {
    // Make direct REST API call to the auth login endpoint

    const loginResponse = await $api('/auth/login', {
      method: 'POST',
      body: body,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.error('Login API call failed:', error)
      throw createError({
        statusCode: error.status || error.statusCode || 500,
        statusMessage: 'Authentication failed',
        message: error.message || 'Login API call failed',
      })
    })

    // Extract access token from response
    const accessToken = loginResponse.access_token
    if (!accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication failed',
        message: 'No access token received',
      })
    }

    // Set the auth cookie
    const tokenCookieName =
      config.public.auth?.provider?.token?.cookieName || 'access_token'
    const maxAge = config.public.auth?.provider?.token?.maxAgeInSeconds || 86400

    setCookie(event, tokenCookieName, accessToken, {
      httpOnly:
        config.public.auth?.provider?.token?.httpOnlyCookieAttribute ?? false,
      secure:
        config.public.auth?.provider?.token?.secureCookieAttribute ?? false,
      sameSite: config.public.auth?.provider?.token?.sameSiteAttribute || 'lax',
      maxAge: maxAge,
      path: '/',
    })

    // Get user session data
    const sessionResponse = await $api('/auth', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // Fetch user member data if session contains user ID
    let memberData = null
    if (sessionResponse?.id) {
      try {
        memberData = await $api(`/member/${sessionResponse.id}`, {
          method: 'GET',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
      } catch (error) {
        console.warn('Failed to fetch member data:', error)
        // Don't fail the login if member data fetch fails
      }
    }

    // Return successful login response with session and member data
    return {
      success: true,
      session: sessionResponse,
      member: memberData,
      redirectTo: '/',
    }
  } catch (error) {
    console.error(
      'Error [AUTH | LOGIN]:',
      error.status || error.statusCode,
      error.message,
    )

    // Clean up any partially set cookies on error
    const tokenCookieName =
      config.public.auth?.provider?.token?.cookieName || 'access_token'
    deleteCookie(event, tokenCookieName)

    throw createError({
      statusCode: error.status || error.statusCode || 401,
      statusMessage: 'Authentication failed',
      message: error.message || 'Login failed',
    })
  }
})
