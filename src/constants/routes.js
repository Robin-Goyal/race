const routes = {
  home: '/',
  dashboard: '/dashboard',
  napCompetition: '/info/rtr-nap-competition/',
  about: '/about',
  nagMe: '/nag-mes/',
  entries: '/entries/:username?/',
  selections: '/selections/:username?/',
  races: '/races/:date?/:course?/:time?/',
  leaderboards: '/leaderboards/:type/:detail?/:extra?',
  members: '/members/:username?/',
  tipStats: '/stats/entry/pick-type/',
  proStats: '/stats/prostats/all/',
  history: '/history/:type/:nationality?/:name/',
  stats: '/stats/:statsType?/:groupBy?/:filterBy?/',
  contactUs: '/contact-us',
  serverUnavailable: '/service-unavailable',
  pageNotFound: '/page-404'
}

export default routes
