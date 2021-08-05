import React from 'react'
import PropTypes from 'prop-types'

import './Switch.scss'

const SwitchButton = ({ isChecked, onChange }) => {
  const handleChange = e => {
    e.preventDefault()
    onChange && onChange()
  }

  return (
    <label className="form-switch">
      <input
        key={isChecked}
        type="checkbox"
        checked={isChecked}
        onChange={e => e.preventDefault()}
        onClick={handleChange}
      />
      <span className="form-switch__slider" />
    </label>
  )
}

SwitchButton.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SwitchButton
