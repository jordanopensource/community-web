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
export const useFetchMember = async (memberId) => {
  const { token } = useAuth()
  const currentAuthenticatedUserId = userId().value
  const memberDataRef = useMemberData()

  // Determine the actual memberId to fetch.
  // If memberId is not provided (undefined), use the current authenticated user's ID.
  const memberIdToFetch =
    memberId !== undefined ? memberId : currentAuthenticatedUserId

  if (!memberIdToFetch) {
    // This error is thrown if memberIdToFetch is not provided (or is undefined)
    // AND currentAuthenticatedUserId is null.
    console.error(
      'useFetchMember: userId is required to fetch a member profile. No memberId provided and currentAuthenticatedUserId is null.',
    )
    return null // Or throw new Error('userId is required to fetch a member profile.');
  }

  // Determine if we are fetching the currently authenticated user's own profile
  const isOwnProfile =
    memberIdToFetch === currentAuthenticatedUserId &&
    currentAuthenticatedUserId !== null

  try {
    const data = await $api(`/member/${memberIdToFetch}`, {
      headers: {
        // Use hoisted/pre-calculated values
        Authorization: token.value && isOwnProfile ? token.value : null,
      },
    })

    // Use pre-calculated isOwnProfile and the hoisted memberDataRef
    if (isOwnProfile) {
      // Directly update the .value of the ref obtained from useMemberData()
      if (data) {
        memberDataRef.value = data
      } else {
        // If data is null/undefined (e.g., API returned error or no content),
        // you might want to clear the memberDataRef or handle it specifically.
        // For now, if data is null, updateMember would have set it to null.
        memberDataRef.value = null
        console.warn(
          `useFetchMember: Fetched data is null/undefined for own profile (ID: ${memberIdToFetch}). Member state set to null.`,
        )
      }
    }
    return data
  } catch (error) {
    console.error(
      `Error fetching member profile for ID ${memberIdToFetch}:`,
      error,
    )
    // It's important to also clear or reset state if the fetch fails for the current user
    if (isOwnProfile) {
      memberDataRef.value = null
    }
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
