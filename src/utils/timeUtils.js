import dayjs from 'dayjs'
import moment from 'moment-timezone'
import weekdays from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isToday from 'dayjs/plugin/isToday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { DEFAULT_DATE_FORMAT } from '@constants/dateFormatsList'
import Logger from '@utils/logger'

/* Plugin for checking if date not before today */
dayjs.extend(isSameOrAfter)

dayjs.extend(weekdays)

/* Plugin for using utc,local and etc zone methods */
dayjs.extend(utc)

/* Plugin for advanced format of dayjs (for example 21STT, 7TH) */
dayjs.extend(advancedFormat)

dayjs.extend(isToday)

const DEFAULT_UTC_OFFSET = 1
const DEFAULT_TIME_ZONE_OFFSET = -60
const TIME_ZONE_DEFAULT_MESSAGE = 'Your local time'

function getRawDate(date) {
  return dayjs(date)
}

function getTimeStamp(date = new Date()) {
  return dayjs(date).unix()
}

function getRawUtcTime(date) {
  return dayjs(date).utc().utcOffset(DEFAULT_UTC_OFFSET)
}

function getFormattedDate(date, dateFormat = DEFAULT_DATE_FORMAT) {
  try {
    return dayjs(date).format(dateFormat)
  } catch (e) {
    throw new Error('Invalid Date')
  }
}

function getLocalTime(date, dateFormat = DEFAULT_DATE_FORMAT) {
  try {
    return dayjs(date).local().format(dateFormat)
  } catch (e) {
    throw new Error('Invalid Date')
  }
}

function getFormattedUtcDate(
  date,
  dateFormat = DEFAULT_DATE_FORMAT,
  utcOffset = true
) {
  try {
    return dayjs(date)
      .utc()
      .utcOffset(utcOffset ? 1 : 0)
      .format(dateFormat)
  } catch (e) {
    throw new Error('Invalid Date')
  }
}

function checkTwoDates(date1, date2) {
  try {
    const date1Formatted = getFormattedDate(date1, DEFAULT_DATE_FORMAT)
    const date2Formatted = getFormattedDate(date2, DEFAULT_DATE_FORMAT)
    return date1Formatted === date2Formatted
  } catch (e) {
    throw new Error('Invalid Date')
  }
}

function compareTwoDates(date1, date2) {
  try {
    return dayjs(dayjs(date1)).isSameOrAfter(dayjs(date2))
  } catch (e) {
    throw new Error('Invalid Date')
  }
}

function checkDST(date) {
  try {
    return moment(date).tz('Europe/London').isDST()
  } catch (e) {
    throw new Error('Invalid Date')
  }
}

function getFirstDay(date, formatDate = 'YYYY-MM-DD') {
  if (date) {
    return date.weekday(6).format(formatDate)
  }
  return dayjs().weekday(6).format(formatDate)
}

function addDate(date, periodType = DEFAULT_DATE_FORMAT, amount) {
  return dayjs(date).add(amount, periodType)
}

function substractDate(date, periodType = DEFAULT_DATE_FORMAT, amount) {
  return dayjs(date).subtract(amount, periodType)
}

function isTodayOrAfter(date) {
  const today = dayjs(new Date())
  return dayjs(date).isSameOrAfter(today)
}

function isDateToday(date) {
  return dayjs(date).isToday()
}

function isTodayDateOrAfter(checkDate, todayDate) {
  return dayjs(checkDate).isSameOrAfter(todayDate)
}

function isBeforeDate(date) {
  const today = dayjs(new Date())
  return dayjs(date).isBefore(today)
}

function getTimezoneName() {
  if (new Date().getTimezoneOffset() === DEFAULT_TIME_ZONE_OFFSET) {
    return false
  }
  if (Intl.DateTimeFormat && moment.tz.guess()) {
    try {
      return moment.tz(moment.tz.guess()).zoneAbbr()
    } catch (e) {
      Logger.error(e)
      return TIME_ZONE_DEFAULT_MESSAGE
    }
  }
}

const dateConversations = {
  substractDate,
  addDate,
  getFormattedDate,
  getFormattedUtcDate,
  checkTwoDates,
  compareTwoDates,
  checkDST,
  getFirstDay,
  getRawDate,
  getRawUtcTime,
  isTodayOrAfter,
  getLocalTime,
  isDateToday,
  isTodayDateOrAfter,
  isBeforeDate,
  getTimeStamp,
  getTimezoneName
}

export default dateConversations
