import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavItem = ({ children, to, ...props }) => (
  <li>
    {to ? (
      <NavLink
        exact
        to={to}
        className="header__nav-item"
        activeClassName="header__nav-item--active"
        {...props}
      >
        {children}
      </NavLink>
    ) : (
      <span className="header__nav-item" {...props}>
        {children}
      </span>
    )}
  </li>
)

NavItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  to: PropTypes.string
}

export default NavItem
