import React from 'react'

export const CustomSelectOption = ({
  getStyles,
  data,
  isDisabled,
  innerProps,
  ...props
}) =>
  !isDisabled ? (
    <div style={getStyles('option', props)} {...innerProps}>
      a
    </div>
  ) : null
