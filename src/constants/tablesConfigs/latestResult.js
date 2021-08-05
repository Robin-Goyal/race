/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import helpers from '@utils/helpers'
import classnames from 'classnames'
import {
  TIME_DEFAULT_FORMAT,
  DEFAULT_DATE_FORMAT
} from '@constants/dateFormatsList'
import kebabCase from 'lodash/kebabCase'
import dateConversations from '@utils/timeUtils'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

const header = {
  NAP: [
    {
      title: '',
      field: 'id',
      emptyValue: '-',
      render: ({ id }) => <span>{id}</span>
    },
    {
      title: 'Horse',
      field: 'horseName',
      emptyValue: '-',
      render: ({ horseName, horseURL }) =>
        horseURL ? (
          <Link className="leader-board__name" to={horseURL}>
            {horseName}
          </Link>
        ) : (
          <span>{horseName}</span>
        )
    },
    {
      title: 'Time/Course',
      field: 'timeCourse',
      emptyValue: '-',
      render: ({ timeCourse, courseSlug, startTime }) => {
        const url = `/races/${dateConversations.getFormattedUtcDate(
          startTime,
          DEFAULT_DATE_FORMAT,
          dateConversations.checkDST(startTime)
        )}/${courseSlug}/${dateConversations.getFormattedUtcDate(
          startTime,
          TIME_DEFAULT_FORMAT,
          dateConversations.checkDST(startTime)
        )}`
        return (
          <Link className="leader-board__name" to={url}>
            {timeCourse}
          </Link>
        )
      }
    },
    {
      title: 'Took XSP?',
      field: 'tookXSP',
      emptyValue: '-',
      render: ({ tookXSP }) => (
        <span>
          {tookXSP ? (
            <CheckIcon style={{ color: '#00B426', width: 18, height: 18 }} />
          ) : (
            <ClearIcon style={{ color: '#FF6565', width: 18, height: 18 }} />
          )}
        </span>
      )
    },
    {
      title: 'Price When Selected',
      field: 'priceSelected',
      emptyValue: '-',
      render: ({ priceSelected }) => <span>{priceSelected}</span>
    },
    {
      title: 'Latest Price',
      field: 'latestPrice',
      emptyValue: '-',
      render: ({ latestPrice }) => <span>{latestPrice}</span>
    },
    {
      title: 'Result',
      field: 'result',
      emptyValue: '-',
      render: ({ result }) => (
        <span
          className={classnames('leader-board__place', {
            'leader-board__place--first': result === 1,
            'leader-board__place--second': result === 2,
            'leader-board__place--third': result === 3
          })}
        >
          {result ? helpers.addOrdinalSuffix(result) : '-'}
        </span>
      )
    },
    {
      title: 'Odds Taken',
      field: 'oddsTaken',
      emptyValue: '-',
      render: ({ oddsTaken }) => <span>{oddsTaken}</span>
    },
    {
      title: 'Profit & Loss',
      field: 'profitloss',
      emptyValue: '-',
      render: ({ profitloss }) => {
        if (!profitloss) {
          return ''
        }
        return (
          <span
            className={
              profitloss
                ? parseInt(profitloss) < 0
                  ? 'negative-values'
                  : 'positive-values'
                : ''
            }
          >
            {helpers.convertToCurrency(profitloss)}
          </span>
        )
      }
    }
  ],
  selection: [
    {
      title: 'Horse',
      field: 'horse',
      render: ({ horse, horse_url }) =>
        horse ? (
          horse_url ? (
            <Link
              className="leader-board__name"
              to={horse_url.replace('/api', '')}
            >
              {horse}
            </Link>
          ) : (
            <span>{horse}</span>
          )
        ) : (
          ''
        )
    },
    {
      title: 'Time/Course',
      field: 'course_name',
      emptyValue: '-',
      render: ({ start_time, course_name }) => {
        if (start_time) {
          const url = `/races/${dateConversations.getFormattedUtcDate(
            start_time,
            DEFAULT_DATE_FORMAT,
            dateConversations.checkDST(start_time)
          )}/${kebabCase(course_name)}/${dateConversations.getFormattedUtcDate(
            start_time,
            TIME_DEFAULT_FORMAT,
            dateConversations.checkDST(start_time)
          )}`
          return (
            <Link className="leader-board__name" to={url}>
              {dateConversations.getFormattedUtcDate(
                start_time,
                TIME_DEFAULT_FORMAT,
                dateConversations.checkDST(start_time)
              )}{' '}
              {course_name}
            </Link>
          )
        }
        return <span className="bold-data">{course_name}</span>
      }
    },
    {
      title: 'Price When Selected',
      field: 'price_when_selected',
      emptyValue: '-',
      render: ({ price_when_selected }) => (
        <span
          className={parseInt(price_when_selected) < 0 ? 'negative-values' : ''}
        >
          {price_when_selected}
        </span>
      )
    },
    {
      title: 'XSP',
      field: 'xsp',
      emptyValue: '-',
      render: ({ xsp }) => (
        <span className={parseInt(xsp) < 0 ? 'negative-values' : ''}>
          {xsp}
        </span>
      )
    },
    {
      title: 'ISP',
      field: 'isp',
      emptyValue: '-',
      render: ({ isp }) => (
        <span className={parseInt(isp) < 0 ? 'negative-values' : ''}>
          {isp}
        </span>
      )
    },
    {
      title: 'Result',
      field: 'result',
      emptyValue: '-',
      render: ({ result }) => (
        <span
          className={classnames('leader-board__place', {
            'leader-board__place--first': result === 1,
            'leader-board__place--second': result === 2,
            'leader-board__place--third': result === 3
          })}
        >
          {result
            ? result.toString().indexOf('/') === -1 &&
              result.toString().indexOf('%') === -1
              ? helpers.addOrdinalSuffix(result)
              : result
            : '-'}
        </span>
      )
    }
  ]
}

const latestResultTable = {
  header
}

export default latestResultTable
