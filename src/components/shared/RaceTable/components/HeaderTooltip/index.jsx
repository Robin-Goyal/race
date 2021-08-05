import React, { memo } from 'react'
import PropTypes from 'prop-types'

const HeaderTooltip = ({ label, style = {} }) => (
  <div style={style}>{label}</div>
)
HeaderTooltip.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object
}
export default memo(HeaderTooltip)
