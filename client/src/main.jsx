import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
  <ToastContainer />
    <App />
    </PersistGate>
  </Provider>
  </BrowserRouter>,
)
