import { Formik, Form, Field } from 'formik'
import React from 'react'

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
      <Formik initialValues={InitValues} onSubmit={onSubmit}>
        <Form>
          <div className='form-group'>
            <label htmlFor="user">Uživatelské jméno</label>
            <Field name="user" id="user" className="form-control" />
            <label htmlFor="password">Heslo</label>
            <Field name="password" id="password" className="form-control" />
          </div>
          <button className='file-submit-btn'>
            Potvrdit
          </button>
        </Form>
      </Formik>

    </div>
  )
}
