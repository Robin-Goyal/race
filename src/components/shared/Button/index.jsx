import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({
  icon,
  children,
  className,
  type,
  outline,
  fluid,
  disabled,
  onClick,
  to,
  ...props
}) => {
  // eslint-disable-next-line react/destructuring-assignment
  let Element = to ? Link : 'button'

  // eslint-disable-next-line react/destructuring-assignment
  if (props.href) {
    Element = 'a'
  }

  return (
    <Element
      className={classnames('btn', className, {
        'btn--fluid': fluid,
        'btn--outline': outline,
        'btn--icon': icon
      })}
      type={type}
      onClick={onClick || void 0}
      disabled={disabled}
      to={to}
      {...props}
    >
      {icon ? <i className={`icon icon-${icon}`} /> : children}
    </Element>
  )
}

Button.defaultProps = {
  outline: false,
  children: null,
  icon: null,
  to: null,
  className: '',
  type: 'button',
  href: null,
  title: null,
  disabled: false,
  fluid: false,
  target: null
}

Button.propTypes = {
  outline: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  icon: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  href: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  target: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
