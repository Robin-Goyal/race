import React from 'react'
import PropTypes from 'prop-types'

import './Thumbnail.scss'

const Thumbnail = ({ src, className, style, ...props }) => (
  <div
    role="image"
    aria-label="thumbnail"
    className={`thumbnail ${className || ''}`}
    style={{ backgroundImage: `url(${src})`, ...style }}
    {...props}
  />
)

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.any
}

export default Thumbnail
