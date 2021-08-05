import React from 'react'
import { ErrorMessage as Message } from 'formik'
import Typography from '@material-ui/core/Typography'

const FormErrorMessage = ({ name }) => (
  <Message component={Typography} name={name} color="error" />
)

export default FormErrorMessage
