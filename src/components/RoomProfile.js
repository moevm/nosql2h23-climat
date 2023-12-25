import React from 'react'
import room_img from '../imgs/room1.jpg';
import { LineChart } from '@mui/x-charts/LineChart';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import humidity_data from '../imgs/humidity_data.json'
import co_data from '../imgs/co_data.json'


const hum_value = humidity_data.map(function (user) {
    return  user.value
  });
const hum_device = humidity_data.map(function (user) {
    return  user.device
  });

const co_value = co_data.map(function (user) {
    return  user.value
  });
const co_device = co_data.map(function (user) {
    return  user.device
  });

function RoomProfile({closeModal}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex, setGraphic] = React.useState(1);
  const [isShown, setIsShown] = React.useState(false);
  const [state_graph, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const keyToLabel = {
    TLM0100: 'TLM0100',
    TLM0101: 'TLM0101',
    TLM0102: 'TLM0102',
    TLM0103: 'TLM0103',
    TLM0200: 'TLM0200',
    TLM0201: 'TLM0201',
  };
  
  const colors = {
    TLM0100: 'lightgreen',
    TLM0101: 'yellow',
    TLM0102: 'lightblue',
    TLM0103: 'blue',
    TLM0200: 'orange',
    TLM0201: 'darkgrey',
  };
  
  const stackStrategy = {
    stack: 'value',
    area: false,
    stackOffset: 5, // To stack 0 on top of others
  };
  
  const customize = {
    height: 300,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: 'descending',
  };
  return (
    
    <div>
      <div className='modalBackground'>
        <div className='modalContainer'>
          <div className='img_name'><img className="image_item" src={room_img}></img>
          <p>Room 1</p>
          </div>
          <div className='lineChartGroup'>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state_graph}
                label="Parametr"
                onChange={handleChange}
              >
                <MenuItem value={'Co'}>Co</MenuItem>
                <MenuItem value={'Hum'}>Humidity</MenuItem>
                <MenuItem value={'Temp'}>Temperature</MenuItem>
              </Select>
            </FormControl>
          </Box>
      <LineChart className='co_graphic'
          xAxis={[
            {
              dataKey: 'time',
              scaleType:'point'
              // valueFormatter: (v) => v.toString(),
            },
          ]}
          series={[
            {
              data: co_value,
              label: keyToLabel[co_device],
              // color: colors[keyToLabel],
              showMark: true,
          // ...stackStrategy,
            },
          ]}
          dataset={co_data}
          {...customize}
          width={800}
          height={500}
      />
    <LineChart className='hum_graphic'
          xAxis={[
            {
              dataKey: 'time',
              scaleType:'point'
              // valueFormatter: (v) => v.toString(),
            },
          ]}
          series={[
            {
              data: hum_value,
              label: keyToLabel[hum_device],
              //color: colors[hum_device],
              showMark: false,
          // ...stackStrategy,
            },
          ]}
          dataset={humidity_data}
          {...customize}
          width={800}
          height={500}
      />
          <button className="img_name text" onClick={()=>closeModal(false)}>X</button>
        </div>
      </div>
    </div>
  </div> 
  )
}

export default RoomProfile