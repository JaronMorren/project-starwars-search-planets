import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarWarsProvider from './context/StarWarsProvider';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StarWarsProvider>
      <App />
    </StarWarsProvider>,
  );
