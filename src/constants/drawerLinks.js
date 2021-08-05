import React from 'react'
import {
  PieChart,
  Home,
  CardMembership,
  ListAlt,
  TrendingUpSharp,
  CreateSharp,
  LiveHelp,
  InsertChart,
  AccountBalance,
  Book,
  PlayCircleFilled,
  Contacts
} from '@material-ui/icons'
import dateConversations from '@utils/timeUtils'

export const navLinks = [
  {
    label: 'Home',
    path: 'https://ratingtheraces.com/',
    icon: <Home />,
    isExternal: true
  },
  {
    label: 'Membership',
    path: 'https://ratingtheraces.com/membership/',
    icon: <CardMembership />,
    isExternal: true
  },
  {
    label: 'Examples',
    path: 'https://ratingtheraces.com/example-ratings/',
    icon: <LiveHelp />,
    isExternal: true
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <PieChart />,
    isExternal: false
  },
  {
    label: 'WebRatings',
    path: `/races/${dateConversations.getFormattedDate()}`,
    icon: <ListAlt />,
    isExternal: false
  },
  {
    label: 'ProStats',
    path: '/stats/prostats/all/',
    icon: <AccountBalance />,
    isExternal: false
  },
  {
    label: 'TipStats+',
    path: '/stats/entry/pick-type/',
    icon: <InsertChart />,
    isExternal: false
  },
  {
    label: 'Leaderboards',
    path: `/leaderboards/day/${dateConversations.getFormattedDate()}/`,
    icon: <TrendingUpSharp />,
    isExternal: false
  },
  {
    label: 'NagMe',
    path: '/nag-mes/',
    icon: <CreateSharp />,
    isExternal: false
  },
  {
    label: 'Blog',
    path: 'https://ratingtheraces.com/blog/',
    icon: <Book />,
    isExternal: true
  },
  {
    label: 'Videos',
    path: 'https://ratingtheraces.com/videos/',
    icon: <PlayCircleFilled />,
    isExternal: true
  },
  {
    label: 'Contact Us',
    path: 'https://ratingtheraces.com/contact-us/',
    icon: <Contacts />,
    isExternal: true
  }
]
