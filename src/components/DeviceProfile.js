import React from 'react'

function DeviceProfile({closeModal}) {
  return (
    <div>
    <div className='modalBackground'>
      <div className='modalContainer'>
        <p>test</p>
        <button onClick={()=>closeModal(false)}>X</button>
      </div>
    </div>
  </div>
  )
}

export default DeviceProfile