export const selectCustomStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    fontFamily: '"lato", sans-serif',
    padding: 5,
    backgroundColor: state.isSelected ? '#009688' : 'transparent',
    '&:hover': {
      backgroundColor: '#009688',
      color: '#fff'
    }
  }),
  input: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: '14px',
    fontFamily: '"lato", sans-serif'
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  menuList: (provided) => ({
    ...provided,
    '&::-webkit-scrollbar': {
      width: '10px'
    }
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: 'none'
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999
  })
}

export const selectMediumSizeStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    fontFamily: '"lato", sans-serif',
    padding: 5,
    backgroundColor: state.isSelected ? '#009688' : 'transparent',
    '&:hover': {
      backgroundColor: '#009688',
      color: '#fff'
    }
  }),
  input: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: '14px',
    fontFamily: '"lato", sans-serif'
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  control: (provided) => ({
    ...provided,
    minHeight: '32px',
    boxShadow: 'none'
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    maxHeight: '32px',
    overflow: 'hidden'
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '14px'
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999
  }),
  menuList: (provided) => ({
    ...provided,
    '&::-webkit-scrollbar': {
      width: '10px'
    }
  })
}

export const selectSmallSizeStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '13px',
    fontFamily: '"lato", sans-serif',
    padding: 5,
    whiteSpace: 'nowrap',
    width: '100%',
    backgroundColor: state.isSelected ? '#009688' : 'transparent',
    '&:hover': {
      backgroundColor: '#009688',
      color: '#fff'
    }
  }),
  input: (provided) => ({
    ...provided,
    fontSize: '13px'
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: '13px',
    fontFamily: '"lato", sans-serif'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none'
  }),
  container: (provided) => ({
    ...provided,
    boxShadow: '0 2px 3px rgba(0,0,0,.05)'
  }),
  valueContainer: (provided) => ({
    ...provided,
    minWidth: '35px',
    padding: '0 8px',
    justifyContent: 'center',
    height: '24px'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0 5px 0 0'
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '13px',
    fontFamily: '"lato", sans-serif',
    fontWeight: 900
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    height: '26px',
    minHeight: '26px',
    marginTop: '1px',
    borderColor: '#d7dae2'
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '13px',
    fontFamily: '"lato", sans-serif',
    fontWeight: 900
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999
  }),
  menu: (provided) => ({
    ...provided,
    width: 'fit-content',
    minWidth: '100%',
    whiteSpace: 'nowrap'
  })
}

export const customSelectTheme = (theme) => ({
  ...theme,
  color: 'green',
  colors: {
    ...theme.colors,
    primary: '#009688',
    primary25: '#009688',
    primary50: '#009688'
  }
})
