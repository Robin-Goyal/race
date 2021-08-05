import React, { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import './index.scss'

const useHorseNapTooltipStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textDecoration: 'underline',
    letterSpacing: 1.21,
    textTransform: 'uppercase',
    background: '#0F1827',
    padding: 15,
    fontFamily: '"lato", sans-serif',
    fontWeight: 'normal',
    fontSize: 13
  },
  table: {
    color: theme.palette.common.white
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
    width: 175,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    fontSize: 13,
    padding: '7px 15px',
    fontWeight: 700,
    fontFamily: '"lato", sans-serif',
    color: '#FFBB00'
  }
}))
const HorseNapTooltip = ({ data }) => {
  const classes = useHorseNapTooltipStyles()
  return (
    <>
      <Typography className={classes.title} variant="subtitle1" display="block">
        NAP Competition
      </Typography>
      <Table className={classes.table}>
        <tbody>
          <tr>
            <th className={classes.th}>Number of times picked today:</th>
            <td className={classes.td}>{data.num_picks}</td>
          </tr>
        </tbody>
      </Table>
      <Typography className={classes.title} variant="subtitle1" display="block">
        Player NAP Statistics
      </Typography>
      <Table className={classes.table}>
        <tbody>
          <tr>
            <th className={classes.th}>Average picks:</th>
            <td
              className={classes.td}
              style={
                data.average_picks
                  ? parseInt(data.average_picks) < 0
                    ? { color: 'red' }
                    : { color: 'green' }
                  : null
              }
            >
              {data.average_picks}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Average strike rate:</th>
            <td
              className={classes.td}
              style={
                data.average.sr
                  ? parseInt(data.average.sr) < 0
                    ? { color: 'red' }
                    : { color: 'green' }
                  : null
              }
            >
              {data.average.sr || 0}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Average all time P&L:</th>
            <td
              className={classes.td}
              style={
                data.average.p_and_l
                  ? parseInt(data.average.p_and_l) < 0
                    ? { color: 'red' }
                    : { color: 'green' }
                  : null
              }
            >
              {data.average.p_and_l || 0}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Average all time ROI:</th>
            <td
              className={classes.td}
              style={
                data.average.roi
                  ? parseInt(data.average.roi) < 0
                    ? { color: 'red' }
                    : { color: 'green' }
                  : null
              }
            >
              {data.average.roi || 0}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}
HorseNapTooltip.propTypes = {
  data: PropTypes.shape({
    average: PropTypes.shape({
      p_and_l: PropTypes.number,
      roi: PropTypes.number,
      sr: PropTypes.number
    }),
    average_picks: PropTypes.number,
    num_picks: PropTypes.number,
    free_average_picks: PropTypes.number,
    free_num_picks: PropTypes.number
  })
}
export default memo(HorseNapTooltip)
