import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home_components/Home';
import Editor from './components/editor_components/Editor';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
