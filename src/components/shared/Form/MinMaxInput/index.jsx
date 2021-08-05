import React, { memo } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import isEqual from 'lodash/isEqual'

const MinMaxInput = (props) => {
  const handleChange = (event, isMin = false) => {
    if (isMin) {
      return props.onChange({
        min: +event.target.value,
        max: props.value ? props.value['max'] : ''
      })
    } else {
      return props.onChange({
        min: props.value ? props.value['min'] : '',
        max: +event.target.value
      })
    }
  }

  return (
    <>
      <TextField
        size="small"
        variant="outlined"
        type="number"
        label=""
        placeholder="Min."
        className={props.className}
        id={`${props.name}[min]`}
        name={`${props.name}[min]`}
        disabled={props.disabled}
        value={props.value ? props.value['min'] : ''}
        onChange={(e) => handleChange(e, true)}
        inputProps={{
          min: props.min,
          style: { padding: '8px 4px' }
        }}
      />
      <Typography className="filters-block__label min-max__sep">to</Typography>
      <TextField
        size="small"
        variant="outlined"
        type="number"
        placeholder="Max."
        label=""
        className={props.className}
        name={`${props.name}[max]`}
        disabled={props.disabled}
        id={`${props.name}[max]`}
        value={props.value ? props.value['max'] : ''}
        onChange={(e) => handleChange(e)}
        inputProps={{
          max: props.max,
          style: { padding: '8px 4px' }
        }}
      />
    </>
  )
}

MinMaxInput.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
}

function areEqual(prevProps, nextProps) {
  if (prevProps.value === undefined && nextProps.value === undefined) {
    return true
  }
  return isEqual(prevProps.value, nextProps.value)
}

export default memo(MinMaxInput, areEqual)
