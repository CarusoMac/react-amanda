import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LogInForm from './components/logInForm';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const isLoggedIn = false;
root.render(


  <React.StrictMode>
    {isLoggedIn ?
      <App /> : <LogInForm />}
  </React.StrictMode>
);


