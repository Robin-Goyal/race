/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import AsyncSelect from 'react-select/async'
import {
  customSelectTheme,
  selectCustomStyles,
  selectMediumSizeStyles,
  selectSmallSizeStyles
} from '@constants/material/selectThemeConfig'
import { useField, useFormikContext } from 'formik'
import debounce from 'lodash/debounce'
import Api from '@utils/api'
import { apiBaseUrl } from '@constants/api'
import { toast } from 'react-toastify'
import { STANDARD_DELAY } from '@constants/common'
import PropTypes from 'prop-types'

const SelectAsync = ({ getSelectData, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [field] = useField(props)

  /**
   * Will manually set the value belong to the name props in the Formik form using setField
   */
  function handleOptionChange(selection) {
    setFieldValue(props.name, selection)
    props.onValueChange && props.onValueChange()
  }

  /**
   * Manually updated the touched property for the field in Formik
   */
  function updateBlur() {
    setFieldTouched(props.name, true)
  }

  const getOptions = debounce(async (inputValue, callback) => {
    if (!inputValue) {
      return callback([])
    }
    let response = []
    try {
      const data = await Api.get(
        `${apiBaseUrl}${props.typeahead}?q=${inputValue}`
      )
      response = await data.items
    } catch (e) {
      toast.error(e)
    } finally {
      callback(response)
      // eslint-disable-next-line no-unsafe-finally
      return response
    }
  }, STANDARD_DELAY)

  const getHandler = getSelectData || getOptions
  return (
    <AsyncSelect
      menuPortalTarget={document.body}
      styles={
        props.smallSize
          ? selectSmallSizeStyles
          : props.mediumSize
          ? selectMediumSizeStyles
          : selectCustomStyles
      }
      theme={customSelectTheme}
      loadOptions={getHandler}
      {...props}
      {...field}
      onBlur={updateBlur}
      onChange={handleOptionChange}
    />
  )
}
SelectAsync.propTypes = {
  getSelectData: PropTypes.func,
  additionalHandler: PropTypes.func,
  name: PropTypes.string,
  typeahead: PropTypes.string,
  onValueChange: PropTypes.func
}

export default memo(SelectAsync)
