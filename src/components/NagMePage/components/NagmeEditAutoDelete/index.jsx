import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikField from '@components/shared/FormikField'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import { NUMBER_OF_RACES_SELECT_OPTIONS } from '@constants/nagmeConstants'
import './index.scss'

const NagmeEditAutoDelete = ({ rowData, handleEditAutoDelete }) => {
  const handleChangeAutoDelete = (data) => {
    handleEditAutoDelete(data.value, rowData)
  }

  const setSelectedRunsNumber = useCallback(
    () =>
      rowData.auto_delete
        ? NUMBER_OF_RACES_SELECT_OPTIONS.filter(
            (runsOption) => runsOption.value === rowData.auto_delete
          )[0]
        : NUMBER_OF_RACES_SELECT_OPTIONS[0],
    [rowData]
  )

  return (
    <div className="form-textarea__wrapper">
      <Formik
        initialValues={{
          selectedRunsNumber: setSelectedRunsNumber()
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          selectedRunsNumber: Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required()
          })
        })}
      >
        {({ errors }) => (
          <Form>
            <div>
              <FormikField
                options={NUMBER_OF_RACES_SELECT_OPTIONS}
                name="selectedRunsNumber"
                type="formikSelect"
                placeholder="Never"
                label="Number of races to auto-delete after:"
                isLoading={false}
                isClearable={false}
                isSearchable={false}
                onValueChange={handleChangeAutoDelete}
              />
            </div>
            {errors.non_field_errors && (
              <FormErrorMessage name="non_field_errors" />
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

NagmeEditAutoDelete.propTypes = {
  rowData: PropTypes.shape({
    auto_delete: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  handleEditAutoDelete: PropTypes.func.isRequired
}
export default NagmeEditAutoDelete
