/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const textFieldStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
  input: {
    color: 'black',
    fontSize: '0.7rem'
  },
  marginDense: {
    padding: 0
  }
}))

const StatsInput = ({
  value,
  label,
  type = 'text',
  handleChange,
  handleBlur,
  disabled,
  inputProps,
  name
}) => {
  const classes = textFieldStyles()
  return (
    <TextField
      id={label}
      label={label}
      className={classes.textField}
      value={value}
      onChange={(e) => handleChange(e.target.value, name)}
      onBlur={handleBlur}
      type={type}
      disabled={disabled}
      margin="none"
      size="small"
      variant="outlined"
      InputProps={{
        className: classes.input,
        ...inputProps
      }}
    />
  )
}

export default memo(StatsInput)
