import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/app/store.ts'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.Fragment>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </React.Fragment>
  </Provider>
)
