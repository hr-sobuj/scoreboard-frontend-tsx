import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
      refetchOnMount: true
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <React.Fragment>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </React.Fragment>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' />
    </QueryClientProvider>
  </>
)
