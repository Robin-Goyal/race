import React, { memo } from 'react'
import StatsFilter from '@components/shared/Stats/StatsFilter'
import PropTypes from 'prop-types'
import WithLoading from '@components/shared/WithLoading'

const FilterBlockContent = ({
  filterData,
  filtersets,
  isTable,
  isDisabled
}) => (
  <>
    {!!filterData.length &&
      filterData.map((filter) => (
        <StatsFilter
          key={filter.label}
          filter={filter}
          filtersets={filtersets}
          isTable={isTable}
          isDisabled={isDisabled}
        />
      ))}
  </>
)

FilterBlockContent.propTypes = {
  filterData: PropTypes.any.isRequired,
  isLoading: PropTypes.bool,
  isTable: PropTypes.bool,
  filtersets: PropTypes.array,
  isDisabled: PropTypes.bool
}

export default WithLoading(memo(FilterBlockContent))
