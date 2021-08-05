import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Link } from 'react-router-dom'
import kebabCase from 'lodash/kebabCase'
import isEmpty from 'lodash/isEmpty'

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

function selectionsTableColumns(date) {
  const classes = useLinkCellStyle()
  return [
    {
      Header: 'Horse',
      id: 'horse',
      accessor: 'horse',
      Cell: (rowData) => {
        if (!isEmpty(rowData.row.original) && rowData.row.original.horse) {
          return rowData.row.original.horse_url ? (
            <Link
              className={classes.link}
              to={rowData.row.original.horse_url.replace('/api', '')}
            >
              {rowData.row.original.horse}
            </Link>
          ) : (
            rowData.row.original.horse
          )
        }
        return '-'
      }
    },
    {
      Header: 'Time',
      id: 'time',
      accessor: 'time',
      Cell: (rowData) => {
        if (!isEmpty(rowData.row.original) && rowData.row.original.time) {
          return (
            <Link
              className={classes.link}
              to={`/races/${date}/${kebabCase(
                rowData.row.original.course_name
              )}/${rowData.row.original.time}`}
            >
              {rowData.row.original.time}
            </Link>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Course',
      id: 'course',
      accessor: 'course_name',
      Cell: (rowData) => {
        if (
          !isEmpty(rowData.row.original) &&
          rowData.row.original.course_name
        ) {
          return (
            <Link
              className={classes.link}
              to={`/races/${date}/${kebabCase(
                rowData.row.original.course_name
              )}`}
            >
              {rowData.row.original.course_name}
            </Link>
          )
        }
        return '-'
      }
    },
    {
      Header: 'Odds',
      id: 'odds',
      accessor: 'betfair_price',
      Cell: (rowData) => {
        if (!rowData.row.original.betfair_price) {
          return 'XSP'
        }
        return rowData.row.original.betfair_price
      }
    }
  ]
}
export { selectionsTableColumns }
