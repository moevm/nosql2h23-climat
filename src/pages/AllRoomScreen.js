import React from "react";
import room_img from '../room1.jpg';
import NavBar from "../components/NavBar";

function RoomsScreen({ roomArray }) {
    return (
        <div>
            <NavBar></NavBar>
            <div className="component_grid">
                <div className="grid_item">
                    <img className="image_item" src={room_img}></img>
                    <h3 className="item_text">room 1</h3>
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