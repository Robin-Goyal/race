import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const RowToFilters = ({
  isActive = false,
  isActiveFilterSet = false,
  currentStatsType,
  handleRowToFilersClick,
  handleAllFilterSets
}) => (
  <div className="stats-top-bar__single-row">
    {currentStatsType && currentStatsType.value === 'prostats' && (
      <Button
        variant="contained"
        color="primary"
        disableElevation
        disabled={!isActiveFilterSet}
        size="small"
        onClick={handleAllFilterSets}
        style={{ textTransform: 'capitalize' }}
      >
        All filtersets
      </Button>
    )}
    <Button
      variant="contained"
      color="primary"
      disableElevation
      size="small"
      disabled={!isActive}
      onClick={handleRowToFilersClick}
      style={{ textTransform: 'capitalize' }}
    >
      Rows To Filter
    </Button>
  </div>
)
RowToFilters.propTypes = {
  isActive: PropTypes.bool,
  isActiveFilterSet: PropTypes.bool,
  currentStatsType: PropTypes.object,
  handleRowToFilersClick: PropTypes.func.isRequired,
  handleAllFilterSets: PropTypes.func.isRequired
}
export default RowToFilters
