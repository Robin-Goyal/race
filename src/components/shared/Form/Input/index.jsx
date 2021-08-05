import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import './Input.scss'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({
  label,
  name,
  icon,
  className,
  type,
  labelIsPlaceholder,
  errors,
  ...props
}) => {
  const wrapperClassNames = classnames('form-input', className, {
    'form-input--labeled': labelIsPlaceholder
  })

  const inputClassNames = classnames('form-input__input', {
    'form-input__input--icon': icon
  })

  const isPasswordInput = type === 'password'
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  })
  const passwordInputType = values.showPassword ? 'text' : 'password'

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div className={wrapperClassNames}>
      <div className="form-input__wrapper">
        <TextField
          label={label || name}
          variant="outlined"
          className={inputClassNames}
          name={name}
          id={name}
          type={values.showPassword ? passwordInputType : type}
          helperText={errors}
          error={!!errors}
          InputProps={
            isPasswordInput
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              : {}
          }
          {...props}
        />

        {icon && <i className={`form-input__icon icon icon-${icon}`} />}
      </div>
    </div>
  )
}

Input.defaultProps = {
  value: '',
  onChange: () => void 0
}

Input.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.string,
  labelIsPlaceholder: PropTypes.bool
}

export default Input
