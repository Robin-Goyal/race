import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom'
import * as qs from 'query-string'
import PropTypes from 'prop-types'

import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import routes from '@constants/routes'
import Button from '@components/shared/Button'
import FormikField from '@components/shared/FormikField'
import Logger from '@utils/logger'

const ResetPasswordConfirm = ({ history }) => {
  const [wasChanged, setChanged] = useState(false)
  const ResetPasswordConfirmSchema = Yup.object().shape({
    new_password1: Yup.string().required().min(8).max(32),
    new_password2: Yup.string()
      .oneOf([Yup.ref('new_password1'), ''])
      .required()
      .min(8)
      .max(32)
  })

  const { token, uid } = qs.parse(history.location.search)

  const handleSubmit = async (values, actions) => {
    try {
      await Api.post(apiUrls.auth.resetPasswordConfirm, {
        ...values,
        token,
        uid
      })
      setChanged(true)
    } catch (err) {
      Logger.error(err)
      actions.setErrors(err)
    }
  }

  return (
    <section>
      <div className="row">
        <div className="col-xs-12">
          {wasChanged ? (
            <>
              <h3>Success!</h3>
              <h4>You can login with your new password</h4>
              <br />
              <Button type="button" to={routes.home}>
                Login
              </Button>
            </>
          ) : (
            <Formik
              initialValues={{ new_password1: '', new_password2: '' }}
              onSubmit={handleSubmit}
              validationSchema={ResetPasswordConfirmSchema}
            >
              {({ errors }) => (
                <Form>
                  <h3>Reset password</h3>
                  <h4>Please, enter new password</h4>
                  <FormikField
                    name="new_password1"
                    type="password"
                    placeholder="Password"
                  />
                  <FormikField
                    name="new_password2"
                    type="password"
                    placeholder="Confirm password"
                  />
                  {(errors.token || errors.uid) && <p>Link was expired</p>}
                  <br />
                  <Button type="submit">Send</Button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </section>
  )
}

ResetPasswordConfirm.propTypes = {
  history: PropTypes.any
}

export default withRouter(ResetPasswordConfirm)
