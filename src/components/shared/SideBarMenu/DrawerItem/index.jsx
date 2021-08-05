import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const DrawerItem = props => {
  const { icon, primary, to, isExternal, handleClick } = props

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef((itemProps, ref) => (
        <>
          {isExternal ? (
            <a href={to} ref={ref} {...itemProps} />
          ) : (
            <NavLink to={to} ref={ref} {...itemProps} />
          )}
        </>
      )),
    [to]
  )
  return (
    <li>
      <ListItem button component={renderLink} onClick={handleClick}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

DrawerItem.propTypes = {
  icon: PropTypes.any,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool
}

export default DrawerItem
