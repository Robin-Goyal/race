import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import routes from '../../../constants/routes'
import Button from '@components/shared/Button'
import FormikField from '@components/shared/FormikField'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import AuthSession from '@utils/session'
import Logger from '@utils/logger'

const Login = () => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8)
  })

  const handleSubmit = async (values, actions) => {
    try {
      const data = await Api.post(apiUrls.auth.login, values)
      AuthSession.login(data.key)
      // Hey, you can pass user data to flux store here
    } catch (err) {
      Logger.error(err)
      actions.setErrors(err)
    }
  }

  return (
    <section className="row">
      <div className="col-xs-12">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={LoginFormSchema}
        >
          {({ errors }) => (
            <Form>
              <h3>Sign in</h3>
              <FormikField
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                errors={errors.email}
              />
              <FormikField
                name="password"
                label="Password"
                type="password"
                placeholder="Login"
                errors={errors.password}
              />
              <p>
                <Link to={routes.auth.resetPassword}>Forgot password?</Link>
              </p>
              {errors.non_field_errors && <p>{errors.non_field_errors}</p>}
              <Button type="submit">Login</Button>
              <p>
                Don&apos;t have an account?{' '}
                <Link to={routes.auth.register}>Sign up</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default Login
