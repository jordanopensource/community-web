export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const { endpoint, id } = event.context.params;
  const sessionCookie = getCookie(event, `${config.public.sessionCookieName}`);
  const apiUrl = `${config.public.communityApiUrl}/${endpoint}/${id}`;
  const uploadOptions = {
    method: "DELETE",
    headers: {
      "Accept": "*/*",
      "Authorization": `Bearer ${sessionCookie}`
    }
  }

  const response = await $fetch.raw(apiUrl, uploadOptions);

  return response?._data;
})
