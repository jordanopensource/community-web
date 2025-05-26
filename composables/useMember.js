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
  member: 'member',
}

/**
 * Returns current (authenticated) member data
 * @returns { Ref<MemberData> }
 */
export const useMemberData = () => useState('member', () => {})

/**
 * returns the user id
 * @returns {Ref<string | null>}
 */
export const userId = () => useState('userId', () => null)

/**
 * updates userId
 * @param {string | null} id
 */
export const updateUserId = (id) => {
  userId().value = id
}

/**
 * updates memberData
 * @param { MemberData | null } member
 */
export const updateMember = (member) => {
  useMemberData().value = member
}

/**
 * Fetches and returns current (authenticated) member data
 * @param { string } memberId
 * @returns { Promise<MemberData> }
 */
export const useFetchMember = async (memberId = userId().value) => {
  const { token } = useAuth()

  if (!memberId) throw new Error('userId is required')

  try {
    const data = await $api(`/member/${memberId}`, {
      headers: {
        Authorization:
          token.value && memberId === userId().value ? token.value : null,
      },
    })
    if (memberId === userId()) updateMember(data)
    return data
  } catch (error) {
    console.error('Error fetching member profile:', error)
    return null
  }
}

/**
 * Logs user out and clears userId and memberData
 */
export const logoutMember = () => {
  const { signOut } = useAuth()
  signOut({
    callbackUrl: '/',
  })
  isAuth().value = false
  updateUserId(null)
  updateMember(null)
}

/**
 * returns authorization status
 * @returns {Ref<boolean | null>}
 */
export const isAuth = () => useState('auth', () => null)
