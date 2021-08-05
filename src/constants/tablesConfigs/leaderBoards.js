/* eslint-disable react/prop-types */
import React from 'react'
import helpers from '@utils/helpers'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import dateConversations from '@utils/timeUtils'
import {
  DEFAULT_DATE_FORMAT,
  TIME_DEFAULT_FORMAT
} from '@constants/dateFormatsList'
import PLCell from '@components/shared/RaceTable/components/PLCell'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

function header(
  columnType,
  type,
  displayName,
  isDetailPage,
  loggedIn,
  isToday
) {
  if (columnType === 'timeTable') {
    const data = [
      {
        title: 'Position',
        field: 'rank',
        emptyValue: '-',
        render: ({ rank }) => (
          <span
            className={classnames('leader-board__place', {
              'leader-board__place--first': rank === 1,
              'leader-board__place--second': rank === 2,
              'leader-board__place--third': rank === 3
            })}
          >
            {helpers.addOrdinalSuffix(rank)}
          </span>
        )
      },
      {
        field: 'display_name',
        title: 'Name',
        emptyValue: '-',
        render: ({ name, url }) => (
          <span className="leader-board__name">
            {loggedIn ? (
              <Link
                to={url.replace('/api', '')}
                style={{
                  color: '#4db6ac',
                  textDecoration: 'none'
                }}
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </span>
        )
      }
    ]
    if (type !== 'day' || !isToday) {
      data.push({
        field: 'p_and_l',
        title: `${displayName} P/L`,
        emptyValue: '-',
        render: ({ p_and_l }) => (
          <span
            className={
              p_and_l
                ? parseInt(p_and_l) < 0
                  ? 'negative-values leader-board__pl'
                  : 'positive-values leader-board__pl'
                : 'leader-board__pl'
            }
          >
            {helpers.convertToCurrency(p_and_l)}
          </span>
        )
      })
    }
    data.push({
      field: 'p_and_l_today',
      title: 'Today P/L',
      emptyValue: '-',
      render: (rowData) => (
        <PLCell
          className={
            rowData.p_and_l_today
              ? parseInt(rowData.p_and_l_today) < 0
                ? 'negative-values leader-board__pltoday'
                : 'positive-values leader-board__pltoday'
              : 'leader-board__pltoday'
          }
          value={helpers.convertToCurrency(rowData.p_and_l_today)}
          rowData={rowData}
        />
      )
    })
    data.push({
      field: 'num_entries',
      title: 'Times Played',
      emptyValue: '-',
      render: ({ num_entries }) => (
        <span className="leader-board__times">{num_entries}</span>
      )
    })
    return data
  } else if (columnType === 'raceTypesTable') {
    return [
      {
        title: 'Rank by Type',
        field: 'rank',
        emptyValue: '-',
        render: ({ rank, is_dead_heat }) => {
          if (!rank) {
            return '-'
          }
          return (
            <>
              <span>{helpers.addOrdinalSuffix(rank)}</span>
              {is_dead_heat && <div style={{ fontSize: 12 }}>DH</div>}
            </>
          )
        }
      },
      {
        field: 'display_name',
        title: isDetailPage ? 'Name' : 'Race Type',
        emptyValue: '-',
        render: ({ name, url }) => (
          <span className="leader-board__name">
            {loggedIn ? (
              <Link
                to={url.replace('/api', '')}
                style={{
                  color: '#4db6ac',
                  textDecoration: 'none'
                }}
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </span>
        )
      },
      {
        field: 'p_and_l',
        title: 'P/L',
        emptyValue: '-',
        render: ({ p_and_l }) => (
          <span
            className={
              p_and_l
                ? parseInt(p_and_l) < 0
                  ? 'negative-values'
                  : 'positive-values'
                : ''
            }
          >
            {helpers.convertToCurrency(p_and_l)}
          </span>
        )
      },
      {
        field: 'p_and_l_today',
        title: 'Today P/L',
        emptyValue: '-',
        render: (rowData) => (
          <PLCell
            className={
              rowData.p_and_l_today
                ? parseInt(rowData.p_and_l_today) < 0
                  ? 'negative-values leader-board__pltoday'
                  : 'positive-values leader-board__pltoday'
                : 'leader-board__pltoday'
            }
            value={helpers.convertToCurrency(rowData.p_and_l_today)}
            rowData={rowData}
          />
        )
      },
      {
        field: 'num_entries',
        title: 'Times Played',
        emptyValue: '-',
        render: ({ num_entries }) => {
          if (!num_entries) {
            return '-'
          }
          return <span className="leader-board__times">{num_entries}</span>
        }
      }
    ]
  } else if (columnType === 'courses') {
    return [
      {
        title: 'Rank by Course',
        field: 'rank',
        emptyValue: '-',
        render: ({ rank, is_dead_heat }) => {
          if (!rank) {
            return '-'
          }
          return (
            <>
              <span>{helpers.addOrdinalSuffix(rank)}</span>
              {is_dead_heat && <div style={{ fontSize: 12 }}>DH</div>}
            </>
          )
        }
      },
      {
        field: 'display_name',
        title: isDetailPage ? 'Name' : 'Course Name',
        emptyValue: '-',
        render: ({ name, url }) => (
          <span className="leader-board__name">
            {loggedIn ? (
              <Link
                to={url.replace('/api', '')}
                style={{
                  color: '#4db6ac',
                  textDecoration: 'none'
                }}
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </span>
        )
      },
      {
        field: 'p_and_l',
        title: 'P/L',
        emptyValue: '-',
        render: ({ p_and_l }) => (
          <span
            className={
              p_and_l
                ? parseInt(p_and_l) < 0
                  ? 'negative-values'
                  : 'positive-values'
                : ''
            }
          >
            {helpers.convertToCurrency(p_and_l)}
          </span>
        )
      },
      {
        field: 'p_and_l_today',
        title: 'Today P/L',
        emptyValue: '-',
        render: (rowData) => (
          <PLCell
            className={
              rowData.p_and_l_today
                ? parseInt(rowData.p_and_l_today) < 0
                  ? 'negative-values leader-board__pltoday'
                  : 'positive-values leader-board__pltoday'
                : 'leader-board__pltoday'
            }
            value={helpers.convertToCurrency(rowData.p_and_l_today)}
            rowData={rowData}
          />
        )
      },
      {
        field: 'num_entries',
        title: 'Times Played',
        emptyValue: '-',
        render: ({ num_entries }) => {
          if (!num_entries) {
            return '-'
          }
          return <span className="leader-board__times">{num_entries}</span>
        }
      }
    ]
  } else if (columnType === 'events') {
    return [
      {
        title: 'Rank by Event',
        field: 'rank',
        emptyValue: '-',
        render: ({ rank, is_dead_heat }) => {
          if (!rank) {
            return '-'
          }
          return (
            <>
              <span>{helpers.addOrdinalSuffix(rank)}</span>
              {is_dead_heat && <div style={{ fontSize: 12 }}>DH</div>}
            </>
          )
        }
      },
      {
        field: 'display_name',
        title: isDetailPage ? 'Name' : 'Event Name',
        emptyValue: '-',
        render: ({ name, url }) => (
          <span className="leader-board__name">
            {loggedIn ? (
              <Link
                to={url.replace('/api', '')}
                style={{
                  color: '#4db6ac',
                  textDecoration: 'none'
                }}
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </span>
        )
      },
      {
        field: 'p_and_l',
        title: 'P/L',
        emptyValue: '-',
        render: ({ p_and_l }) => (
          <span
            className={
              p_and_l
                ? parseInt(p_and_l) < 0
                  ? 'negative-values'
                  : 'positive-values'
                : ''
            }
          >
            {helpers.convertToCurrency(p_and_l)}
          </span>
        )
      },
      {
        field: 'p_and_l_today',
        title: 'Today P/L',
        emptyValue: '-',
        render: (rowData) => (
          <PLCell
            className={
              rowData.p_and_l_today
                ? parseInt(rowData.p_and_l_today) < 0
                  ? 'negative-values leader-board__pltoday'
                  : 'positive-values leader-board__pltoday'
                : 'leader-board__pltoday'
            }
            value={helpers.convertToCurrency(rowData.p_and_l_today)}
            rowData={rowData}
          />
        )
      },
      {
        field: 'num_entries',
        title: 'Times Played',
        emptyValue: '-',
        render: ({ num_entries }) => {
          if (!num_entries) {
            return '-'
          }
          return <span className="leader-board__times">{num_entries}</span>
        }
      }
    ]
  } else if (columnType === 'admin') {
    const data = [
      {
        title: 'Membership',
        field: 'membership',
        emptyValue: '-'
      },
      {
        title: 'Twitter Handle',
        field: 'twitter_screen_name',
        emptyValue: '-',
        render: ({ twitter }) =>
          twitter ? (
            <a
              className="leader-board__twitter-handle"
              rel="noreferrer"
              target="_blank"
              href={`https://twitter.com/${twitter}`}
            >
              @{twitter}
            </a>
          ) : null
      }
    ]
    if (type !== 'courses' && type !== 'race-types' && type !== 'events') {
      data.push(
        {
          title: 'Date Last Played',
          field: 'last_played',
          emptyValue: '-'
        },
        {
          title: 'Period Winners',
          field: 'period_wins',
          emptyValue: '-'
        },
        {
          title: 'Position Changes',
          field: 'position',
          emptyValue: '-'
        }
      )
    }
    return data
  }
}
const tableOptions = {
  cellStyle: {
    textAlign: 'center'
  }
}

function napEntriesTableColumns() {
  return [
    {
      Header: () => null,
      id: 'id',
      accessor: 'id'
    },
    {
      Header: 'Horse',
      id: 'horse',
      accessor: 'horseName',
      Cell: (rowData) => {
        if (rowData.row.original.horseName) {
          return (
            <Link
              style={{
                fontWeight: 600,
                fontFamily: '"lato", sans-serif',
                fontSize: 13,
                color: '#4db6ac',
                textDecoration: 'none'
              }}
              to={rowData.row.original.data.horse_url.replace('/api', '')}
            >
              {rowData.row.original.horseName}
            </Link>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Time/Course',
      id: 'time_course',
      accessor: 'timeCourse',
      Cell: (rowData) => {
        if (rowData.row.original.timeCourse) {
          const time = dateConversations.getFormattedUtcDate(
            rowData.row.original.data.start_time,
            TIME_DEFAULT_FORMAT,
            dateConversations.checkDST(rowData.row.original.data.start_time)
          )
          const date = dateConversations.getFormattedUtcDate(
            rowData.row.original.data.start_time,
            DEFAULT_DATE_FORMAT,
            dateConversations.checkDST(rowData.row.original.data.start_time)
          )
          return (
            <Link
              style={{
                fontWeight: 600,
                fontFamily: '"lato", sans-serif',
                fontSize: 13,
                color: '#4db6ac',
                textDecoration: 'none'
              }}
              to={`/races/${date}/${rowData.row.original.data.course_slug}/${time}`}
            >
              {rowData.row.original.timeCourse}
            </Link>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Took XSP?',
      id: 'is_xsp',
      accessor: 'tookXSP',
      Cell: (rowData) => (
        <span>
          {rowData.row.original.tookXSP ? (
            <CheckIcon style={{ color: '#00B426', width: 18, height: 18 }} />
          ) : (
            <ClearIcon style={{ color: '#FF6565', width: 18, height: 18 }} />
          )}
        </span>
      )
    },
    {
      Header: 'Price When Selected',
      id: 'price',
      accessor: 'priceSelected',
      Cell: (rowData) => {
        if (rowData.row.original.priceSelected) {
          return rowData.row.original.priceSelected
        }
        return 'N/A'
      }
    },
    {
      Header: 'Latest Price',
      id: 'latest_price',
      accessor: 'latestPrice',
      Cell: (rowData) => {
        if (rowData.row.original.latestPrice) {
          return rowData.row.original.latestPrice
        }
        return 'N/A'
      }
    },
    {
      Header: 'Result',
      id: 'result',
      accessor: 'result',
      Cell: (rowData) => {
        if (rowData.row.original.result) {
          return (
            <span
              className={classnames('leader-board__place', {
                'leader-board__place--first': rowData.row.original.result === 1,
                'leader-board__place--second':
                  rowData.row.original.result === 2,
                'leader-board__place--third': rowData.row.original.result === 3
              })}
            >
              {helpers.addOrdinalSuffix(rowData.row.original.result)}
            </span>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Odds Taken',
      id: 'odds_taken',
      accessor: 'oddsTaken',
      Cell: (rowData) => {
        if (!rowData.row.original.oddsTaken) {
          return '-'
        }
        return rowData.row.original.oddsTaken
      }
    },
    {
      Header: 'Profit & Loss',
      id: 'profit_loss',
      accessor: 'profitloss',
      Cell: (rowData) => {
        if (!rowData.row.original.profitloss) {
          return '-'
        }
        return (
          <span
            style={{
              color:
                parseInt(rowData.row.original.profitloss) < 0 ? 'red' : 'green'
            }}
          >
            {helpers.convertToCurrency(rowData.row.original.profitloss)}
          </span>
        )
      }
    }
  ]
}

const leaderBoardsTable = {
  header,
  tableOptions,
  napEntriesTableColumns
}

export default leaderBoardsTable
