import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './modules/App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import IPInfo from 'ip-info-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IPInfo>
      <GoogleOAuthProvider clientId="1009974298432-hagmvvbllqis8gnpjuchtrnsij6cs3d8.apps.googleusercontent.com">
        <App></App>
      </GoogleOAuthProvider>
    </IPInfo>
  </React.StrictMode>,
)
