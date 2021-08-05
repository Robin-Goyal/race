import {
  toggleDisableHints,
  toggleDisableNotifications,
  toggleShowFractionalOdds,
  toggleShowNationality,
  toggleShowNonrunners,
  toggleHideComments
} from '@store/globalSettings/actions'

const racesSettingsMenuList = [
  {
    label: 'Show non-runners',
    name: 'show_non_runners',
    handler: toggleShowNonrunners
  },
  {
    label: 'Show Nationalities',
    name: 'show_nationalities',
    handler: toggleShowNationality
  },
  {
    label: 'Hide Comments',
    name: 'hide_comments',
    handler: toggleHideComments
  },
  {
    label: 'Show fractional odds (ISP)',
    name: 'show_fractional_odds',
    handler: toggleShowFractionalOdds
  },
  {
    label: 'Disable hints',
    name: 'hints_disabled',
    handler: toggleDisableHints
  },
  {
    label: 'Disable notifications',
    name: 'notifications_disabled',
    handler: toggleDisableNotifications
  }
]

export default racesSettingsMenuList
