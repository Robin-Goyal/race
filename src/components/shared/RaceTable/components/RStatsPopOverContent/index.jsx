import React, { memo } from 'react'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'

const useRStatsPopOverContentStyles = makeStyles((theme) => ({
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
    width: 95,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    fontSize: 13,
    padding: '7px 15px',
    fontWeight: 700,
    fontFamily: '"lato", sans-serif',
    color: '#FFBB00'
  },
  h6: {
    color: theme.palette.common.white,
    letterSpacing: 1.21,
    textTransform: 'uppercase',
    background: '#0F1827',
    padding: 15,
    fontFamily: '"lato", sans-serif',
    fontWeight: 'normal',
    fontSize: 13,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  }
}))

const RStatsPopOverContent = ({ stats, res }) => {
  const classes = useRStatsPopOverContentStyles()
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        classes={{
          h6: classes.h6
        }}
      >
        Run Details
      </Typography>
      <Table className={classes.table}>
        <tbody>
          <tr>
            <th className={classes.th}>RTR Rank</th>
            <td className={classes.td} style={{ color: '#FFBB00' }}>
              {stats.rtr_rank}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Course</th>
            <td
              className={classes.td}
              style={{
                color:
                  res?.row?.original?.race_detail?.course === stats.course
                    ? '#4DB6AC'
                    : 'inherit'
              }}
            >
              {stats.course}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Distance</th>
            <td
              className={classes.td}
              style={{
                color:
                  res?.row?.original?.race_detail?.distance?.value ===
                  stats.distance
                    ? '#4DB6AC'
                    : 'inherit'
              }}
            >
              {stats.distance}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Going</th>
            <td
              className={classes.td}
              style={{
                color:
                  res?.row?.original?.race_detail?.going === stats.going
                    ? '#4DB6AC'
                    : 'inherit'
              }}
            >
              {stats.going}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Race Type</th>
            <td
              className={classes.td}
              style={{
                color:
                  res?.row?.original?.race_detail?.race_type === stats.race_type
                    ? '#4DB6AC'
                    : 'inherit'
              }}
            >
              {stats.race_type}
            </td>
          </tr>
          <tr>
            <th className={classes.th}>Date</th>
            <td className={classes.td}>{stats.date}</td>
          </tr>
          <tr>
            <th className={classes.th}>Form</th>
            <td className={classes.td}>{stats.form}</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  )
}
RStatsPopOverContent.propTypes = {
  stats: PropTypes.shape({
    rtr_rank: PropTypes.any,
    course: PropTypes.string,
    distance: PropTypes.string,
    going: PropTypes.string,
    race_type: PropTypes.string,
    date: PropTypes.string,
    form: PropTypes.string
  }),
  res: PropTypes.object
}
export default memo(RStatsPopOverContent)
