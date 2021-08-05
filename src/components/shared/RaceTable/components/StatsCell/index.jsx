import React, { memo } from 'react'
import CellTooltip from '@components/shared/RaceTable/components/CellTooltip'
import PopOver from '@components/shared/PopOver'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getStatsMod } from '@components/WebRatings/ducks/selectors'
import helpers from '@utils/helpers'
import PropTypes from 'prop-types'

const useStatsStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2px',
    borderRight: '1px solid #ddd',
    fontWeight: 700,
    height: '100%',
    fontSize: '14px',
    position: 'relative',
    overflow: 'hidden'
  }
}))

const StatsCell = ({ name, value }) => {
  const classes = useStatsStyles()
  const statsMod = useSelector(getStatsMod)
  if (!value) return <div>-</div>

  const stats = value[statsMod.value]
  if (!stats) return <div>-</div>
  if (statsMod.value === 'win_pr') {
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: `#${stats && stats.colour}` }}
      >
        <PopOver content={<CellTooltip name={`${name} stats`} stats={value} />}>
          {`${stats.value || 0}%`}
        </PopOver>
      </div>
    )
  }
  return (
    <div
      className={classes.root}
      style={{ backgroundColor: `#${stats && stats.colour}` }}
    >
      <PopOver content={<CellTooltip name={`${name} stats`} stats={value} />}>
        {helpers.transformToPercentage(stats.successes / stats.runs)}
      </PopOver>
    </div>
  )
}

StatsCell.propTypes = {
  value: PropTypes.shape({}),
  name: PropTypes.string.isRequired
}
export default memo(StatsCell)
