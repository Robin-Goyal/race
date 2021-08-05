import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import './index.scss'
import StatsInput from '../StatsInput'
import BooleanFilter from '../BooleanFilter'
import DateRangeFilter from '../DateRangeFilter'
import { useTheme } from '@material-ui/core/styles'
import { Field, useFormikContext } from 'formik'
import SelectAsync from '@components/shared/Form/AsyncSelect'
import MinMaxInput from '@components/shared/Form/MinMaxInput'
import FormikSelect from '@components/shared/Form/FormikSelect'
import { STATS_FIELD_TYPES } from '@constants/common'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'

const StatsFilter = ({ filter, filtersets, isTable, isDisabled, ...props }) => {
  const theme = useTheme()
  const formik = useFormikContext()

  const customFieldChangeHandlers = {
    [STATS_FIELD_TYPES.NumberRangeFilter]: debounce(function (value) {
      formik.setFieldValue(filter.name, value)
    }, 50)
  }

  const customFieldDateChangeHandlers = {
    [STATS_FIELD_TYPES.DateRangeFilter]: debounce(function (value) {
      formik.setFieldValue(filter.name, value)
    }, 50)
  }

  const hasDisabled = useMemo(() => isDisabled, [
    isTable,
    filtersets,
    isDisabled
  ])

  return (
    <Field {...props} name={filter.name}>
      {({ field }) => (
        <div className="stats-filter filters-block__item">
          <div className="stats-filter__label">
            <Typography
              variant="caption"
              className="filters-block__label"
              display="inline"
            >
              {filter.label}
            </Typography>
          </div>
          <div className="stats-filter__field">
            {(() => {
              const componentProps = { ...filter, ...props, ...field }
              switch (filter.type) {
                case STATS_FIELD_TYPES.NumberRangeFilter:
                  return (
                    <MinMaxInput
                      {...componentProps}
                      className="stats-filter__field-item"
                      key={filter.name}
                      onChange={customFieldChangeHandlers[filter.type]}
                      disabled={hasDisabled}
                    />
                  )
                case STATS_FIELD_TYPES.BooleanFilter:
                  return (
                    <BooleanFilter
                      {...componentProps}
                      className="stats-filter__field-item"
                      key={filter.name}
                      onValueChange={formik.handleSubmit}
                      disabled={hasDisabled}
                    />
                  )
                case STATS_FIELD_TYPES.DateRangeFilter:
                  return (
                    <DateRangeFilter
                      {...componentProps}
                      className="stats-filter__field-item"
                      key={filter.name}
                      onChange={customFieldDateChangeHandlers[filter.type]}
                      disabled={hasDisabled}
                    />
                  )
                case STATS_FIELD_TYPES.MultiOptionFilter:
                  return (
                    <FormikSelect
                      {...componentProps}
                      className="stats-filter__field-item"
                      key={filter.name}
                      mediumSize={true}
                      onValueChange={formik.handleSubmit}
                      isDisabled={hasDisabled}
                    />
                  )
                case STATS_FIELD_TYPES.TextFilter:
                  return (
                    <SelectAsync
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      {...filter}
                      {...props}
                      {...field}
                      className="stats-filter__field-item"
                      key={filter.name}
                      mediumSize={true}
                      onValueChange={formik.handleSubmit}
                      isDisabled={hasDisabled}
                    />
                  )
                default:
                  return (
                    <StatsInput
                      {...componentProps}
                      className="stats-filter__field-item"
                      key={filter.name}
                      disabled={hasDisabled}
                    />
                  )
              }
            })()}
            {filter.type !== STATS_FIELD_TYPES.TextFilter &&
              filter.type !== STATS_FIELD_TYPES.MultiOptionFilter &&
              filter.type !== STATS_FIELD_TYPES.BooleanFilter && (
                <IconButton
                  disableRipple={true}
                  size="small"
                  style={{ marginLeft: 5, padding: 0 }}
                  onClick={formik.handleSubmit}
                  disabled={hasDisabled}
                >
                  <AddCircleIcon
                    style={{
                      color:
                        field && field.value
                          ? theme.palette.primary.light
                          : '#0000003b'
                    }}
                    fontSize="small"
                  />
                </IconButton>
              )}
          </div>
        </div>
      )}
    </Field>
  )
}
StatsFilter.propTypes = {
  filter: PropTypes.any.isRequired,
  isTable: PropTypes.bool,
  filtersets: PropTypes.array,
  isDisabled: PropTypes.bool
}

function areEqual(prevProps, nextProps) {
  return isEqual(prevProps.filter, nextProps.filter)
}

export default memo(StatsFilter, areEqual)
