import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withTheme } from '@material-ui/core/styles'

import './Checkbox.scss'

const CheckboxField = ({ label, checked, className, ...props }) => {
  const wrapperClassName = classnames('form-checkbox', className)
  return (
    <div className={wrapperClassName}>
      <FormControlLabel
        className="form-checkbox__wrapper"
        control={
          <Checkbox
            className="form-checkbox__input"
            type="checkbox"
            color="primary"
            checked={checked}
            inputProps={{ 'aria-label': 'disabled checked checkbox' }}
            {...props}
          />
        }
        label={label}
      />
    </div>
  )
}

CheckboxField.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  className: PropTypes.bool
}

export default React.memo(withTheme(CheckboxField))
