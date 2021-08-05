import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import './Textarea.scss'
import TextField from '@material-ui/core/TextField'

const Textarea = ({ label, className, ...props }) => {
  const wrapperClassName = classnames('form-textarea', className)
  return (
    <div className={wrapperClassName}>
      <div className="form-textarea__wrapper">
        <TextField
          error={props.error}
          id="outlined-multiline-flexible"
          label={label}
          multiline
          rowsMax="15"
          variant="outlined"
          className="form-textarea__field"
          {...props}
        />
      </div>
    </div>
  )
}

Textarea.defaultProps = {
  value: '',
  onChange: () => null
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string
}

export default Textarea
