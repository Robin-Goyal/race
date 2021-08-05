import React, { useState, useEffect } from 'react'
import Chip from '@material-ui/core/Chip'
import { useTheme, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { isNil } from 'lodash'

const StatsChip = ({
  currentFilters,
  columnFilters,
  handleDelete,
  handleFiltersModal,
  isTableFilters = false
}) => {
  const [activeFilters, setActiveFilters] = useState([])
  const theme = useTheme()

  useEffect(() => {
    if (!isNil(currentFilters)) {
      const selectedFilters = currentFilters.reduce((acc, cur) => {
        const matchFilter = columnFilters.find(({ name }) => cur.name === name)
        if (matchFilter) {
          acc.push({
            ...matchFilter,
            ...cur
          })
        }
        return acc
      }, [])
      setActiveFilters(selectedFilters)
    }
  }, [currentFilters, columnFilters])

  return (
    <div>
      {activeFilters && activeFilters.length > 0 ? (
        activeFilters.map((filter, i) =>
          filter.values.length === 1 ? (
            <Chip
              key={`${filter.name}-${i}`}
              label={`${filter.label}: ${filter.values[0].label}`}
              onDelete={() =>
                handleDelete({
                  name: filter.name
                })
              }
              style={{
                backgroundColor: isTableFilters
                  ? theme.palette.primary.light
                  : '#ffffff',
                color: isTableFilters ? '#ffffff' : theme.palette.primary.light,
                margin: '0 10px 5px 0'
              }}
              className={isTableFilters ? 'primary-chip' : 'secondary-chip'}
              deleteIcon={
                <Tooltip title="Delete Filter">
                  <HighlightOffIcon />
                </Tooltip>
              }
            />
          ) : (
            <div
              key={`${filter.name}-${i}`}
              className={`MuiChip-root MuiChip-deletable MuiChip-group-root${
                isTableFilters ? ' primary-chip' : ' secondary-chip'
              }`}
              style={{
                backgroundColor: isTableFilters
                  ? theme.palette.primary.light
                  : '#ffffff',
                color: isTableFilters ? '#ffffff' : theme.palette.primary.light,
                margin: '0 10px 5px 0'
              }}
            >
              <Tooltip title="Delete Filters">
                <HighlightOffIcon
                  className="MuiSvgIcon-root MuiChip-deleteIcon MuiChip-deleteIcon-group"
                  style={{ marginLeft: 6, marginRight: 0 }}
                  onClick={() =>
                    handleDelete({
                      name: filter.name
                    })
                  }
                />
              </Tooltip>
              <span
                className="MuiChip-label"
                style={{ padding: '0 5px' }}
              >{`${filter.label}: `}</span>
              {filter.values.length > 2 ? (
                <span
                  key={`${filter.name}:count-${filter.values.length}`}
                  className="MuiChip-inner-root"
                >
                  <span
                    className="MuiChip-label"
                    style={{
                      padding: '0 10px 0 0',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleFiltersModal(filter)}
                  >
                    {filter.values.length} Selected
                  </span>
                </span>
              ) : (
                filter.values.map((f, index) => (
                  <span
                    key={`${filter.name}:${f.label}-${i}`}
                    className="MuiChip-inner-root"
                  >
                    <span
                      className="MuiChip-label"
                      style={{ padding: '0 10px 0 0' }}
                    >
                      {index > 0 && 'OR '}
                      {f.label}
                    </span>
                    <Tooltip title="Delete Filter">
                      <HighlightOffIcon
                        className="MuiSvgIcon-root MuiChip-deleteIcon"
                        onClick={() =>
                          handleDelete({
                            name: filter.name,
                            value: f
                          })
                        }
                      />
                    </Tooltip>
                  </span>
                ))
              )}
            </div>
          )
        )
      ) : (
        <div style={{ paddingTop: 5, minHeight: 32 }}>None</div>
      )}
    </div>
  )
}

StatsChip.propTypes = {
  currentFilters: PropTypes.array,
  columnFilters: PropTypes.array,
  isTableFilters: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
  handleFiltersModal: PropTypes.func
}
export default React.memo(StatsChip)
