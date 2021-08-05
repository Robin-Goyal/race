import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import './Radio.scss'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const RadioButton = ({ label, checked, className, ...props }) => {
  const wrapperClassName = classnames('form-radio', className)
  return (
    <div className={wrapperClassName}>
      <label className="form-radio__wrapper">
        <FormControlLabel
          value="male"
          control={<Radio />}
          label={label}
          className="form-radio__input"
          type="radio"
          checked={checked}
          {...props}
        />
      </label>
    </div>
  )
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  label: PropTypes.string
}

export default React.memo(RadioButton)
