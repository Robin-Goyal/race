/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Backdrop } from '@material-ui/core'

const PopOverBackDrop = (props) => {
  const onTouchMove = (e) => {
    console.log('onTouchMove')
    e.preventDefault()
  }

  const handleClick = () => {
    console.log('handleClick')
  }

  return <Backdrop {...props} onTouchMove={onTouchMove} onClick={handleClick} />
}

export default PopOverBackDrop
