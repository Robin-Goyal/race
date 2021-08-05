import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ResultRosette from '@components/shared/RaceTable/components/ResultCell/ResultRosette'
import Tooltip from '@material-ui/core/Tooltip'
import helpers from '@utils/helpers'

const useResultCellStyles = makeStyles(() => ({
  rosetteContainer: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: '"lato", sans-serif',
    fontWeight: 700
  }
}))

const ResultCell = ({ value, res }) => {
  const raceDetail =
    res.row && res.row.original ? res.row.original.race_detail : {}
  const classes = useResultCellStyles()

  // Non - runner
  if (res.row && res.row.original && !res.row.original.is_runner) {
    return <div>NR</div>
  }

  if ((!value || !value.value) && (!value || !value.finish_state)) {
    return <div>-</div>
  }

  const result = value.value
  if (value.value) {
    const count =
      raceDetail && raceDetail.is_handicap && raceDetail.number_of_runners > 16
        ? 4
        : 3
    if (result <= count) {
      return (
        <div className={classes.rosetteContainer}>
          <ResultRosette value={result} />
        </div>
      )
    } else {
      return (
        <div className={classes.rosetteContainer}>
          {helpers.addOrdinalSuffix(result)}
        </div>
      )
    }
  }
  if (value.finish_state) {
    return value.finish_state_title ? (
      <div className={classes.rosetteContainer}>
        <Tooltip title={value.finish_state_title}>
          <span>{value.finish_state}</span>
        </Tooltip>
      </div>
    ) : (
      <div className={classes.rosetteContainer}>{value.finish_state}</div>
    )
  }
}

export default memo(ResultCell)
