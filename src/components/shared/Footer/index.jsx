import React from 'react'
import LinkCore from '@material-ui/core/Link'
import { Link } from 'react-router-dom'
import routes from '@constants/routes'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.light,
    minHeight: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  copyright: {
    padding: 0,
    paddingBottom: 10,
    color: '#fff'
  },
  staticLinks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    color: '#fff'
  }
}))

const Footer = () => {
  const classes = useStyles()

  const currentYear = new Date().getFullYear()

  return (
    <footer className={classes.footer}>
      <div className="row center-md" style={{ justifyContent: 'center' }}>
        <div className="col-xs-12" style={{ paddingBottom: 5 }}>
          <div className="row center-md">
            <div className={classes.staticLinks}>
              <Typography variant="body1" style={{ marginRight: 20 }}>
                <LinkCore
                  href="https://ratingtheraces.com/terms-and-conditions/"
                  color="inherit"
                >
                  Terms and Conditions
                </LinkCore>
              </Typography>
              <Typography>
                <Link
                  className="MuiLink-underlineHover"
                  to={routes.napCompetition}
                  style={{ color: 'inherit' }}
                >
                  NAP Competition Rules and T&C
                </Link>
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.copyright}>
          <Typography variant="body1">
            Copyright © {currentYear} RatingTheRaces
          </Typography>
        </div>
      </div>
    </footer>
  )
}

export default Footer
