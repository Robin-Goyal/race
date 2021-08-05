/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import Table from '@material-ui/core/Table'
import helpers from '@utils/helpers'
import { makeStyles } from '@material-ui/core/styles'
import ColoredValue from '@components/shared/RaceTable/components/ColoredValue'

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

const StatsTooltipTable = ({ stats, singular, plural }) => {
  const classes = useTableStyles()
  return (
    <Table className={classes.table}>
      <tbody>
        <tr>
          <th className={classes.th}>{plural}</th>
          <td className={classes.td}>
            {stats.successes} / {stats.runs} (
            {helpers.transformToPercentage(stats.successes / stats.runs)})
          </td>
        </tr>
        <tr>
          <th className={classes.th}>{singular} A/E</th>
          <td className={classes.td}>
            <ColoredValue value={stats.ae} cutoff={1} />
          </td>
        </tr>
        <tr>
          <th className={classes.th}>{singular} P & L</th>
          <td className={classes.td}>
            <ColoredValue value={stats.p_and_l} cutoff={0} />
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
export default memo(StatsTooltipTable)
