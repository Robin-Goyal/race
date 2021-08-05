import React, { memo } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { useFormikContext, useField } from 'formik'

const BooleanFilter = ({ value, ...props }) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props)

  /**
   * Will manually set the value belong to the name props in the Formik form using setField
   */
  const handleOptionChange = (event) => {
    setFieldValue(props.name, event.target.checked)
    props.onValueChange && props.onValueChange()
  }

  return (<Checkbox color="primary" style={{ padding: 0 }} checked={field.value} disabled={props.disabled} onChange={handleOptionChange} />)
}
export default memo(BooleanFilter)
