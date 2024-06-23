/**
 * @typedef {Object} MemberData
 * @property {Object} member
 * @property {string} member.id
 * @property {string} member.first_name_en
 * @property {string} member.first_middle_name_en
 * @property {string} member.second_middle_name_en
 * @property {string} member.last_name_en
 * @property {string} member.first_name_ar
 * @property {string} member.first_middle_name_ar
 * @property {string} member.second_middle_name_ar
 * @property {string} member.last_name_ar
 * @property {string} member.josa_member_id
 * @property {number} member.type
 * @property {string} member.github_user
 * @property {string} member.wikimedia_user
 * @property {?string} member.member_since
 * @property {?string} member.avatar_url
 * @property {?string} member.cover_url
 * @property {?string} member.about
 * @property {?string} member.headline
 * @property {?string} member.location
 * @property {number} member.points
 * @property {Object} settings
 * @property {string} settings.id
 * @property {string} settings.memberId
 * @property {number} settings.about
 * @property {number} settings.experienceAndEducation
 * @property {boolean} settings.hideGithubContributions
 * @property {boolean} settings.hideWikimediaContributions
 * @property {Array} education
 * @property {Array} experience
 * @property {Array} contributions
 * @property {Object} open_source_contributions
 * @property {string} open_source_contributions.github_contributions
 * @property {Object.<string, any>} open_source_contributions.wikimedia_contributions
 */

/**
 * Returns current (authenticated) member data
 * @returns { Ref<MemberData> }
 */
export const useMemberData = () => useState('member', () => { })

/**
 * returns the user id
 * @returns {Ref<string>}
 */
export const userId = () => useState('userId', () => '')

/**
 * returns authorization status
 * @returns {Ref<boolean>}
 */
export const isAuth = () => useState('auth', () => false)

/**
 * Fetches and returns current (authenticated) member data
 * and stores them in LocalStorage
 * @returns { Promise<MemberData> }
 */
export const useFetchMember = async () => {
  const apiUrl = useRuntimeConfig().public.communityApiUrl
  console.info("API URL: ", apiUrl)

  const { token } = useAuth()
  console.info("MEMBER TOKEN: ", token.value)

  const memberId = userId().value
  console.log("MEMBER ID: ", memberId)

  // TODO: maybe this could be refactored to be used for both authenticated and unauthenticated users?
  if (!token.value) return null
  try {
    const data = await $fetch(`${apiUrl}/member/${memberId}`, {
      headers: {
        Authorization: token.value
      }
    })
    // TODO: remove this from here and move it to its own composable
    localStorage.setItem('member', JSON.stringify(data))
    useMemberData().value = data
    return data
  } catch (error) {
    console.error('Error fetching member profile:', error)
    return null
  }
}
