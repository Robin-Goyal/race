/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import Table from '@material-ui/core/Table'
import helpers from '@utils/helpers'
import { makeStyles } from '@material-ui/core/styles'

const useTableStyles = makeStyles((theme) => ({
  table: {
    color: 'white'
  },
  td: {
    whiteSpace: 'nowrap',
    color: theme.palette.common.white,
    fontSize: 13,
    fontWeight: 700,
    padding: '7px 15px',
    fontFamily: '"lato", sans-serif'
  },
  th: {
    width: 95,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    fontSize: 13,
    padding: '7px 15px',
    fontWeight: 700,
    fontFamily: '"lato", sans-serif',
    color: '#FFBB00'
  }
}))

const StatsReductionTooltipTable = ({ stats, srStats }) => {
  const classes = useTableStyles()
  return (
    <Table className={classes.table}>
      <tbody>
        <tr>
          <th className={classes.th}>Average Price Reduction</th>
          <td className={classes.td}>
            {stats.value == null || isNaN(stats.value)
              ? '-'
              : `${stats.value.toFixed(2)}%`}
          </td>
        </tr>
        <tr>
          <th className={classes.th}>Price Reduced &gt;= 25%</th>
          <td className={classes.td}>
            {stats['25_percent'] == null || isNaN(stats['25_percent'])
              ? '-'
              : `${stats['25_percent'].toFixed(2)}%`}
          </td>
        </tr>
        <tr>
          <th className={classes.th}>Price Reduced &gt;= 50%</th>
          <td className={classes.td}>
            {stats['50_percent'] == null || isNaN(stats['50_percent'])
              ? '-'
              : `${stats['50_percent'].toFixed(2)}%`}
          </td>
        </tr>
        <tr>
          <th className={classes.th}>Price Reduced &gt;= 75%</th>
          <td className={classes.td}>
            {stats['75_percent'] == null || isNaN(stats['75_percent'])
              ? '-'
              : `${stats['75_percent'].toFixed(2)}%`}
          </td>
        </tr>
        <tr>
          <th className={classes.th}>Wins</th>
          <td className={classes.td}>
            {srStats.successes} / {srStats.runs} (
            {helpers.transformToPercentage(srStats.successes / srStats.runs)})
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
export default memo(StatsReductionTooltipTable)
