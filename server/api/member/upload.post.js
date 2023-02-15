export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const body = await useBody(event)
  const bodyData = new FormData();
  console.log();
  bodyData.append('file', body, body.name)
  const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);
  console.log('cooookoie: ', sessionCookie);
  const { id } = event.context.params;
  const apiUrl = `${config.public.COMMUNITY_API_URL}/upload/members/cover/${id}`;
  const uploadOptions = {
    method: "POST",
    body: bodyData,
    headers: {
      "Accept": "*/*",
      "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
    }
  }

  const response = await $fetch.raw(apiUrl, uploadOptions);

  return response;
})
