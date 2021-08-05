import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import makeStyles from '@material-ui/core/styles/makeStyles'
import dateConversations from '@utils/timeUtils'
import {
  DEFAULT_DATE_FORMAT,
  TIME_DEFAULT_FORMAT,
  WEEK_DAY_DATE_FORMAT
} from '@constants/dateFormatsList'
import kebabCase from 'lodash/kebabCase'

const useDateCellStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    padding: '0 5px'
  },
  link: {
    position: 'relative',
    color: '#11141A',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.tableLinkBackground
    },
    whiteSpace: 'nowrap',
    fontWeight: 600,
    fontFamily: '"lato", sans-serif',
    fontSize: 13
  }
}))

const DateTimeCell = ({ value, isTime, showBorder = false }) => {
  const classes = useDateCellStyles()
  if (!value || !value.start_time || !value.course) return <div>-</div>

  const parseUTCTime = dateConversations.getFormattedUtcDate(
    value.start_time,
    TIME_DEFAULT_FORMAT,
    dateConversations.checkDST(value.start_time)
  )
  const parseLocalTime = dateConversations.getLocalTime(
    value.start_time,
    TIME_DEFAULT_FORMAT
  )
  const parseUTCDate = dateConversations.getFormattedUtcDate(
    value.start_time,
    WEEK_DAY_DATE_FORMAT,
    dateConversations.checkDST(value.start_time)
  )
  const parseUTCDefaultDate = dateConversations.getFormattedUtcDate(
    value.start_time,
    DEFAULT_DATE_FORMAT,
    dateConversations.checkDST(value.start_time)
  )

  const data = isTime
    ? parseUTCTime !== parseLocalTime
      ? `${parseLocalTime} (Local time)`
      : parseUTCTime
    : parseUTCDate
  const link = isTime
    ? `/races/${parseUTCDefaultDate}/${kebabCase(
        value.course.name
      )}/${parseUTCTime}`
    : `/races/${parseUTCDefaultDate}`

  return (
    <div
      className={classes.root}
      style={showBorder ? { borderRight: '1px solid #ddd' } : null}
    >
      <Link className={classNames(classes.link)} to={link}>
        {data}
      </Link>
    </div>
  )
}

DateTimeCell.propTypes = {
  value: PropTypes.object.isRequired,
  isTime: PropTypes.bool,
  showBorder: PropTypes.bool
}
export default memo(DateTimeCell)
