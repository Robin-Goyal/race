import React, { useState, useEffect } from 'react'
import Chip from '@material-ui/core/Chip'
import { useTheme, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { isNil } from 'lodash'

const FilterSetChip = ({ filtersets, handleDelete }) => {
  const [activeFilters, setActiveFilters] = useState([])
  const theme = useTheme()

  useEffect(() => {
    if (!isNil(filtersets)) {
      setActiveFilters(filtersets)
    }
  }, [filtersets])

  return (
    <div>
      {activeFilters && activeFilters.length > 0 ? (
        activeFilters.map((filter, i) => (
          <Chip
            key={`${filter}-${i}`}
            label={filter}
            onDelete={() =>
              handleDelete({
                name: filter
              })
            }
            style={{
              backgroundColor: '#ffffff',
              color: theme.palette.primary.light,
              margin: '0 10px 5px 0'
            }}
            className={'secondary-chip'}
            deleteIcon={
              <Tooltip title="Delete Filterset">
                <HighlightOffIcon />
              </Tooltip>
            }
          />
        ))
      ) : (
        <div style={{ paddingTop: 5, minHeight: 32 }}>None</div>
      )}
    </div>
  )
}

FilterSetChip.propTypes = {
  filtersets: PropTypes.array,
  handleDelete: PropTypes.func.isRequired
}
export default React.memo(FilterSetChip)
