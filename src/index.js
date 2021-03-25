import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuestionProvider } from './contexts/question';
import { StoreProvider } from './contexts/store';

ReactDOM.render(
  <React.StrictMode>
    <QuestionProvider>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </QuestionProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
