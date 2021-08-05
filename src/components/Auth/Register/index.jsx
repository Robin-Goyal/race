import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import FormikField from '@components/shared/FormikField'
import Button from '@components/shared/Button'
import routes from '@constants/routes'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import AuthSession from '@utils/session'
import Logger from '@utils/logger'

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8)
})

const Register = () => {
  const handleSubmit = async (values, actions) => {
    try {
      const data = await Api.post(apiUrls.auth.register, values)
      AuthSession.login(data.key)
      // Hey, you can pass user data to flux store here
    } catch (err) {
      Logger.error(err)
      actions.setErrors(err)
    }
  }

  return (
    <section>
      <div className="row">
        <div className="col-xs-12">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={RegisterFormSchema}
          >
            {({ errors }) => (
              <Form>
                <h3>Sign up</h3>
                <FormikField name="email" type="email" placeholder="Email" />
                <FormikField
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {errors.non_field_errors && <p>{errors.non_field_errors}</p>}
                <Button type="submit">Sign up</Button>
                <p>
                  Already have an account?{' '}
                  <Link to={routes.auth.login}>Sign in</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}

export default Register
