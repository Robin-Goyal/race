import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage
} from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core'
import { DATEPICKER_DATE_FORMAT } from '@constants/dateFormatsList'
import CustomDatePicker from '@components/shared/CustomDatePicker'

const useDateFilterStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: 18,
    height: 18
  },
  date: {
    display: 'inline-block',
    textTransform: 'capitalize',
    padding: '0 10px',
    width: 'auto',
    height: 24,
    minWidth: 30,
    fontSize: 13,
    fontFamily: '"lato",sans-serif',
    boxShadow: '0 2px 3px rgba(0,0,0,.05)',
    border: '1px solid #d7dae2',
    borderRadius: 4,
    color: '#4d4f5c',
    background: '#fff',
    fontWeight: 900,
    lineHeight: 1.85
  },
  button: {
    minWidth: 30,
    width: 30,
    height: 26,
    padding: 0,
    fontSize: 13,
    fontFamily: '"lato",sans-serif',
    boxShadow: '0 2px 3px rgba(0,0,0,.05)',
    border: '1px solid #d7dae2',
    borderRadius: 4,
    color: '#4d4f5c',
    background: '#fff',
    fontWeight: 900,
    textTransform: 'none'
  }
}))

const DateFilter = ({
  date,
  dateType = 'day',
  dateFormat = DATEPICKER_DATE_FORMAT,
  handleAddDate,
  handleSubstDate,
  isWeeklyToggle = false,
  isLoading,
  handleBackwardWeek = () => ({}),
  handleForwardWeek = () => ({}),
  isDataPicker = false,
  handleDateChange
}) => {
  const classes = useDateFilterStyles()
  /* Added spans for preventing error from Tooltip when Buttons disable */
  return (
    <div className={classes.root}>
      {isWeeklyToggle && (
        <Tooltip title={'One week backward'}>
          <Button
            type="button"
            color="primary"
            size="small"
            disabled={isLoading}
            className={classes.button}
            onClick={handleBackwardWeek}
          >
            <FirstPage className={classes.icon} />
          </Button>
        </Tooltip>
      )}
      <Tooltip title={`One ${dateType} backward`}>
        <Button
          type="button"
          color="primary"
          size="small"
          disabled={isLoading}
          className={classes.button}
          onClick={handleSubstDate}
        >
          <ChevronLeft className={classes.icon} />
        </Button>
      </Tooltip>
      {isDataPicker && date ? (
        <CustomDatePicker
          date={date}
          disabled={isLoading}
          handleDateChange={handleDateChange}
        />
      ) : (
        <Typography variant="button" className={classes.date}>
          {date && date.format(dateFormat)}
        </Typography>
      )}
      <Tooltip title={`One ${dateType} forward`}>
        <Button
          type="button"
          color="primary"
          size="small"
          disabled={isLoading}
          className={classes.button}
          onClick={handleAddDate}
        >
          <ChevronRight className={classes.icon} />
        </Button>
      </Tooltip>
      {isWeeklyToggle && (
        <Tooltip title={'One week forward'}>
          <Button
            type="button"
            color="primary"
            size="small"
            disabled={isLoading}
            className={classes.button}
            onClick={handleForwardWeek}
          >
            <LastPage className={classes.icon} />
          </Button>
        </Tooltip>
      )}
    </div>
  )
}
DateFilter.propTypes = {
  dateState: PropTypes.object,
  date: PropTypes.object,
  dateType: PropTypes.string,
  handleAddDate: PropTypes.func.isRequired,
  handleSubstDate: PropTypes.func.isRequired,
  handleBackwardWeek: PropTypes.func,
  handleForwardWeek: PropTypes.func,
  isWeeklyToggle: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDataPicker: PropTypes.bool,
  dateFormat: PropTypes.string,
  handleDateChange: PropTypes.func
}
export default React.memo(DateFilter)
