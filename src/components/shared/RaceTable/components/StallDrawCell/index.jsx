/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import PopOver from '@components/shared/PopOver'
import CellTooltip from '@components/shared/RaceTable/components/CellTooltip'
import ClothNumberPopOverContent from '@components/shared/RaceTable/components/ClothNumberPopOverContent'
import { makeStyles } from '@material-ui/core/styles'
import isEmpty from 'lodash/isEmpty'

const useStallDrawCellStyles = makeStyles(() => ({
  root: {
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
    fontWeight: 700,
    borderRight: '1px solid #ddd'
  },
  hint: {
    top: -2,
    position: 'relative',
    left: 4,
    width: 20,
    height: 20
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const StallDrawCell = ({ value }) => {
  const classes = useStallDrawCellStyles()
  if (!value || !value.value) return <div className={classes.root}>-</div>

  return (
    <PopOver
      content={
        !isEmpty(value.stats) ? (
          <CellTooltip name="Stall draw stats" stats={value.stats} />
        ) : (
          <ClothNumberPopOverContent caption="No data found" />
        )
      }
      style={{ height: '100%' }}
    >
      <div
        className={classes.root}
        style={{
          backgroundColor: `#${
            value.stats && value.stats.win_sr && value.stats.win_sr.colour
          }`
        }}
      >
        <div className={classes.content}>
          <div>{value.value}</div>
        </div>
      </div>
    </PopOver>
  )
}

export default memo(StallDrawCell)
