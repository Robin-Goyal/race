// import { createMuiTheme } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import lightBlue from '@material-ui/core/colors/lightBlue'

const FONT_FAMILY_DEFAULT = "'Lato', sans-serif"
const FONT_FAMILY_HEADING = "'Lato', sans-serif"
const BRAND_COLOR = '#009688'

export const theme = createTheme({
  drawerWidth: 240,
  palette: {
    primary: teal,
    secondary: lightBlue,
    primaryColor: BRAND_COLOR,
    fontFamily: FONT_FAMILY_DEFAULT,
    tableRowHoverColor: 'rgb(103, 199, 251)',
    common: {
      black: 'rgba(0, 0, 0, 1)',
      white: 'rgba(255, 255, 255, 1)',
      text: '#001737'
    },
    contest: {
      firstPlace: 'rgb(255, 215, 0)',
      secondPlace: 'rgb(192, 192, 192)',
      thirdPlace: 'rgb(156, 100, 33)'
    },
    tableLinkBackground: 'rgb(77, 182, 172, 0.98)',
    // E.g. Gains and losses
    positiveValue: 'rgb(15, 189, 15)',
    negativeValue: 'red',
    activeNapButton: 'rgb(238 119 0)',
    // E.g. up-votes and down-votes.
    positiveValueBackground: 'rgba(50, 200, 50, 0.35)',
    negativeValueBackground: 'rgba(200, 50, 50, 0.25)',
    noValueBackground: 'rgba(70, 70, 70, 0.3)',

    faIconButton: 'rgba(0, 0, 0, 0.54)',
    faIcon: 'black',

    // Trophy colours
    tin: '#F8696B',
    copper: '#F8696B',
    bronze: '#CD7F32',
    silver: 'rgba(192, 192, 192, 1)',
    gold: '#FFD700',
    platinum: 'rgb(185, 186, 255)',

    adminText: 'yellow',
    adminBackground: 'yellow'
  },
  typography: {
    useNextVariants: true,
    fontFamily: FONT_FAMILY_DEFAULT,

    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '1.4rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem'
      }
    },
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '1.4rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem'
      }
    },
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '1.4rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem'
      }
    },
    h4: { fontFamily: FONT_FAMILY_HEADING },
    h5: { fontFamily: FONT_FAMILY_HEADING },
    h6: { fontFamily: FONT_FAMILY_HEADING },
    subtitle1: { fontFamily: FONT_FAMILY_HEADING },
    subtitle2: { fontFamily: FONT_FAMILY_HEADING },
    body2: { fontFamily: FONT_FAMILY_DEFAULT },
    body1: { fontFamily: FONT_FAMILY_DEFAULT },
    caption: {
      fontFamily: FONT_FAMILY_DEFAULT,
      fontSize: '0.8rem',
      '@media (min-width:15000px)': {
        fontSize: '1rem'
      }
    },
    button: { fontFamily: FONT_FAMILY_DEFAULT }
  },
  overrides: {
    MuiExpansionPanelDetails: {
      root: {
        padding: 0
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        backgroundColor: teal[300],
        color: '#fff'
      }
    },
    MuiToggleButton: {
      root: {
        borderColor: teal[300],
        color: '#000',
        '&:hover': {
          backgroundColor: teal[300],
          color: '#fff'
        },
        '&$selected': {
          backgroundColor: teal[300],
          color: '#fff',
          '&:hover': {
            backgroundColor: teal[300]
          }
        }
      }
    }
  },
  zIndex: {},
  breakpoints: {
    values: {
      tablet: 640,
      laptop: 1024,
      desktop: 1280
    }
  }
})
