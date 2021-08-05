import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayJsUtils from '@date-io/dayjs'
import { DATEPICKER_DATE_FORMAT } from '@constants/dateFormatsList'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import Event from '@material-ui/icons/Event'
import './datepicker.scss'

const useCustomDatePickerStyles = makeStyles(() => ({
  rootDatePicker: {
    maxWidth: '165px',
    fontSize: 13,
    fontFamily: '"Lato",sans-serif',
    boxShadow: '0 2px 3px rgba(0,0,0,.05)',
    border: '1px solid #d7dae2',
    borderRadius: 4,
    color: '#4d4f5c',
    padding: '5px',
    background: '#fff',
    fontWeight: 900,
    margin: 0
  }
}))
const CustomDatePicker = ({
  disabled = false,
  date = new Date(),
  handleDateChange,
  dateFormat = DATEPICKER_DATE_FORMAT,
  maxWidth = '150px'
}) => {
  const classes = useCustomDatePickerStyles(maxWidth)
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <DatePicker
        className="date-filter"
        disableToolbar
        autoOk
        variant="dialog"
        showTodayButton
        classes={{
          root: classes.rootDatePicker
        }}
        inputProps={{ readOnly: true }}
        disabled={disabled}
        format={dateFormat}
        margin="normal"
        id="date-picker-inline"
        value={date}
        onChange={handleDateChange}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <Event />
            </InputAdornment>
          )
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
CustomDatePicker.propTypes = {
  date: PropTypes.object,
  disabled: PropTypes.bool,
  dateFormat: PropTypes.string,
  maxWidth: PropTypes.string,
  handleDateChange: PropTypes.func.isRequired
}
export default CustomDatePicker
