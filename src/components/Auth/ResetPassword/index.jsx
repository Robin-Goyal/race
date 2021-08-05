import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Api from '@utils/api'
import Logger from '@utils/logger'
import { apiUrls } from '@constants/api'
import FormikField from '@components/shared/FormikField'
import Button from '@components/shared/Button'

const ResetPassword = () => {
  const [emailWasSent, setSendingStatus] = React.useState(false)

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required().email()
  })

  const handleSubmit = async (values, actions) => {
    try {
      await Api.post(apiUrls.auth.resetPassword, values)
      setSendingStatus(true)
    } catch (err) {
      Logger.error(err)
      actions.setErrors(err)
    }
  }

  return (
    <section>
      <div className="row">
        <div className="col-xs-12">
          {emailWasSent ? (
            <>
              <h3>Email was sent!</h3>
            </>
          ) : (
            <Formik
              initialValues={{ email: '' }}
              onSubmit={handleSubmit}
              validationSchema={ResetPasswordSchema}
            >
              {({ errors }) => (
                <Form>
                  <h3>Forgot password</h3>
                  <h4>
                    Enter your email and we&apos;ll send you further
                    instructions.
                  </h4>
                  <FormikField name="email" type="email" placeholder="Email" />
                  {errors.non_field_errors && <p>{errors.non_field_errors}</p>}
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

export default ResetPassword
