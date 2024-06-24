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

const STORAGE_KEYS = {
  userId: 'userId',
  member: 'member'
}

/**
 * Returns current (authenticated) member data
 * @returns { Ref<MemberData> }
 */
export const useMemberData = () => useState('member', () => { })

/**
 * returns the user id
 * @returns {Ref<string | null>}
 */
export const userId = () => useState('userId', () => null)

/**
 * updates userId and sets its value in localStorage
 * @param {string | null} id 
 */
export const updateUserId = (id) => {
  userId().value = id
  id ?
    localStorage.setItem(STORAGE_KEYS.userId, id) :
    localStorage.removeItem(STORAGE_KEYS.userId)
}

/**
 * updates member and sets its value in localStorage
 * @param { MemberData | null } member 
 */
export const updateMember = (member) => {
  useMemberData().value = member
  member ?
    localStorage.setItem(STORAGE_KEYS.member, JSON.stringify(member)) :
    localStorage.removeItem(STORAGE_KEYS.member)
}

/**
 * Fetches and returns current (authenticated) member data
 * @param { string } memberId
 * @returns { Promise<MemberData> }
 */
export const useFetchMember = async (memberId = userId().value) => {
  const apiUrl = useRuntimeConfig().public.communityApiUrl
  const { token } = useAuth()

  if (!memberId) return null
  
  // TODO: maybe this could be refactored to be used for both authenticated and unauthenticated users?
  if (!token.value) return null
  try {
    const data = await $fetch(`${apiUrl}/member/${memberId}`, {
      headers: {
        Authorization: token.value && memberId === userId().value ?
          token.value : null
      }
    })
    updateMember(data)
    return data
  } catch (error) {
    console.error('Error fetching member profile:', error)
    return null
  }
}

/**
 * returns authorization status
 * @returns {Ref<boolean | null>}
 */
export const isAuth = () => useState('auth', () => null)
