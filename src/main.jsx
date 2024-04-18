import React from 'react'
import ReactDOM from 'react-dom/client'
import { App }from './App.jsx'
import './index.scss'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    
    <Route path="/*" element={<App />}/>
    </Routes>
    
    </BrowserRouter>
    

  </React.StrictMode>,
)
