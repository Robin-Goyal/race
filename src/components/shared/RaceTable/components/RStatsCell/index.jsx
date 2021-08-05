import React, { memo } from 'react'
import PopOver from '@components/shared/PopOver'
import makeStyles from '@material-ui/core/styles/makeStyles'
import RStatsPopOverContent from '@components/shared/RaceTable/components/RStatsPopOverContent'
import PropTypes from 'prop-types'

const useRStatsCellStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2px',
    height: '100%',
    fontWeight: 700,
    fontSize: '14px',
    position: 'relative'
  }
}))

const RStatsCell = ({ value, res, rowID }) => {
  if (!value || !value.value) return <div>-</div>
  const classes = useRStatsCellStyles()
  return (
    <div
      className={classes.root}
      style={{
        backgroundColor:
          typeof value.value !== 'string' ? `#${value.colour}` : '#f8696b',
        borderRight: rowID === 1 ? '2px solid #ddd' : '1px solid #ddd'
      }}
    >
      <PopOver content={<RStatsPopOverContent stats={value} res={res} />}>
        {typeof value.value === 'string' ? value.value : value.value.toFixed(1)}
      </PopOver>
    </div>
  )
}
RStatsCell.propTypes = {
  value: PropTypes.shape({
    value: PropTypes.any,
    colour: PropTypes.string
  }),
  res: PropTypes.object,
  rowID: PropTypes.number
}
export default memo(RStatsCell)
