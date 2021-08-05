/* eslint-disable react/prop-types */
import React from 'react'
import { navLinks } from '@constants/drawerLinks'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PowerSettingsNew } from '@material-ui/icons'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import { isFree } from '@store/memberStore/selectors'

const SideBarMenu = ({
  handleClose,
  drawerOpenStatus,
  profile,
  history,
  logout
}) => {
  const isFreeMember = useSelector(isFree)
  return (
    <nav
      className="rtr-navbar-side"
      role="navigation"
      style={{ display: drawerOpenStatus ? 'block' : 'none' }}
    >
      <div className="rtr-navbar-side-back-root" onClick={handleClose}></div>
      <i className="arrow up"></i>
      <div
        className="menu-container"
        style={{ height: '100%', overflow: 'auto' }}
      >
        <ul className="nav" id="main-menu">
          {navLinks.map(({ label, path, icon, isExternal }) => {
            const menuClass =
              history && history.location && history.location.pathname === path
            const customLabel =
              isFreeMember && label === 'WebRatings' ? 'WebRaces' : label
            return (
              <li key={customLabel}>
                <a
                  className={`waves-effect waves-dark ${
                    menuClass ? 'active-menu' : ''
                  }`}
                  onClick={handleClose}
                  href={path}
                  target={isExternal ? '_self' : '_self'}
                >
                  {icon}
                  {customLabel}
                </a>
              </li>
            )
          })}
          {!isEmpty(profile) && !isEmpty(profile.username) && (
            <li key="logout">
              <a className="waves-effect waves-dark" onClick={logout}>
                <PowerSettingsNew />
                Log Out
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

SideBarMenu.propTypes = {
  handleClose: PropTypes.func.isRequired,
  drawerOpenStatus: PropTypes.bool.isRequired
}

export default withRouter(SideBarMenu)
