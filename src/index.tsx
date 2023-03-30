import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LogInForm from './components/forms/logInForm';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const isLoggedIn = true;
root.render(


  <React.StrictMode>
    {isLoggedIn ?
      <App /> : <LogInForm />}
  </React.StrictMode>
);


