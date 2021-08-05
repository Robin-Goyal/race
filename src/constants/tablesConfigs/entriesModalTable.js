import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import isEmpty from 'lodash/isEmpty'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Link } from 'react-router-dom'
import kebabCase from 'lodash/kebabCase'
import helpers from '@utils/helpers'

const useLinkCellStyle = makeStyles((theme) => ({
  link: {
    color: '#11141A',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.tableLinkBackground
    },
    fontWeight: 600,
    fontFamily: '"lato", sans-serif',
    fontSize: 13
  }
}))

function entriesTableColumns(
  values = {},
  handleChangeXsp = () => ({}),
  isNapEntered,
  date
) {
  const classes = useLinkCellStyle()
  return [
    {
      Header: () => null,
      id: 'id',
      accessor: 'id'
    },
    {
      Header: 'Horse',
      id: 'horse',
      accessor: 'data.horse.name',
      Cell: (rowData) => {
        if (
          !isEmpty(rowData.row.original.data) &&
          rowData.row.original.data.horse
        ) {
          return (
            <Link
              className={classes.link}
              to={rowData.row.original.data.horse.url.replace('/api', '')}
            >
              {rowData.row.original.data.horse.name}
            </Link>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Time',
      id: 'time',
      accessor: 'data.time',
      Cell: (rowData) => {
        if (
          !isEmpty(rowData.row.original.data) &&
          rowData.row.original.data.time
        ) {
          return (
            <Link
              className={classes.link}
              to={`/races/${date}/${kebabCase(
                rowData.row.original.data.course_name
              )}/${rowData.row.original.data.time}`}
            >
              {rowData.row.original.data.time}
            </Link>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Course',
      id: 'course',
      accessor: 'data.course_name',
      Cell: (rowData) => {
        if (
          !isEmpty(rowData.row.original.data) &&
          rowData.row.original.data.course_name
        ) {
          return (
            <Link
              className={classes.link}
              to={`/races/${date}/${kebabCase(
                rowData.row.original.data.course_name
              )}`}
            >
              {rowData.row.original.data.course_name}
            </Link>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Take XSP?',
      id: 'is_xsp',
      Cell: (rowData) =>
        !isEmpty(rowData.row.original.data) ? (
          <Checkbox
            size="small"
            color="primary"
            disabled={rowData.row.original.force_bfsp || isNapEntered}
            checked={values[rowData.row.original.checkName]}
            onChange={() =>
              handleChangeXsp(
                rowData.row.original.checkName,
                !values[rowData.row.original.checkName]
              )
            }
          />
        ) : (
          '-'
        )
    },
    {
      Header: 'Price when selected',
      id: 'price',
      accessor: 'data.win_price.value',
      Cell: (rowData) => {
        if (
          !isEmpty(rowData.row.original.data) &&
          rowData.row.original.data.win_price
        ) {
          return rowData.row.original.data.win_price.value
        }
        return '-'
      }
    },
    {
      Header: 'Odds Taken',
      id: 'odds_taken',
      Cell: (rowData) => {
        if (isEmpty(rowData.row.original.data)) {
          return '-'
        }
        return (rowData.row.original.force_bfsp ||
          values[rowData.row.original.checkName]) &&
          rowData.row.original.data.win_price
          ? 'XSP'
          : rowData.row.original.data.win_price.value
      }
    },
    {
      Header: 'Result',
      id: 'result',
      accessor: 'data.result.value',
      Cell: (rowData) => {
        if (
          !isEmpty(rowData.row.original.data) &&
          rowData.row.original.data.result &&
          rowData.row.original.data.result.value
        ) {
          return helpers.addOrdinalSuffix(
            rowData.row.original.data.result.value
          )
        }
        return '-'
      }
    }
  ]
}
export { entriesTableColumns }
