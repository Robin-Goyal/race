/* eslint-disable no-inner-declarations */
import kebabCase from 'lodash/kebabCase'
import capitalize from 'lodash/capitalize'
import Logger from '@utils/logger'
import { apiBaseUrl } from '@constants/api'
import dateConversations from '@utils/timeUtils'
import { TIME_DEFAULT_FORMAT } from '@constants/dateFormatsList'
import { ALL_COLUMNS } from '@constants/tablesConfigs/racesSettings'

function handleServerErrors(err) {
  let errors = {}
  if (err.response && err.response.data) {
    const { data } = err.response
    if (typeof data !== 'string') {
      Object.keys(data).forEach((key) => {
        errors[key] = Array.isArray(data[key])
          ? data[key].join(', ')
          : data[key]
      })
    } else {
      errors = data
    }
  }
  return errors
}

function handleFormErrors(err, cb) {
  let errors = []
  if (typeof err === 'string' && !!err.length) {
    return cb(err)
  } else {
    Object.keys(err).forEach((key) => {
      Array.isArray(err[key])
        ? errors.push(err[key].join(', '))
        : errors.push(err[key])
    })
  }
  errors.forEach((err) => cb(err))
}

function mbToBytes(mb) {
  return mb * 1048576
}

function transformToPercentage(value) {
  if (value == null || isNaN(value)) return '-'

  return `${(value * 100).toFixed(2)}%`
}

function isEmptyValue(value) {
  return value === '' || value === null || value === undefined
}

function isEmptyObject(obj) {
  return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

function convertToCurrency(val) {
  return (+val).toLocaleString(undefined, {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function transformNagme(data, horse, run_id) {
  return {
    auto_delete: data && data.auto_delete ? data.auto_delete : null,
    horse: horse || null,
    id: data && data.id ? data.id : null,
    run_id: run_id || null,
    note: data && data.note ? data.note : ''
  }
}

function cleanupEntityUrl(url) {
  return url.replace('/api', '')
}

function redirectToLoginPage(redirectUrl) {
  return (window.location = `https://ratingtheraces.com/wp-login.php?redirect_to=${redirectUrl}`)
}

function calcRemainingSpace(val = 0, noteMaxLength = 200) {
  const result = noteMaxLength - val
  return result > 0 ? result : 0
}

function createRaceDetailsData({
  course,
  distance,
  time,
  start_time,
  name,
  race_type,
  race_class,
  prize_money,
  comment_count,
  id,
  is_handicap,
  is_abandoned,
  is_first,
  is_complete,
  age_range,
  number_of_runners,
  number_of_non_runners,
  going,
  returns,
  over_round,
  place_over_round
}) {
  return {
    distance,
    race_type,
    race_class,
    prize_money,
    comment_count,
    id,
    is_handicap,
    is_abandoned,
    is_first,
    is_complete,
    age_range,
    number_of_runners,
    number_of_non_runners,
    going,
    returns,
    over_round,
    place_over_round,
    time,
    start_time,
    name,
    course
  }
}

function transformHistoryResponse(data) {
  if (data.runs) {
    const runs = data.runs.map((run) => {
      if (run.race && run.race.start_time) {
        run.race_details = run.race
      }
      return run
    })
    return { runs, ...data }
  }
  return data
}

function transformMemberDataResponse(data) {
  if (data.columns) {
    data.allColumns = ALL_COLUMNS.filter(
      (elem) =>
        data.columns.find((value) => elem.defaultValue === value) &&
        elem.defaultValue
    )
    data.activeColumns = data.allColumns.filter(
      (elem) =>
        !data.hidden_columns.find((value) => elem.defaultValue === value) &&
        elem.defaultValue
    )
    data.disabledColumns = data.allColumns.filter(
      (elem) =>
        data.disabled_columns.find((value) => elem.defaultValue === value) &&
        elem.defaultValue
    )
  }
  return data
}

function createCourseRacesData(races) {
  return races.map((race) => {
    race.comments = race.comments || []
    race.nextComment =
      race.comments &&
      race.comments.length > 0 &&
      race.comment_count > race.comments.length
        ? `${apiBaseUrl}/?page=1`
        : null
    race.previousComment = null
    return race
  })
}

function updateComments(comments) {
  return comments.map((comment) => {
    const shallowComment = { ...comment }
    shallowComment.nextReply =
      shallowComment.replies &&
      shallowComment.replies.length > 0 &&
      shallowComment.reply_count > shallowComment.replies.length
        ? `${apiBaseUrl}/?page=1`
        : null
    shallowComment.previousReply = null
    return shallowComment
  })
}

function transformNagMesResponse(response) {
  let nagsMaxNum = 0
  let numNagMes = 0
  let title = ''
  let result = []
  let totalPages = 1
  let noteMaxLength = 200
  if (response.results.length > 1) {
    result = response.results[1]
    nagsMaxNum = response.results[0].nags_max_num
    numNagMes = response.results[0].num_nag_mes
    title = response.results[0].title
    totalPages = response.results[0].total_pages
    noteMaxLength = response.results[0].note_max_length
  }
  return {
    data: result,
    nagsMaxNum: nagsMaxNum,
    numNagMes: numNagMes,
    noteMaxLength: noteMaxLength,
    total_pages: totalPages,
    title: title,
    previous: response.previous,
    next: response.next,
    count: response.count
  }
}

function transformRacesResponse(data) {
  return data.races.reduce(
    (acc, it) => {
      if (
        !acc['racesCourseNames'].some((name) => name.label === it.course.name)
      ) {
        acc['racesCourseNames'].push({
          value: kebabCase(it.course.name),
          label: it.course.name,
          actualLabel: `${it.course.name}${
            it.course.surface_abbr ? ` (${it.course.surface_abbr})` : ''
          }`
        })
      }
      if (acc['racesStartTime'][kebabCase(it.course.name)]) {
        acc['racesStartTime'][kebabCase(it.course.name)].push(it.start_time)
      } else {
        acc['racesStartTime'][kebabCase(it.course.name)] = [it.start_time]
      }
      return acc
    },
    {
      racesCourseNames: [],
      racesStartTime: {},
      selections: data.selections,
      entry: data.entry,
      races: data.races,
      early_stage: data.early_stage,
      note_max_length: data.note_max_length,
      is_entry_submitted: data.is_entry_submitted,
      is_selection_submitted: data.is_selection_submitted,
      is_example: data.is_example,
      sub_ids: data.sub_ids || []
    }
  )
}

function transformLeaderBoardResponse(data) {
  data.rows = data.rows.map((row) => {
    const shallowRow = row
    shallowRow.display_name = shallowRow.name
    shallowRow.membership = shallowRow.access
    shallowRow.twitter_screen_name = shallowRow.twitter
    return shallowRow
  })
  return data
}

function transformChartResponse(data) {
  const chartData = {}
  chartData.series = []
  if (data && data.series && data.series.length > 1) {
    const defaultName = (i) => 'field' + i
    chartData.series = data.series[2].map((series) =>
      series.reduce((r, v, i) => {
        if (data.series[1].keys[i] === 'p_and_l') {
          r['y'] = v
        }
        r[
          i < data.series[1].keys.length
            ? data.series[1].keys[i]
            : defaultName(i)
        ] = v
        return r
      }, {})
    )
  }
  return chartData
}

function transformStatsFilter(filters) {
  const chartData = {}
  chartData.series = []
  return filters.map((filter) => {
    const shallowFilter = filter
    if (
      shallowFilter.name === 'handicap' &&
      shallowFilter.type === 'BooleanFilter'
    ) {
      shallowFilter.type = 'MultiOptionFilter'
      shallowFilter.options = [
        {
          value: 1,
          label: 'Handicap'
        },
        {
          value: 0,
          label: 'Non-handicap'
        }
      ]
    }
    return shallowFilter
  })
}

function mapStatsFilters(data, activeFilters) {
  let result = activeFilters
  function setMinMaxLabel(value) {
    let label
    if (value['min'] !== '' && value['max'] !== '') {
      label = `${value['min']} - ${value['max']}`
    } else if (value['min'] !== '') {
      label = ` >= ${value['min']}`
    } else if (value['max'] !== '') {
      label = `<= ${value['max']}`
    } else {
      label = ''
    }
    return {
      value: `${value['min'] !== '' ? +value['min'] : ''}|${
        value['max'] !== '' ? +value['max'] : ''
      }`,
      label: label
    }
  }

  try {
    for (const prop in data) {
      const idx = result.findIndex((res) => res.name === prop)
      if (
        prop &&
        (data[prop]['max'] !== undefined || data[prop]['min'] !== undefined)
      ) {
        if (idx > -1) {
          const minMaxData = setMinMaxLabel(data[prop], prop)
          const innerIDX = result[idx].values.findIndex(
            (res) => res.value === minMaxData.value
          )
          if (innerIDX === -1) {
            result[idx].values.push(minMaxData)
          }
        } else {
          result.push({
            name: prop,
            values: [setMinMaxLabel(data[prop], prop)]
          })
        }
      } else if (prop && (data[prop]['id'] || data[prop]['name'])) {
        if (idx > -1) {
          const innerIDX = result[idx].values.findIndex(
            (res) => res.value === data[prop]['id']
          )
          if (innerIDX === -1) {
            result[idx].values.push({
              value: data[prop]['id'],
              label: data[prop]['name'].toString()
            })
          }
        } else {
          result.push({
            name: prop,
            values: [
              {
                value: data[prop]['id'],
                label: data[prop]['name'].toString()
              }
            ]
          })
        }
      } else if (prop && (data[prop]['label'] || data[prop]['value'])) {
        if (idx > -1) {
          const innerIDX = result[idx].values.findIndex(
            (res) => res.value === data[prop]['value']
          )
          if (innerIDX === -1) {
            result[idx].values.push({
              value: data[prop]['value'],
              label: data[prop]['label'].toString()
            })
          }
        } else {
          result.push({
            name: prop,
            values: [
              {
                value: data[prop]['value'],
                label: data[prop]['label'].toString()
              }
            ]
          })
        }
      } else {
        if (idx > -1) {
          const innerIDX = result[idx].values.findIndex(
            (res) => res.value === data[prop]
          )
          if (innerIDX === -1) {
            result[idx].values.push({
              value: data[prop],
              label: `${data[prop].split('|')[0]} - ${data[prop].split('|')[1]}`
            })
          }
        } else {
          result.push({
            name: prop,
            values: [
              {
                value: data[prop],
                label: `${data[prop].split('|')[0]} - ${
                  data[prop].split('|')[1]
                }`
              }
            ]
          })
        }
      }
    }
    return result
  } catch (e) {
    Logger.log(e)
  }
}

function transformRacesQueryCourseName(name) {
  return name
    .replace('-', ' ')
    .split(' ')
    .map((i) => capitalize(i))
    .join(' ')
}

function mapUserFilters(filter) {
  try {
    return filter.reduce((acc, current) => {
      if (current.values.length && current.values[0].value.includes('|')) {
        const data = current.values[0].value.split('|')
        acc[current.name] = {
          min: data[0],
          max: data[1],
          label: current.values[0].label || ''
        }
      }
      return acc
    }, {})
  } catch (e) {
    Logger.log(e)
    throw new Error('Wrong parameters passed to mapUserFilters helper')
  }
}

function parseUrlTime(time) {
  const [hours, minutes] = time.split(':')
  return {
    hours,
    minutes
  }
}

function addOrdinalSuffix(order) {
  if (typeof order === 'number') {
    const s = ['th', 'st', 'nd', 'rd'],
      v = order % 100
    return order + (s[(v - 20) % 10] || s[v] || s[0])
  }
  return order
}

function createSelection(run, place, date) {
  return {
    id: run.id,
    name: run.horse.name,
    nationality: run.horse.nationality,
    course: place,
    rtrRank: run.rtr_rank ? run.rtr_rank.value : null,
    time: dateConversations.getFormattedDate(date, TIME_DEFAULT_FORMAT),
    startTime: date,
    odds: run.betfair_price || 'XSP'
  }
}

function updateLikeUnlike(comments, raceId, commentId, hasUserLiked) {
  try {
    return comments.map(function f(comment) {
      const shallowComment = { ...comment }
      if (shallowComment.id === commentId) {
        return {
          ...shallowComment,
          has_current_user_liked: hasUserLiked,
          like_count: hasUserLiked
            ? shallowComment.like_count + 1
            : shallowComment.like_count - 1
        }
      }
      if (shallowComment.replies) {
        shallowComment.replies = shallowComment.replies.map(f)
      }
      return shallowComment
    })
  } catch (e) {
    Logger.log(e)
    throw new Error('Wrong parameters passed to updateLikeUnlike helper')
  }
}

function updateDeleteComment(comments, raceId, commentId) {
  try {
    let shallowComments = Array.from(comments)
    function deleteItems(array, id) {
      const shallowCommentArray = Array.from(array)
      let i = shallowCommentArray.length
      while (i--) {
        let shallowComment = { ...shallowCommentArray[i] }
        if (shallowComment.id === id) {
          shallowCommentArray.splice(i, 1)
          continue
        }
        if (shallowComment.replies) {
          shallowComment.replies = deleteItems(shallowComment.replies, id)
        }
        shallowCommentArray[i] = shallowComment
      }
      return shallowCommentArray
    }
    return deleteItems(shallowComments, commentId)
  } catch (e) {
    Logger.log(e)
    throw new Error('Wrong parameters passed to updateDeleteComment helper')
  }
}

function updateRepliedComments(
  comments,
  raceId,
  commentId,
  childComments,
  previousReply,
  nextReply,
  reply_count,
  hasReplied
) {
  try {
    return comments.map(function f(comment) {
      const shallowComment = { ...comment }
      if (shallowComment.id === commentId) {
        return {
          ...shallowComment,
          replies: shallowComment.replies.concat(childComments),
          has_current_user_replied: hasReplied
            ? true
            : shallowComment.has_current_user_replied,
          reply_count: reply_count,
          previousReply: previousReply,
          nextReply: nextReply
        }
      }
      if (shallowComment.replies) {
        shallowComment.replies = shallowComment.replies.map(f)
      }
      return shallowComment
    })
  } catch (e) {
    Logger.log(e)
    throw new Error('Wrong parameters passed to updateRepliedComments helper')
  }
}

function timeDifference(current, previous) {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current - previous

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`
  }
  if (elapsed < msPerHour) {
    const count = Math.round(elapsed / msPerMinute)
    return `${count} ${count === 1 ? 'minute' : 'minutes'} ago`
  }
  if (elapsed < msPerDay) {
    const count = Math.round(elapsed / msPerHour)
    return `${count} ${count === 1 ? 'hour' : 'hours'}  ago`
  }
  if (elapsed < msPerMonth) {
    const count = Math.round(elapsed / msPerDay)
    return `about ${count} ${count === 1 ? 'day' : 'days'} ago`
  }
  if (elapsed < msPerYear) {
    const count = Math.round(elapsed / msPerMonth)
    return `about ${count} ${count === 1 ? 'month' : 'months'} ago`
  }
  return `about ${Math.round(elapsed / msPerYear)} years ago`
}

const helpers = {
  handleServerErrors,
  handleFormErrors,
  mbToBytes,
  redirectToLoginPage,
  convertToCurrency,
  isEmptyObject,
  isEmptyValue,
  transformNagme,
  cleanupEntityUrl,
  createRaceDetailsData,
  transformHistoryResponse,
  transformMemberDataResponse,
  createCourseRacesData,
  transformRacesResponse,
  transformChartResponse,
  transformToPercentage,
  transformStatsFilter,
  transformNagMesResponse,
  transformRacesQueryCourseName,
  mapUserFilters,
  mapStatsFilters,
  calcRemainingSpace,
  addOrdinalSuffix,
  parseUrlTime,
  createSelection,
  timeDifference,
  updateLikeUnlike,
  updateComments,
  updateRepliedComments,
  updateDeleteComment,
  transformLeaderBoardResponse
}

export default helpers
