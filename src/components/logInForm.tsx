import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'

interface FormValues {
  user: string;
  password: string;
}

const InitValues: FormValues = {
  user: '',
  password: ''
}

const onSubmit = (values: FormValues) => {
  console.log(values);
};

export default function LogInForm() {
  return (
    <div className='container'>

      <h3>Přihlášení</h3>
      <Formik
        initialValues={InitValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          user: Yup.string().required('Nezadali jste uživatelské jméno'),
          password: Yup.string().required('Nezadali jste heslo')
        })}
      >
        <Form>
          <div className='form-group'>
            <label htmlFor="user">Uživatelské jméno</label>
            <Field name="user" id="user" className="form-control" />
            <label htmlFor="password">Heslo</label>
            <Field name="password" id="password" className="form-control" />
            <ErrorMessage name="user">
              {msg => <div className='text-danger'>{msg}</div>}
            </ErrorMessage>
            <ErrorMessage name="password">
              {msg => <div className='text-danger'>{msg}</div>}
            </ErrorMessage>
          </div>
          <button className='file-submit-btn' type='submit'>
            Potvrdit
          </button>
        </Form>
      </Formik>

    </div>
  )
}
