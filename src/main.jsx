import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 引入 css / JS
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js";

import App from './App.jsx'
import "./assets/styles/all.scss";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
