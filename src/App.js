import './App.css';
import React from 'react'
import { useState,useEffect } from 'react';
import NavBar from './components/NavBar';
import RoomsScreen from './pages/AllRoomScreen';
import Button from '@mui/material/Button';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <p>test page</p>
      <Button variant="contained">Hello world</Button>;
      <div>
      </div>
    </div>
  );
}

export default App;