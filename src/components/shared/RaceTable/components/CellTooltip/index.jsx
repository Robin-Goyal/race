/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import StatsTooltipTable from '@components/shared/RaceTable/components/StatsTooltipTable'
import StatsReductionTooltipTable from '@components/shared/RaceTable/components/StatsReductionTooltipTable'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getStatsMod } from '@components/WebRatings/ducks/selectors'

const useCellTooltipStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white
  },
  h6: {
    color: theme.palette.common.white,
    letterSpacing: 1.21,
    background: '#0F1827',
    padding: '10px 15px',
    fontFamily: '"lato", sans-serif',
    fontWeight: 'normal',
    fontSize: 14,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  }
}))
const CellTooltip = ({ name, stats }) => {
  const classes = useCellTooltipStyles()
  const statsMod = useSelector(getStatsMod)
  return (
    <>
      <Typography
        variant="h6"
        className={classes.root}
        classes={{
          h6: classes.h6
        }}
      >
        {statsMod.value === 'win_pr' ? 'Win Price Reductions' : name}
      </Typography>
      {statsMod.value !== 'win_pr' && (
        <>
          {statsMod.value === 'win_sr' && (
            <StatsTooltipTable
              singular="Win"
              plural="Wins"
              stats={stats.win_sr}
            />
          )}
          <StatsTooltipTable
            singular="Place"
            plural="Places"
            stats={stats.place_sr}
          />
          {statsMod.value !== 'win_sr' && (
            <StatsTooltipTable
              singular="Win"
              plural="Wins"
              stats={stats.win_sr}
            />
          )}
          <StatsTooltipTable
            singular="Combined"
            plural="Combined"
            stats={stats.combined_sr}
          />
        </>
      )}
      {statsMod.value === 'win_pr' && (
        <StatsReductionTooltipTable
          stats={stats.win_pr}
          srStats={stats.win_sr}
        />
      )}
    </>
  )
}

export default memo(CellTooltip)
