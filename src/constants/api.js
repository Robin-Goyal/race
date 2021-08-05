import dateConversations from '@utils/timeUtils'

const apiBaseUrl = process.env.API_URL || ''

const apiUrls = {
  auth: {
    login: (redirectUrl) =>
      `https://ratingtheraces.com/wp-login.php?redirect_to=${redirectUrl}`,
    updateSettings: (name) => `/api/members/${name}/`,
    updateSubscription: '/api/members/subscription/',
    profile: (name) => `/api/members/${name}/`
    // checkSignIn: `/api/members/_check_signin`,
    // saveSignIn: `/api/members/_save_signin`
  },
  contactUs: '/contact-us/',
  flatpage: (slug) => `/flatpages/${slug}/`,
  member: `/api/members/auth/`,
  dashboard: {
    get: '/api/dashboard/'
  },
  memberRaceColumns: (date) => `api/members/_race_columns_dialog/${date}/`,
  horsesAutocomplete: (slug) =>
    `/api/races/horse-autocomplete/?q=${slug || ''}`,
  leaderBoards: (date, detail, extra) => ({
    day: `/api/leaderboards/daily/${date.format('YYYY-MM-DD')}/`,
    week: `/api/leaderboards/weekly/${dateConversations.getFirstDay(date)}/`,
    month: `/api/leaderboards/monthly/${date.format('YYYY-MM')}/`,
    year: `/api/leaderboards/yearly/${date.format('YYYY')}/`,
    'all-time':
      detail && extra
        ? `/api/leaderboards/all-time/${detail}/${extra}/`
        : detail
        ? `/api/leaderboards/all-time/${detail}/`
        : '/api/leaderboards/all-time/',
    courses:
      detail && extra
        ? `/api/leaderboards/courses/${detail}/${extra}/`
        : detail
        ? `/api/leaderboards/courses/${detail}/`
        : '/api/leaderboards/courses/',
    'race-types':
      detail && extra
        ? `/api/leaderboards/race-types/${detail}/${extra}/`
        : detail
        ? `/api/leaderboards/race-types/${detail}/`
        : '/api/leaderboards/race-types/',
    events:
      detail && extra
        ? `/api/leaderboards/events/${detail}/${extra}/`
        : detail
        ? `/api/leaderboards/events/${detail}/`
        : '/api/leaderboards/events/'
  }),
  nagmes: {
    get: (page) => `/api/members/nag_mes/?page=${page}`,
    create: '/api/members/nag_mes/',
    update: (id) => `/api/members/nag_mes/${id}/`
  },
  history: {
    horse: ({ type, nationality, name, page }) =>
      `/api/history/${type}/${nationality}/${name}/?page=${page}`,
    sire: ({ type, nationality, name, page }) =>
      `/api/history/${type}/${nationality}/${name}/?page=${page}`,
    jockey: ({ type, name, page }) =>
      `/api/history/${type}/${name}/?page=${page}`,
    trainer: ({ type, name, page }) =>
      `/api/history/${type}/${name}/?page=${page}`,
    update: (id) => `/api/members/nag_mes/${id}`,
    napHistory: '/api/history/nap_history/'
  },
  stats: {
    config: '/api/stats/config/',
    statsData: (statsType, groupBy, filterBy) =>
      filterBy
        ? `/api/stats/${statsType}/${groupBy}/${filterBy}/`
        : `/api/stats/${statsType}/${groupBy}/`,
    today: '/api/stats/apply-filters/today/',
    tomorrow: '/api/stats/apply-filters/tomorrow/',
    createUserFilter: `api/stats/user-filters/`,
    userFilter: (filterName) => `api/stats/user-filters/${filterName}/`,
    courseList: (query) => `/_typeahead/course/?q=${query}`,
    runnerList: (query) => `/_typeahead/runner/?q=${query}`,
    jockeyList: (query) => `/_typeahead/jockey/?q=${query}`,
    trainerList: (query) => `/_typeahead/trainer/?q=${query}`,
    sireList: (query) => `/_typeahead/sire/?q=${query}`,
    chartUrl: (key, type) => `/api/stats/extra_data/${type || 'bfsp'}/${key}/`
  },
  races: {
    getAllRaces: (date, page) =>
      page ? `/api/races/${date}/${page}/` : `/api/races/${date}/`,
    downloadFile: (file, date) =>
      date ? `/api/races/${file}/${date}/` : `/api/races/${file}/`,
    getAllCourseTimeRaces: (date) => `/api/races/course/time/${date}/`,
    getOneRace: (date, course, time) =>
      time
        ? `/api/races/${date}/${course}/${time}/`
        : `/api/races/${date}/${course}/`,
    getComments: (date, course, time, page) =>
      `/api/comments/get_comments/${date}/${course}/${time}/?page=${page}`,
    createComment: (date, course, time) =>
      `/api/comments/${date}/${course}/${time}/`,
    replyComment: (id) => `/api/comments/reply_comment/${id}/`,
    reportComment: (id) => `/api/comments/report_comment/${id}/`,
    getRepliedComments: (id, page) =>
      `/api/comments/get_replied_comments/${id}/?page=${page}`,
    unlikeComment: (id) => `/api/comments/unlike_comment/${id}/`,
    likeComment: (id) => `/api/comments/like_comment/${id}/`,
    deleteComment: (id) => `/api/comments/delete_comment/${id}/`
  },
  selections: {
    getSelections: (username, page) =>
      `/api/selections/${
        username ? `${username}/?page=${page}` : `?page=${page}`
      }`,
    link: (id) => `/api/selections/${id}/`,
    getDetails: (date) => `/api/selections/dialog/${date}/`,
    base: (date) => `/api/selections/submit/selection/${date}/`,
    download: (date) => `/api/selections/download/${date}/`,
    delete: (date) => `/api/selections/list/${date}/`,
    deleteMultiple: (date) => `/api/selections/delete/${date}/`
  },
  entry: {
    getEntries: (username, page) =>
      `/api/entries/${
        username ? `${username}/?page=${page}` : `?page=${page}`
      }`,
    link: (date) => `/api/entries/entry/${date}/`,
    getDetails: (date) => `/api/entries/_enter_nap_dialog/${date}/`,
    getSubmittedDetails: (date) => `/api/entries/_show_nap_dialog/${date}/`,
    entryTodayTip: (id) => `/api/leaderboards/_entry_today_tip/${id}/`,
    entryDayTip: (id, date) => `/api/leaderboards/_entry_day_tip/${id}/${date}`
  }
}

export { apiUrls, apiBaseUrl }
