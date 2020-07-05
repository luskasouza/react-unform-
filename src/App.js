import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/Input';

const initialData = {
  email: 'zerolucas11@gmail.com',
  address: {
    city: 'São Paulo',
  }
}


function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('O nome é obrigatorio'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .require('O e-mail é obrigatorio'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatorio')
        })
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data);

      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessagens = {};

        err.inner.forEach(error => {
          errorMessagens[error.path] = error.message;
        })
        formRef.current.setErrors(errorMessagens);
      }
    }
  }

  return (
    <div className="App">
      <h1> Hello World </h1>
      <Form ref={formRef} /*initialData={initialData}*/ onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Nome" />
        <Input type="email" name="email" placeholder="E-mail" />
        <Scope path="address">
          <Input name="street" placeholder="Rua" />
          <Input name="neighborhood" placeholder="Bairro" />
          <Input name="city" placeholder="Cidade" />
          <Input name="state" placeholder="Estado" />
          <Input name="number" placeholder="N°" />
        </Scope>
        <Input type="password" name="password" placeholder="Password" />
        <button type="submit">Enviar</button>
      </Form>
    </div >
  )
}

export default App;
