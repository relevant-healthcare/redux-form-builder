import React from 'react';
import { render } from 'react-dom';
import MyForm from './form.jsx';

render(
  <div>
    <h2>Redux Form Component Demo</h2>
    <MyForm />
  </div>,
  document.getElementById('app')
);
