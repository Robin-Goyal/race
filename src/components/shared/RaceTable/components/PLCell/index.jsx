import React, { memo } from 'react'
import PopOver from '@components/shared/PopOver'
import { useSelector } from 'react-redux'
import NAPEntryTooltip from '@components/shared/RaceTable/components/NAPEntryTooltip'
import { makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@components/shared/icons/InfoIcon'
import PropTypes from 'prop-types'

const usePLCellStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const PLCell = ({ className, value, rowData }) => {
  const classes = usePLCellStyles()
  const { loggedIn } = useSelector((store) => store.member)
  if (!value) return <div>-</div>

  return (
    <div className={className}>
      <div className={classes.content}>
        <div>{value}</div>
        {loggedIn && (
          <PopOver
            content={<NAPEntryTooltip rowData={rowData} />}
            backgroundColor="#ffffff"
          >
            <InfoIcon color="rgba(164,175,183,0.5)" style={{ marginLeft: 5 }} />
          </PopOver>
        )}
      </div>
    </div>
  )
}

PLCell.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  rowData: PropTypes.object
}

export default memo(PLCell)
