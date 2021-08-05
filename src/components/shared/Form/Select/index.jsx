/* eslint-disable react/prop-types */
import React from 'react'
import ReactSelect from 'react-select'
import WithLoading from '@components/shared/WithLoading'
import {
  customSelectTheme,
  selectCustomStyles,
  selectSmallSizeStyles,
  selectMediumSizeStyles
} from '@constants/material/selectThemeConfig'

const Select = (props) => (
  <div className="form-select" style={props.style}>
    <ReactSelect
      styles={
        props.smallSize
          ? selectSmallSizeStyles
          : props.mediumSize
          ? selectMediumSizeStyles
          : selectCustomStyles
      }
      theme={customSelectTheme}
      menuPortalTarget={document.body}
      {...props}
    />
  </div>
)

export default WithLoading(React.memo(Select))
