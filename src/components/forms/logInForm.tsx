import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import TextField from './textField';

//zatim neimplementovano priprava na login

interface FormValues {
  user: string;
  password: string;
}

const InitValues: FormValues = {
  user: '',
  password: ''
}

const onSubmit = async (values: FormValues) => {
  await new Promise(r => setTimeout(r, 3000));
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
        {(formikProps) => (
          <Form>
            <div className='form-group'>
              <TextField field="user" label='Uživatelské jméno' />
              <TextField field="password" label='Heslo' />
              <button disabled={formikProps.isSubmitting} className='file-submit-btn' type='submit'>
                Potvrdit
              </button>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  )
}
