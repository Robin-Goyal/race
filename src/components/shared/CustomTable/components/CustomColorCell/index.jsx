import React from 'react'

const CustomColorCell = ({ colour, value }) => {
  return (
    <div style={{ backgroundColor: `#${colour}`, padding: '16px' }}>
      {value}
    </div>
  )
}

export default CustomColorCell
