import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//import './utils/darkMode';   browser based dark them

import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { store } from './store/store'
import { Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
 