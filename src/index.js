import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter,  RouterProvider, Route} from "react-router-dom";
import RoomsScreen from './pages/AllRoomScreen';
import App from './App';
import AllDevicesScreen from './pages/AllDevicesScreen';
import AllScenarioScreen from './pages/AllScenarioScreen';
import NotificationScreen from './pages/NotificationScreen';
import RoomProfile from './components/RoomProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoomsScreen/>,
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