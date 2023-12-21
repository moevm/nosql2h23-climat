import React from 'react'
import NavBar from '../components/NavBar'
import aircond_img from '../imgs/airconditioner.png'
import purifier_img from '../imgs/purifierpng.png'

function AllDevicesScreen() {
  return (
    <div>
        <NavBar></NavBar>
        <div className="component_grid">
                <div className="grid_item">
                    <img className="image_item" src={aircond_img}></img>
                    <h3 className="item_text">Air conditioner</h3>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={purifier_img}></img>
                    <h3 className="item_text">Air purifier</h3>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={aircond_img}></img>
                    <h3 className="item_text">Air conditioner</h3>
                </div>
                <div className="grid_item">
                    <img className="image_item" src={purifier_img}></img>
                    <h3 className="item_text">Air purifier</h3>
                </div>
            </div>
    </div>
  )
}

export default AllDevicesScreen