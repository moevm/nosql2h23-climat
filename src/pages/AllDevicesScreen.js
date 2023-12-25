import React from 'react'
import { useState, useEffect } from 'react'

import aircond_img from '../imgs/airconditioner.png'
import purifier_img from '../imgs/purifierpng.png'

import NavBar from '../components/NavBar'
import DeviceProfile from '../components/DeviceProfile'

function AllDevicesScreen() {

    const [devices, setDevices] = useState([]);
    const [openModel,setOpenModal] = useState(false);

    useEffect(() => {
        fetch('/devices')
            .then((res) => res.json())
            .then((result)=> setDevices(result.data))
      }, []);
    
    return (
        <div>
            {openModel && <DeviceProfile closeModal={setOpenModal}></DeviceProfile>}
            <NavBar></NavBar>
            <div className="component_grid">
                {devices.map((device)=>(
                    <div className="grid_item">
                        <button className="roomModalBtn" onClick={()=>setOpenModal(true)}>
                        <img className="image_item" src={aircond_img}></img>
                        <h3 className="item_text">{device}</h3></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllDevicesScreen