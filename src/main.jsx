import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './components/Profile.jsx';
import Tasks from './components/Tasks.jsx';
import './index.css';
import About from './components/utils/About.jsx';
import App from './App.jsx';

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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className=''>
    <RouterProvider router={router} />
    </div>
  </StrictMode>
);