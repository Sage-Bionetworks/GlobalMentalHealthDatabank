import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'
import { SessionDataProvider } from './AuthContext'
import './i18n'

ReactDOM.render(
  <SessionDataProvider>
    <Suspense fallback={null}>
      <Router>
        <App />
      </Router>
    </Suspense>
  </SessionDataProvider>,
  document.getElementById('root'),
)
