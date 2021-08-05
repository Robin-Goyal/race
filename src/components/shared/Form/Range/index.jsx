import React from 'react'
import classnames from 'classnames'
import InputRange from 'react-input-range'
import PropTypes from 'prop-types'
import 'react-input-range/lib/css/index.css'

import '../Input/Input.scss'

const RangeInput = ({ value, onChange, label, className, ...props }) => {
  const wrapperClassName = classnames('form-input', className)
  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="form-input__label form-input__label--range">
          {label}
        </label>
      )}
      <div className="form-input__wrapper--range">
        <InputRange value={value} onChange={onChange} {...props} />
      </div>
    </div>
  )
}

RangeInput.defaultProps = {
  value: 0,
  onChange: () => void 0,
  minValue: 0,
  maxValue: 10
}

RangeInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string
}

export default RangeInput
