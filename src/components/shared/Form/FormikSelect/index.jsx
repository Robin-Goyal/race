import React, { memo } from 'react'
import { useFormikContext, useField } from 'formik'
import Select from '../Select'

const FormikSelect = ({ options, label, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const [field, meta] = useField(props)

  /**
   * Will manually set the value belong to the name props in the Formik form using setField
   */
  function handleOptionChange(selection) {
    setFieldValue(props.name, selection)
    props.onValueChange && props.onValueChange(selection)
  }
  /**
   * Manually updated the touched property for the field in Formik
   */
  function updateBlur() {
    setFieldTouched(props.name, true)
  }

  return (
    <Select
      options={options}
      {...props}
      {...field}
      onBlur={updateBlur}
      onChange={handleOptionChange}
    />
  )
}

export default memo(FormikSelect)
