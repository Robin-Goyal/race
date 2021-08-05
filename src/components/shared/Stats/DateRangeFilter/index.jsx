import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import isEqual from 'lodash/isEqual'
import dayjs from 'dayjs'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayJsUtils from '@date-io/dayjs'
import InputAdornment from '@material-ui/core/InputAdornment'
import Event from '@material-ui/icons/Event'
import { DEFAULT_DATE_FORMAT } from '@constants/dateFormatsList'
import { makeStyles } from '@material-ui/core'
import './index.scss'

const useDateRangeFilterStyles = makeStyles(() => ({
  rootDatePicker: {
    maxWidth: '165px',
    fontSize: 13,
    fontFamily: '"Lato",sans-serif',
    boxShadow: 'none',
    borderRadius: 4,
    color: '#4d4f5c',
    padding: '5px',
    fontWeight: 900,
    margin: 0
  }
}))

const DateRangeFilter = (props) => {
  const classes = useDateRangeFilterStyles()
  const handleChange = (value, isStart = false) => {
    if (isStart) {
      return props.onChange(
        `${dayjs(value).format(DEFAULT_DATE_FORMAT)}|${
          props.value && props.value.split('|')[1] !== 'null'
            ? `${props.value.split('|')[1]}`
            : null
        }`
      )
    } else {
      return props.onChange(
        `${
          props.value && props.value.split('|')[0] !== 'null'
            ? `${props.value.split('|')[0]}`
            : null
        }|${dayjs(value).format(DEFAULT_DATE_FORMAT)}`
      )
    }
  }

  return (
    <>
      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <DatePicker
          className={`date-filter ${props.className}`}
          disableToolbar
          autoOk
          variant="dialog"
          classes={{
            root: classes.rootDatePicker
          }}
          style={{
            background: props.disabled ? '#f2f2f2' : '#fff',
            border: props.disabled ? '1px solid #e6e6e6' : '1px solid #0000003b'
          }}
          inputProps={{ readOnly: true, style: { padding: 2 } }}
          format={DEFAULT_DATE_FORMAT}
          emptyLabel="Start"
          disabled={props.disabled}
          id={`${props.name}[start]`}
          name={`${props.name}[start]`}
          value={
            props.value && props.value.split('|')[0] !== 'null'
              ? dayjs(props.value.split('|')[0])
              : null
          }
          onChange={(e) => handleChange(e, true)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Event />
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>

      <Typography className="filters-block__label min-max__sep">to</Typography>

      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <DatePicker
          className={`date-filter ${props.className}`}
          disableToolbar
          autoOk
          variant="dialog"
          classes={{
            root: classes.rootDatePicker
          }}
          style={{
            background: props.disabled ? '#f2f2f2' : '#fff',
            border: props.disabled ? '1px solid #e6e6e6' : '1px solid #0000003b'
          }}
          inputProps={{ readOnly: true, style: { padding: 2 } }}
          format={DEFAULT_DATE_FORMAT}
          emptyLabel="End"
          disabled={props.disabled}
          id={`${props.name}[end]`}
          name={`${props.name}[end]`}
          value={
            props.value && props.value.split('|')[1] !== 'null'
              ? dayjs(props.value.split('|')[1])
              : null
          }
          onChange={(e) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Event />
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  )
}

DateRangeFilter.propTypes = {
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

export default memo(DateRangeFilter, areEqual)
