import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import  Home  from '../pages/Home';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home/>,
      },
      {
        path: 'login',
        element: <LoginPage/>
      }, 
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage/>
      },  
      {
        path: 'sign-up',
        element: <SignUpPage/>
      },
      {
        future: {
          v7_skipActionErrorRevalidation: true,
          v7_normalizeFormMethod: true, // Add this flag here
        },
      }
    ],
  },
]);

export default router;
