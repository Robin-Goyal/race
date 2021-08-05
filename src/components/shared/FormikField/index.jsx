import React from 'react'
import { Field } from 'formik'
import PropTypes from 'prop-types'

import Input from '@components/shared/Form/Input'
import Textarea from '@components/shared/Form/Textarea'
import Select from '@components/shared/Form/Select'
import Checkbox from '@components/shared/Form/Checkbox'
import RadioButton from '@components/shared/Form/Radio'
import './FormikField.scss'
import FormikSelect from '@components/shared/Form/FormikSelect'
import SelectAsync from '@components/shared/Form/AsyncSelect'
import MinMaxInput from '@components/shared/Form/MinMaxInput'

const fieldTypes = {
  checkbox: 'checkbox',
  switch: 'switch',
  radio: 'radio',
  select: 'select',
  formikSelect: 'formikSelect',
  asyncSelect: 'asyncSelect',
  textarea: 'textarea',
  text: 'text',
  number: 'number',
  email: 'email',
  password: 'password',
  minMax: 'minMax'
}

const FormikField = ({ type, ...props }) => {
  const renderFormField = () => {
    switch (type) {
      case fieldTypes.checkbox:
        return Checkbox
      case fieldTypes.radio:
        return RadioButton
      case fieldTypes.select:
        return Select
      case fieldTypes.textarea:
        return Textarea
      case fieldTypes.formikSelect:
        return FormikSelect
      case fieldTypes.asyncSelect:
        return SelectAsync
      case fieldTypes.minMax:
        return MinMaxInput
      default:
        return Input
    }
  }

  return (
    <Field {...props}>
      {({ field }) => {
        const Component = renderFormField()
        return (
          <>
            <Component type={type} {...props} {...field} />
          </>
        )
      }}
    </Field>
  )
}

FormikField.propTypes = {
  type: PropTypes.oneOf(Object.values(fieldTypes))
}

export default React.memo(FormikField)
