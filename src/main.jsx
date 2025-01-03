// Dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; // Import the store and persistor
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import Profile from './components/Profile.jsx';
import EditProfile from './components/user/EditProfile.jsx';
import Login from './components/utils/Login.jsx';
import LogOut from './components/user/LogOut.jsx';
import GetStarted from './components/user/GetStarted.jsx';
import Home from './components/Home.jsx';
import About from './components/user/About.jsx';
import Scheduler from './components/scheduler/Scheduler.jsx';
import Prioritizer from './components/scheduler/Prioritizer.jsx';
import App from './App.jsx';
import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
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
  {
    path: '/scheduler',
    element: <Scheduler />,
  },
  {
    path: '/prioritizer',
    element: <Prioritizer />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="process.env.CLIENT_ID">
      <CopilotKit publicApiKey="process.env.API_KEY">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="">
              <div className="absolute inset-0 -z-10 min-h-[vh] w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <RouterProvider router={router}>
              </RouterProvider>
            </div>
          </PersistGate>
        </Provider>
      </CopilotKit>
    </GoogleOAuthProvider>
  </StrictMode>
);


