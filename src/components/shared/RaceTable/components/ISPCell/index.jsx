import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useMemberStore from '@utils/customHook/useMembersStore'
import PropTypes from 'prop-types'

const useISPCellStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14
  }
}))
const ISPCell = ({ value }) => {
  const classes = useISPCellStyles()
  const { memberStorage } = useMemberStore()
  if (!value || !value.decimal) return <div>-</div>

  return (
    <div className={classes.root}>
      {memberStorage.settings && memberStorage.settings.show_fractional_odds
        ? value.fractional
        : value.decimal.toFixed(2)}
    </div>
  )
}

ISPCell.propTypes = {
  value: PropTypes.shape({
    fractional: PropTypes.any,
    decimal: PropTypes.number
  }).isRequired
}
export default memo(ISPCell)
