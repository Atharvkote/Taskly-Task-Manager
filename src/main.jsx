import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './redux/store'
import { Provider } from 'react-redux'

// Components
import Profile from './components/Profile.jsx';
import Tasks from './components/Tasks.jsx';
import EditProfile from './components/user/EditProfile.jsx';
import Login from './components/user/Login.jsx'
import LogOut from './components/user/LogOut.jsx'
import GetStarted from './components/user/GetStarted.jsx'
import About from './components/user/About.jsx';
import App from './App.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/tasks',
    element: <Tasks />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/edit',
    element: <EditProfile />,
  },
  {
    path: '/logout',
    element: <LogOut />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <GetStarted />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className=''>
   <div class="absolute inset-0 -z-10 min-h-[vh]  w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
   <RouterProvider router={router} />
   <Provider store={store}></Provider>,
    </div>
  </StrictMode>
);