import React, { useMemo } from 'react'
import MaterialTable from 'material-table'
import { useTheme } from '@material-ui/core/styles'

const CustomTable = ({ columns, data, options, ...props }) => {
  const theme = useTheme()
  const isShownMessage = useMemo(() => !props.isLoading, [props.isLoading])
  return (
    <MaterialTable
      title="Custom Table"
      columns={columns}
      className="rtr-table"
      data={data}
      options={{
        search: false,
        sorting: false,
        grouping: false,
        draggable: false,
        toolbar: false,
        showEmptyDataSourceMessage: isShownMessage,
        headerStyle: {
          backgroundColor: theme.palette.primary.light,
          color: '#FFF',
          textAlign: 'center',
          fontFamily: '"Lato",sans-serif',
          fontSize: 16
        },
        cellStyle: {
          textAlign: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: '"Lato",sans-serif',
          fontSize: 16
        },
        rowStyle: {
          textAlign: 'center',
          justifyContent: 'center'
        },
        ...options
      }}
      {...props}
    />
  )
}

export default CustomTable
