import React from 'react';
import ReactDOM from 'react-dom/client';
import { counterStore } from './reducer';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => root.render(<App />);

renderApp();
counterStore.subscribe(renderApp);
