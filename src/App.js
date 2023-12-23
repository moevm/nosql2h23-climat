import './App.css';
import React from 'react'
import { useState,useEffect } from 'react';
import NavBar from './components/NavBar';
import RoomsScreen from './pages/AllRoomScreen';

function App() {
  
  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch('/express_influx');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  
  // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  useEffect(() => {
    callBackendAPI()
    .then(res => setState(res.express))
    .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <NavBar></NavBar>
      <p>test page</p>
      <div>
          {state}
      </div>
    </div>
  );
}

export default App;