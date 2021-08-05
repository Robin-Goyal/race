import React from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import FormikField from '@components/shared/FormikField'
import Button from '@components/shared/Button'

const formSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  category: Yup.string().max(250).required()
})

const ContactUs = () => {
  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true)
      await Api.post(apiUrls.contactUs, values)
      toast.success('Your message was sent')
      actions.resetForm()
    } catch (err) {
      actions.setErrors(err)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Formik
              initialValues={{
                email: '',
                title: '',
                description: '',
                category: ''
              }}
              validationSchema={formSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormikField type="email" name="email" placeholder="Email" />
                  <FormikField type="text" name="title" placeholder="Title" />
                  <FormikField
                    type="text"
                    name="description"
                    placeholder="Description"
                  />
                  <FormikField
                    type="text"
                    name="category"
                    placeholder="Category"
                  />
                  <Button disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
