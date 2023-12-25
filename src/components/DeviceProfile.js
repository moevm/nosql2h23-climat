import React from 'react'
import EnhancedTable from './tableStyle';
import aircond_img from '../imgs/airconditioner.png'

import data_dev from '../imgs/tavledevice.json'

function DeviceProfile({closeModal}) {
  return (
    <div>
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='bar'>
          <div className='img_name'>
          <img className="image_item" src={aircond_img}></img>
          <p>TLMO101</p>
          </div>
          <button onClick={()=>closeModal(false)}>X</button>
        </div>

        <EnhancedTable></EnhancedTable>
      </div>
    </div>
  </div>
  )
}

export default DeviceProfile