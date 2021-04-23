import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss'

export { default as Button } from "./components/Button";
export { default as Menu } from "./components/Menu";
export { default as Icon } from "./components/Icon";
export { default as Upload } from "./components/Upload";
export { default as Progress } from "./components/Progress";

ReactDOM.render(
  <React.StrictMode>
    <h1>Hello React!</h1>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
