const SESSION_KEY = 'wordpress_logged_in_70d1b6c27a1466a2cc959e311ee5cd7e'

const MEMBERHIPS = {
  FREE: 'Free',
  FREE_FRIDAY: 'Free (Friday)',
  PREMIUM: 'Premium',
  PRO: 'Professional',
  ADMIN: 'Administrator'
}

const NAGMES_MAX_COUNT = 30

const MEMBER_FAIL_STATUS = 'FAILURE'

const MEMBER_CHECK_STATUS_DELAY = 25000

const STANDARD_DELAY = 500

const DEFAULT_SORT_DIR = 'asc'
const DEFAULT_SORT_ID = 0

const LEADERBOARD_TIMES_PERIOD = [
  {
    label: 'Daily',
    value: 'day',
    dateFormat: 'dddd Do MMMM YYYY',
    isDate: true,
    displayName: 'Daily',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'Weekly',
    value: 'week',
    default: true,
    dateFormat: 'dddd Do MMMM YYYY',
    isDate: true,
    displayName: 'Weekly',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'Monthly',
    value: 'month',
    dateFormat: 'MMMM YYYY',
    isDate: true,
    displayName: 'Monthly',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'Yearly',
    value: 'year',
    dateFormat: 'YYYY',
    isDate: true,
    displayName: 'Yearly',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'All Time',
    value: 'all-time',
    dateFormat: '',
    isDate: false,
    displayName: 'All-Time',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'Courses',
    value: 'courses',
    dateFormat: '',
    isDate: false,
    displayName: 'Courses',
    tableColumnsType: 'courses'
  },
  {
    label: 'Race Types',
    value: 'race-types',
    dateFormat: '',
    isDate: false,
    displayName: 'Race Type',
    tableColumnsType: 'raceTypesTable'
  },
  {
    label: 'Special Events',
    value: 'events',
    dateFormat: '',
    isDate: false,
    displayName: 'Special Event',
    tableColumnsType: 'events'
  }
]

const DASHBOARD_LEADERBOARD_TIMES_PERIOD = [
  {
    label: 'Today',
    value: 'day',
    default: true,
    dateFormat: 'Do MMMM YYYY',
    isDate: true,
    displayName: 'Today',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'This Week',
    value: 'week',
    dateFormat: 'DD-MM-YYYY',
    isDate: true,
    displayName: 'Weekly',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'This Month',
    value: 'month',
    dateFormat: 'MMMM',
    isDate: true,
    displayName: 'Monthly',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'This Year',
    value: 'year',
    dateFormat: 'YYYY',
    isDate: true,
    displayName: 'Yearly',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'All-Times',
    value: 'all-time',
    dateFormat: '',
    isDate: false,
    displayName: 'All-Time',
    tableColumnsType: 'timeTable'
  },
  {
    label: 'Special Events',
    value: 'events',
    dateFormat: '',
    isDate: false,
    displayName: 'Special Events',
    tableColumnsType: 'events'
  }
]

const DASHBOARD_LATEST_NAP_SELECTION_PERIOD = [
  {
    label: 'Latest NAP Result',
    value: 'entries'
  },
  {
    label: 'Latest Selection Result',
    value: 'selections'
  }
]

const DASHBOARD_TIPSTATS_PERIOD = [
  {
    label: 'NAP',
    value: 'entry'
  },
  {
    label: 'Selection',
    value: 'selection'
  },
  {
    label: 'NagMe',
    value: 'nag_me'
  }
]

const STATS_TYPES = [
  { value: 'entry', label: 'NAPs' },
  { value: 'selection', label: 'Selections' },
  { value: 'nag_me', label: 'NagMe' },
  { value: 'prostats', label: 'ProStats' }
]

const STATS_MARKET = [
  { value: 'win', label: 'Win' },
  { value: 'place', label: 'Place' }
]

const DEFAULT_STATS_GROUP_BY = { id: 'all', name: 'All' }

const FILTER_SET_GROUP_BY = { id: 'filter-sets', name: 'Filterset' }

const STATS_SELECT_TYPE_LABEL = 'Selection'

const STATS_GROUP_BY_LABEL = 'Group by'

const STATS_FILTER_SET_LABEL = 'Current Data Filter'

const TABLE_MODS = [
  {
    value: 'win_sr',
    label: 'WS'
  },
  {
    value: 'place_sr',
    label: 'PS'
  },
  {
    value: 'win_pr',
    label: 'WP'
  }
]

const NAPS_MODS = [
  {
    value: 'nap',
    label: 'NAP',
    originalLabel: 'NAP'
  },
  {
    value: 'nb',
    label: 'NB',
    originalLabel: 'NB'
  },
  {
    value: 'reserve',
    label: '3B',
    originalLabel: '3B'
  },
  {
    value: '',
    label: 'Clear',
    originalLabel: 'Clear'
  }
]

const MODALS_LIST = {
  NAGME_ADD_MODAL: 'NAGME_ADD_MODAL',
  NAGME_DELETE_MODAL: 'NAGME_DELETE_MODAL',
  STATS_DELETE_MODAL: 'STATS_DELETE_MODAL',
  STATS_FILTER_APPLY_MODAL: 'STATS_FILTER_APPLY_MODAL',
  STATS_ADD_MODAL: 'STATS_ADD_MODAL',
  FILTER_UPDATE_MODAL: 'FILTER_UPDATE_MODAL',
  NAGME_CREATING_MODAL: 'NAGME_CREATING_MODAL',
  NAGME_UPDATE_MODAL: 'NAGME_UPDATE_MODAL',
  RACES_COLUMNS_SETTINGS: 'RACES_COLUMNS_SETTINGS',
  RACES_SELECTIONS_MODAL: 'RACES_SELECTIONS_MODAL',
  ENTRIES_SUBMIT_MODAL: 'ENTRIES_SUBMIT_MODAL',
  SELECTIONS_SUBMIT_MODAL: 'SELECTIONS_SUBMIT_MODAL',
  ADVANCED_RATING_MODAL: 'ADVANCED_RATING_MODAL',
  NEW_VERSION_MODAL: 'NEW_VERSION_MODAL',
  SELECTION_CONFIRMATION_MODAL: 'SELECTION_CONFIRMATION_MODAL',
  SAVE_SIGNIN_DIALOG: 'SAVE_SIGNIN_DIALOG',
  REPORT_COMMENT_MODAL: 'REPORT_COMMENT_MODAL'
}

const STATS_FIELD_TYPES = {
  MultiOptionFilter: 'MultiOptionFilter',
  NumberRangeFilter: 'NumberRangeFilter',
  DateRangeFilter: 'DateRangeFilter',
  TextFilter: 'TextFilter',
  BooleanFilter: 'BooleanFilter'
}
const SELECTION_DATE_ERROR =
  "You can't add selections from a race that has already started/finished"

const NAP_DATE_ERROR =
  "You can't select a NAP for a race that has already started/finished"

const FILTER_APPLY_MESSAGE = (selections) =>
  `You already have ${selections} selections, which will be replaced if you apply filters now. Alternatively, you can merge the filtered runners with the existing runners you have selected.`

export {
  SESSION_KEY,
  MEMBERHIPS,
  LEADERBOARD_TIMES_PERIOD,
  DASHBOARD_LEADERBOARD_TIMES_PERIOD,
  MODALS_LIST,
  NAGMES_MAX_COUNT,
  STANDARD_DELAY,
  DEFAULT_SORT_DIR,
  DEFAULT_SORT_ID,
  STATS_TYPES,
  STATS_MARKET,
  TABLE_MODS,
  NAPS_MODS,
  DEFAULT_STATS_GROUP_BY,
  FILTER_SET_GROUP_BY,
  STATS_FIELD_TYPES,
  STATS_SELECT_TYPE_LABEL,
  STATS_GROUP_BY_LABEL,
  STATS_FILTER_SET_LABEL,
  MEMBER_FAIL_STATUS,
  MEMBER_CHECK_STATUS_DELAY,
  SELECTION_DATE_ERROR,
  NAP_DATE_ERROR,
  DASHBOARD_LATEST_NAP_SELECTION_PERIOD,
  DASHBOARD_TIPSTATS_PERIOD,
  FILTER_APPLY_MESSAGE
}
