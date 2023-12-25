import React from "react";
import { useState, useEffect } from 'react'
import room_img from '../imgs/room1.jpg';
import NavBar from "../components/NavBar";
import RoomProfile from "../components/RoomProfile";


function RoomsScreen() {
    const [rooms, setRooms] = useState([]);
    const [openModel,setOpenModal] = useState(false);
    const [graphic_data, setGraphic] = useState();
    
    useEffect(() => {
        fetch('/rooms')
            .then((res) => res.json())
            .then((result)=> {setRooms(result.data)})
        fetch('/rooms/getdata')
            .then((res) => res.json())
            .then((result)=> {setGraphic(result.data)})
      },
       []);
    // let  time_co=graphic_data.map(function (user) {
    //    return (user.time)
    //   });
    // let  val_co = graphic_data.map(function (user) {
    //     return (user.value)
    //    });
    //gtime_co={time_co}
    return (
        <div>
            {openModel && <RoomProfile closeModal={setOpenModal} ></RoomProfile>} 
            <NavBar></NavBar>
            <div className="component_grid">
                {rooms.map((room)=>(
                <div className="grid_item">
                    <button className="roomModalBtn" onClick={()=>{setOpenModal(true)}}>
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">{room.replace('_',' ')}</h3></button>
                </div>
                ))}
            </div>
        </div>
    )
}
export default RoomsScreen;