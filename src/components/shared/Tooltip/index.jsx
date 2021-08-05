import React from 'react'
import { Tooltip as TippyTip } from 'react-tippy'
import PropTypes from 'prop-types'
import 'react-tippy/dist/tippy.css'

const Tooltip = ({ children, title, ...props }) => (
  <TippyTip title={title} {...props}>
    {children}
  </TippyTip>
)

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  title: PropTypes.string.isRequired
}

export default Tooltip
