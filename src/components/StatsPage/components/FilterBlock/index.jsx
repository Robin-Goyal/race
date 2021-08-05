import React, { memo, useEffect, useState } from 'react'
import { makeStyles, Typography, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Form, Formik } from 'formik'
import { Info } from '@material-ui/icons'
import { isNil } from 'lodash'
import FilterBlockContent from '@components/StatsPage/components/FilterBlock/FilterBlockContent'
import './index.scss'

const useFilterBlockStyles = makeStyles(() => ({
  filterMainBlock: {
    borderRadius: 4,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#fff',
    padding: '0 15px'
  },
  filterHeadingBlock: {
    display: 'flex',
    padding: '15px 0 10px 0',
    position: 'relative',
    alignItems: 'center',
    userSelect: 'none',
    borderRadius: 0,
    verticalAlign: 'middle',
    justifyContent: 'space-between',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    borderBottom: '1px solid #CED4D8'
  },
  filterDescriptionBlock: {
    display: 'flex',
    padding: '10px 0 16px 0'
  }
}))

const FilterBlock = ({
  filterData,
  handleFilterChange,
  isLoading = false,
  isTable,
  currentFilters,
  filtersets,
  isDisabled,
  minimum_membership_to_filter
}) => {
  const classes = useFilterBlockStyles()
  const [activeFilters, setActiveFilters] = useState([])

  useEffect(() => {
    if (!isNil(currentFilters)) {
      setActiveFilters(currentFilters)
    }
  }, [currentFilters])

  const getTitle = () => (isTable ? 'Table Filters' : 'Data Filters')

  const getToolTip = () => {
    if (!isTable && filtersets && filtersets.length > 0) {
      return 'The page forbid using these filters'
    } else if (isDisabled) {
      return `Only ${minimum_membership_to_filter} members can use these filters`
    } else {
      return isTable
        ? "A 'table filter' excludes rows on the stats table that do not fit the criteria"
        : "A 'data filter' excludes run data which does not fit the criteria"
    }
  }

  const getInitialValues = () => ({
    course: null,
    xsp: null,
    'xsp-rank': null,
    'value-percentage': null,
    'distance-furlongs': null,
    'race-type': null,
    going: null,
    'age-range': null,
    surface: null,
    handicap: null,
    runner: null,
    trainer: null,
    jockey: null,
    sire: null,
    'field-size': null,
    sex: null,
    age: null,
    'days-off': null,
    'class-change': null,
    class: null,
    'rtr-rank': null,
    'av3-rank': null,
    'av10-rank': null,
    date: null,
    month: null,
    year: null,
    runners: null,
    sr: null,
    p_and_l_bfsp: null,
    roi_bfsp: null,
    p_and_l_isp: null,
    roi_isp: null
  })

  return (
    <div className={classes.filterMainBlock}>
      <div className={classes.filterHeadingBlock}>
        <Typography style={{ fontWeight: '700', letterSpacing: '0.39px' }}>
          {getTitle()}
        </Typography>
        <Tooltip title={getToolTip()}>
          <Info style={{ color: '#CED4D8' }} />
        </Tooltip>
      </div>
      <div className={classes.filterDescriptionBlock}>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleFilterChange(values, activeFilters)
            setSubmitting(false)
            resetForm()
          }}
        >
          {() => (
            <Form className="filters-block">
              <FilterBlockContent
                filterData={filterData}
                isLoading={isLoading}
                filtersets={filtersets}
                isTable={isTable}
                isDisabled={isDisabled}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

FilterBlock.propTypes = {
  filterData: PropTypes.any.isRequired,
  isLoading: PropTypes.bool,
  isTable: PropTypes.bool,
  handleFilterChange: PropTypes.func.isRequired,
  currentFilters: PropTypes.array,
  filtersets: PropTypes.array,
  isDisabled: PropTypes.bool,
  minimum_membership_to_filter: PropTypes.string
}

export default memo(FilterBlock)
