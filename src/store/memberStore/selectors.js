import { createSelector } from 'reselect'
import { MEMBERHIPS } from '@constants/common'

const memberSelector = (state) => state.member

export const isPro = createSelector(
  memberSelector,
  (stats) => stats.profile.membership === MEMBERHIPS['PRO']
)

export const isAdmin = createSelector(
  memberSelector,
  (stats) => stats.profile.membership === MEMBERHIPS['ADMIN']
)

export const isPremium = createSelector(
  memberSelector,
  (stats) => stats.profile.membership === MEMBERHIPS['PREMIUM']
)

export const isFree = createSelector(
  memberSelector,
  (stats) => stats.profile.membership === MEMBERHIPS['FREE']
)

export const isFreeFriday = createSelector(
  memberSelector,
  (stats) => stats.profile.membership === MEMBERHIPS['FREE_FRIDAY']
)

export const isExtendedMember = createSelector(memberSelector, (stats) =>
  [MEMBERHIPS['PRO'], MEMBERHIPS['PREMIUM'], MEMBERHIPS['ADMIN']].includes(
    stats.profile.membership
  )
)
