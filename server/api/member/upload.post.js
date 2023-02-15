import multipart from 'parse-multipart-data';

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const body = await useBody(event)
  // console.log(body);
  const boundary = body.split('Content-Disposition:')[0].trim()
  console.log('👁️ boundary:', boundary);
  const parts = multipart.parse(body, boundary);
  console.log('👁️ parts:', parts);
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    console.log(part);
  }

  // const file = new File([body], 'dark-thumbn', { type: 'image/png', })
  // console.log(file.name);
  // const bodyData = new FormData();
  // bodyData.append('file', file)
  // const sessionCookie = getCookie(event, `${config.public.SESSION_COOKIE_NAME}`);
  // console.log('cooookoie: ', sessionCookie);
  // const { id } = event.context.params;
  // const apiUrl = `${config.public.COMMUNITY_API_URL}/upload/members/cover/`;
  // const uploadOptions = {
  //   method: "POST",
  //   body: bodyData,
  //   headers: {
  //     "Accept": "*/*",
  //     "Cookie": `${config.public.SESSION_COOKIE_NAME}=` + sessionCookie,
  //   }
  // }

  // const response = await $fetch.raw(apiUrl, uploadOptions);

  // return response;
})
