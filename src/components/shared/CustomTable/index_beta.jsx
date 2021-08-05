import React, { memo } from 'react'
import { useTable } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Loader from '@components/shared/Loader'
import EmptyDataMessage from '@components/shared/EmptyDataMessage'
import PropTypes from 'prop-types'

const CustomTableBeta = ({
  isLoading = false,
  columns,
  data,
  getRowProps = () => ({}),
  getCellProps = () => ({}),
  getHeaderProps = () => ({})
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      maxWidth: 500,
      minHeight: 10
    }),
    []
  )
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: {
      pageIndex: 0
    }
  })

  if (!data.length && !isLoading) {
    return (
      <EmptyDataMessage isLoading={false} message="No races for this date" />
    )
  }
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow
            key={`${Object.keys(headerGroup).length}-${i}`}
            {...headerGroup.getHeaderGroupProps([getHeaderProps(headerGroup)])}
          >
            {headerGroup.headers.map((column) => (
              <TableCell
                key={column.id}
                {...column.getHeaderProps([getHeaderProps(column)])}
              >
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow
              key={`${row.id}-${i}`}
              {...row.getRowProps([getRowProps(row)])}
            >
              {isLoading ? (
                <Loader />
              ) : (
                row.cells.map((cell, i) => (
                  <TableCell
                    key={`${Object.keys(cell).length}-${i}`}
                    {...cell.getCellProps([getCellProps(cell)])}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}
CustomTableBeta.propTypes = {
  isLoading: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  getHeaderProps: PropTypes.func,
  getRowProps: PropTypes.func,
  getCellProps: PropTypes.func
}

export default memo(CustomTableBeta)
