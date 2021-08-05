import React from 'react'
import { SvgIcon } from '@material-ui/core'

const WarningIcon = (props) => {
  const style = {
    width: '24px',
    height: '24px',
    ...props.style
  }
  return (
    <SvgIcon style={style} viewBox="0 0 24 24">
      <defs>
        <clipPath id="a">
          <rect
            className="a"
            width="24"
            height="24"
            transform="translate(19 11)"
            fill={props.color}
            stroke="#707070"
          />
        </clipPath>
      </defs>
      <g className="b" transform="translate(-19 -11)" clipPath="url(#a)">
        <g transform="translate(19 11)">
          <path
            className="c"
            d="M23.789,19.972,13.259,2.51a1.471,1.471,0,0,0-2.519,0L.211,19.972A1.47,1.47,0,0,0,1.47,22.2H22.53a1.471,1.471,0,0,0,1.259-2.23ZM12.008,7.839a1,1,0,0,1,1.116.946c0,1.845-.217,4.5-.217,6.342,0,.481-.527.682-.9.682-.5,0-.915-.2-.915-.682,0-1.845-.217-4.5-.217-6.342C10.876,8.18,11.372,7.839,12.008,7.839Zm.016,11.428A1.194,1.194,0,1,1,13.2,18.073,1.212,1.212,0,0,1,12.023,19.266Z"
            fill={props.color}
          />
        </g>
      </g>
    </SvgIcon>
  )
}

export default WarningIcon
