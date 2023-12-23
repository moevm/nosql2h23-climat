import React from "react";
import { useState } from 'react'

import room_img from '../imgs/room1.jpg';
import NavBar from "../components/NavBar";
import RoomProfile from "../components/RoomProfile";

function RoomsScreen({ roomArray }) {

    const [openModel,setOpenModal] = useState(false);
    return (
        <div>
            {openModel && <RoomProfile closeModal={setOpenModal}></RoomProfile>}
            <NavBar></NavBar>
            <div className="component_grid">
                <div className="grid_item">
                    <button className="roomModalBtn" onClick={()=>setOpenModal(true)}>
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">room 1</h3></button>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">room 2</h3>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">room 3</h3>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">room 4</h3>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">room 5</h3>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">room 6</h3>
                </div>
            </div>
        </div>
    )
}
export default RoomsScreen;