import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'
import helpers from '@utils/helpers'
import { Formik, Form } from 'formik'
import FormikField from '@components/shared/FormikField'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import './index.scss'

const NagmeEditNote = ({ rowData, handleEditNote, noteMaxLength }) => {
  const handleChangeNote = (e) => {
    handleEditNote(e.target.value, rowData)
  }

  return (
    <div className="form-textarea__wrapper">
      <Formik
        initialValues={{
          notes: rowData.note
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          notes: Yup.string().max(
            noteMaxLength || 200,
            `Notes must be at most ${noteMaxLength || 200} characters`
          )
        })}
      >
        {({ errors, values }) => (
          <Form>
            <div>
              <FormikField
                name="notes"
                type="textarea"
                placeholder="Notes"
                label=""
                error={!!errors.notes}
                onKeyUp={handleChangeNote}
                inputProps={{ maxLength: noteMaxLength || 200 }}
                rowsMax={3}
              />
              <FormErrorMessage name="notes" />
              <Typography align="left" style={{ fontSize: 13 }}>
                Number of characters left:{' '}
                {helpers.calcRemainingSpace(values.notes.length, noteMaxLength)}
              </Typography>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

NagmeEditNote.propTypes = {
  rowData: PropTypes.shape({
    note: PropTypes.string
  }).isRequired,
  handleEditNote: PropTypes.func.isRequired,
  noteMaxLength: PropTypes.number
}
export default NagmeEditNote
