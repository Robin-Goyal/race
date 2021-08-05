import React from 'react'
import Select from '@components/shared/Form/Select'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    padding: 5,
    backgroundColor: state.isSelected ? '#009688' : 'transparent',
    '&:hover': {
      backgroundColor: '#009688',
      color: '#fff'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: 'none'
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '14px'
  })
}
const StatsSelect = (props) => (
  <Select
    {...props}
    styles={customStyles}
    theme={(theme) => ({
      ...theme,
      color: 'green',
      colors: {
        ...theme.colors,
        primary: '#009688',
        primary25: '#009688',
        primary50: '#009688'
      }
    })}
  />
)

export default StatsSelect
