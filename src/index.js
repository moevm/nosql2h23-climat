import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import RoomsScreen from './pages/AllRoomScreen';
import AllDevicesScreen from './pages/AllDevicesScreen';
import AllScenarioScreen from './pages/AllScenarioScreen';
import NotificationScreen from './pages/NotificationScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/rooms",
    element: <RoomsScreen/>,
  },
  {
    path: "/devices",
    element: <AllDevicesScreen/>,
  },
  {
    path: "/scenario",
    element: <AllScenarioScreen/>,
  },
  {
    path: "/notification",
    element: <NotificationScreen/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);