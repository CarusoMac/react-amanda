import React from 'react'
import { Field, ErrorMessage } from 'formik'

//zatim neimplementovano priprava na login

interface textFieldProps {
  field: string;
  label: string;
}

export default function TextField(props: textFieldProps) {
  return (
    <>
      <label htmlFor={props.field}>{props.label}</label>
      <Field name={props.field} id={props.field} className="form-control" />
      <ErrorMessage name={props.field}>
        {msg => <div className='text-danger'>{msg}</div>}
      </ErrorMessage>

    </>
  )
}
