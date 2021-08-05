import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip
} from '@material-ui/core'
import { history } from '@store'
import {
  Person,
  ExpandMore,
  AccountCircle,
  FormatListBulleted,
  Settings,
  MoreVert
} from '@material-ui/icons'
import './Header.scss'
import SideBarMenu from '../SideBarMenu'
import { apiUrls } from '@constants/api'
import useMemberStore from '@utils/customHook/useMembersStore'
import isEmpty from 'lodash/isEmpty'
import LogoIcon from '@assets/img/header/logo.png'
import TwitterIcon from '@components/shared/icons/TwitterIcon'
import FacebookIcon from '@components/shared/icons/FacebookIcon'
import SignoutIcon from '@components/shared/icons/SignoutIcon'
import AuthSession from '@utils/session'
import dateConversations from '@utils/timeUtils'
import { DATE_DAY_TIME_YEAR_FORMAT } from '@constants/dateFormatsList'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3),
    marginBottom: '20px'
  },
  icons: {
    height: 20,
    width: 20
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: theme.palette.primary.light,
    padding: '0!important',
    minHeight: 64,
    justifyContent: 'center'
  },
  drawerPaper: {
    width: theme.drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('tablet')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('tablet')]: {
      display: 'none'
    }
  },
  avatar: {
    height: 32,
    width: 32
  },
  listitem: {
    minWidth: 40
  }
}))

const Header = () => {
  const [drawerOpenStatus, setDrawerOpenStatus] = useState(false)
  const [currentTime, setTime] = useState(new Date())
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const {
    memberStorage: { profile, hash_key }
  } = useMemberStore()
  const classes = useStyles()

  const handleDrawerToggle = () => {
    setDrawerOpenStatus(!drawerOpenStatus)
  }
  const handleLogin = () => {
    window.location = apiUrls.auth.login(window.location.origin + '/')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const logout = () => {
    handleMenuClose()
    AuthSession.logout(hash_key)
  }

  const profilePage = () => {
    handleMenuClose()
    history.push(`/members/${profile?.username}/`)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMenuOpen}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
      PaperProps={{
        style: { minWidth: 200 }
      }}
    >
      <MenuItem onClick={profilePage}>
        <ListItemIcon className={classes.listitem}>
          <Person style={{ color: '#000' }} fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Profile</Typography>
      </MenuItem>
      <MenuItem onClick={profilePage}>
        <ListItemIcon className={classes.listitem}>
          <Settings style={{ color: '#000' }} fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Settings</Typography>
      </MenuItem>
      <MenuItem onClick={logout}>
        <ListItemIcon className={classes.listitem}>
          <SignoutIcon color="#000" />
        </ListItemIcon>
        <Typography variant="inherit">Logout</Typography>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: { minWidth: 200 }
      }}
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <MenuItem href="https://twitter.com/ratingtheraces" target="_blank">
        <ListItemIcon className={classes.listitem}>
          <TwitterIcon color="#000" />
        </ListItemIcon>
        <Typography variant="inherit">Twitter</Typography>
      </MenuItem>
      <MenuItem
        href="https://www.facebook.com/RatingTheRacesDotCom"
        target="_blank"
      >
        <ListItemIcon className={classes.listitem}>
          <FacebookIcon color="#000" />
        </ListItemIcon>
        <Typography variant="inherit">Facebook</Typography>
      </MenuItem>
      {!isEmpty(profile) && !isEmpty(profile.username) ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <ListItemIcon className={classes.listitem}>
            {!isEmpty(profile.image) ? (
              <Avatar className={classes.icons} src={profile.image} />
            ) : (
              <AccountCircle
                className={classes.icons}
                style={{ color: '#000' }}
              />
            )}
          </ListItemIcon>
          <Typography variant="inherit">{profile.display_name}</Typography>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogin}>
          <ListItemIcon className={classes.listitem}>
            <AccountCircle style={{ color: '#000' }} />
          </ListItemIcon>
          <Typography variant="inherit">Log In / Sign Up</Typography>
        </MenuItem>
      )}
    </Menu>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <div className="row">
          <div className="col-xs-12 col-gutter-lr">
            <Toolbar className="row" disableGutters>
              <IconButton
                className={classes.menuButton}
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <FormatListBulleted />
              </IconButton>
              <a className={classes.logo} aria-label="logo" href="/">
                <img
                  src={LogoIcon}
                  className="rtr-logo"
                  alt="Rating The Races"
                />
              </a>
              <div className={classes.sectionDesktop}>
                <Tooltip title="Twitter" aria-label="twitter">
                  <IconButton
                    aria-label="Twitter"
                    className="rtr-icon-without-border rtr-header-icon"
                    color="inherit"
                    href="https://twitter.com/ratingtheraces"
                    target="_blank"
                  >
                    <TwitterIcon color="#fff" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Facebook" aria-label="facebook">
                  <IconButton
                    aria-label="Facebook"
                    className="rtr-icon-without-border rtr-header-icon"
                    color="inherit"
                    href="https://www.facebook.com/RatingTheRacesDotCom"
                    target="_blank"
                  >
                    <FacebookIcon color="#fff" />
                  </IconButton>
                </Tooltip>
                {!isEmpty(profile) && !isEmpty(profile.display_name) && (
                  <Tooltip title="Logout" aria-label="logout">
                    <IconButton
                      aria-label="Logout"
                      className="rtr-icon-without-border rtr-header-icon"
                      color="inherit"
                      onClick={logout}
                    >
                      <SignoutIcon color="#fff" />
                    </IconButton>
                  </Tooltip>
                )}
                {!isEmpty(profile) && !isEmpty(profile.username) ? (
                  <div className="rtr-header-account">
                    <div className="rtr-header-account-section">
                      <Typography variant="caption">
                        {profile.display_name}
                      </Typography>
                      <div className="rtr-header-account-last-loggedin">
                        {dateConversations.getFormattedDate(
                          currentTime,
                          DATE_DAY_TIME_YEAR_FORMAT
                        )}
                      </div>
                    </div>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      className="rtr-icon-without-border"
                      color="inherit"
                    >
                      {!isEmpty(profile.image) ? (
                        <Avatar
                          className={classes.avatar}
                          src={profile.image}
                        />
                      ) : (
                        <AccountCircle className={classes.avatar} />
                      )}
                      <ExpandMore />
                    </IconButton>
                  </div>
                ) : (
                  <div className="rtr-header-account">
                    <div className="rtr-header-account-section">
                      <Typography variant="caption" onClick={handleLogin}>
                        Log In / Sign Up
                      </Typography>
                      <div className="rtr-header-account-last-loggedin">
                        {dateConversations.getFormattedDate(
                          currentTime,
                          DATE_DAY_TIME_YEAR_FORMAT
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreVert />
                </IconButton>
              </div>
            </Toolbar>
          </div>
        </div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {drawerOpenStatus && (
        <SideBarMenu
          handleClose={handleDrawerToggle}
          drawerOpenStatus={drawerOpenStatus}
          profile={profile}
          logout={logout}
        />
      )}
    </div>
  )
}
export default React.memo(Header)
