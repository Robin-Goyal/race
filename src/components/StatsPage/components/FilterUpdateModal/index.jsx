import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import CustomTableBeta from '@components/shared/CustomTable/index_beta'
import { isEmpty } from 'lodash'
import Logger from '@utils/logger'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const FilterUpdateModal = ({
  isOpen,
  fullScreen,
  handleClose,
  updatedFilter,
  handleDelete
}) => {
  const classes = useStyles()
  const [selectedFilters, setSeletedFilters] = useState([])
  const [isLoading, toggleIsLoading] = useState(false)

  useEffect(() => {
    if (!isEmpty(updatedFilter)) {
      const data = updatedFilter.values.map((filter) => {
        const shallowFilter = { ...filter }
        shallowFilter.is_selected = true
        return shallowFilter
      })
      setSeletedFilters(data)
    }
  }, [updatedFilter])

  const getHeaderProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        padding: '0 10px',
        fontSize: 14,
        border: '1px solid grey'
      }
    }),
    []
  )

  const getRowProps = useCallback(
    () => ({
      style: {
        padding: 0,
        fontSize: 12
      }
    }),
    []
  )
  const getCellProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        padding: '0 5px',
        height: 1,
        fontSize: 12,
        border: '1px solid grey'
      }
    }),
    []
  )

  const handleCheckboxChange = (label, checked) => {
    const data = selectedFilters.map((filter) => {
      const shallowFilter = { ...filter }
      if (shallowFilter.label === label) {
        shallowFilter.is_selected = checked
      }
      return shallowFilter
    })
    setSeletedFilters(data)
  }

  const handleUnselectAll = () => {
    const data = selectedFilters.map((filter) => {
      const shallowFilter = { ...filter }
      shallowFilter.is_selected = false
      return shallowFilter
    })
    setSeletedFilters(data)
  }

  const submitDelete = async () => {
    const filters = selectedFilters
      .filter((filter) => filter.is_selected)
      .map((fl) => ({ label: fl.label, value: fl.value }))
    try {
      toggleIsLoading(true)
      handleDelete({
        name: updatedFilter.name,
        values: filters
      })
      toggleIsLoading(false)
      handleClose()
    } catch (error) {
      Logger.log(error)
    }
  }

  const isUpdateDisabled = () =>
    !selectedFilters.some((filter) => !filter.is_selected)

  const isUnselectAllDisabled = () =>
    !selectedFilters.some((filter) => filter.is_selected)

  if (!updatedFilter) return null
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Update Filters for {updatedFilter.label}
      </DialogTitle>
      <DialogContent>
        <div className="updated-filter-list">
          <CustomTableBeta
            columns={[
              {
                Header: 'Name',
                id: 'name',
                accessor: 'label',
                Cell: (rowData) => {
                  if (rowData.row.original.label) {
                    return rowData.row.original.label
                  }
                  return '-'
                }
              },
              {
                Header: '',
                id: 'is_selected',
                Cell: (rowData) => (
                  <Checkbox
                    size="small"
                    color="primary"
                    checked={rowData.row.original.is_selected}
                    onChange={(e) =>
                      handleCheckboxChange(
                        rowData.row.original.label,
                        e.target.checked
                      )
                    }
                  />
                )
              }
            ]}
            data={selectedFilters}
            getRowProps={getRowProps}
            getCellProps={getCellProps}
            getHeaderProps={getHeaderProps}
          />
        </div>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            disabled={isUpdateDisabled()}
            onClick={submitDelete}
          >
            Update
          </Button>
          <Button
            color="primary"
            variant="outlined"
            disabled={isUnselectAllDisabled()}
            onClick={handleUnselectAll}
          >
            Unselect All
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="primary" disableShrink />
        </Backdrop>
      </DialogContent>
    </Dialog>
  )
}
FilterUpdateModal.propTypes = {
  fullScreen: PropTypes.any,
  updatedFilter: PropTypes.object,
  isOpen: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}
export default FilterUpdateModal
