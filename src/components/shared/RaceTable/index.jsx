import React, { memo, useEffect } from 'react'
import { useRowSelect, useTable, useSortBy } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { useTheme } from '@material-ui/core/styles'
import Loader from '@components/shared/Loader'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EmptyDataMessage from '@components/shared/EmptyDataMessage'
import PropTypes from 'prop-types'
import { useSticky } from 'react-table-sticky'
import makeStyles from '@material-ui/core/styles/makeStyles'
import usePrevious from '@utils/customHook/usePrevious'
import GreenHover from '@assets/img/table/gradhover3.png'
import useMemberStore from '@utils/customHook/useMembersStore'

const useTableStyles = makeStyles(() => ({
  tableRow: {
    '&:hover': {
      background: `url(${GreenHover}) #74ff71`
    }
  }
}))

const Table = ({
  isLoading = false,
  columns,
  data,
  getRowProps = () => ({}),
  getCellProps = () => ({}),
  customHeaderStyles = () => ({}),
  hiddenColumns = [],
  selectedRows = [],
  isHover = false,
  isStatsPage = false,
  headerBackgroundColor,
  setSelectedRows,
  handleHeaderClick = () => ({}),
  raceInfo
}) => {
  const { memberStorage } = useMemberStore()
  const isNonRunnersShow = React.useMemo(
    () => memberStorage.settings && memberStorage.settings.show_non_runners,
    [memberStorage.settings]
  )
  const classes = useTableStyles()
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      maxWidth: 500,
      minHeight: 10
    }),
    []
  )

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleRowSelected,
    state: { sortBy }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        hiddenColumns: hiddenColumns || []
      },
      manualSortBy: isStatsPage ? true : false,
      autoResetSelectedRows: isStatsPage ? false : true,
      getRowId: React.useCallback((row, relativeIndex, parent) => {
        if (isStatsPage) {
          return row.key ? row.key : row.title
        }
        return parent ? [parent.id, relativeIndex].join('.') : relativeIndex
      }, [])
    },
    useSortBy,
    useRowSelect,
    useSticky
  )
  const theme = useTheme()
  const previousSelectedRows = usePrevious(selectedRows)

  useEffect(() => {
    handleHeaderClick(sortBy)
  }, [sortBy])

  useEffect(() => {
    if (rows.length && !isStatsPage) {
      rows.forEach((row) => {
        if (selectedRows.find(({ id }) => row.original.id === id)) {
          toggleRowSelected(row.index, true)
        } else {
          toggleRowSelected(row.index, false)
        }
        return row
      })
    }
  }, [selectedRows])

  useEffect(() => {
    if (selectedFlatRows && previousSelectedRows) {
      setSelectedRows &&
        setSelectedRows(
          selectedFlatRows.map((row) => row.original),
          rows,
          raceInfo
        )
    }
  }, [selectedFlatRows])

  const getHeaderStyles = () => ({
    style: {
      backgroundColor: headerBackgroundColor
        ? headerBackgroundColor
        : theme.palette.primary.light,
      color: theme.palette.common.white,
      textAlign: 'center',
      padding: 0,
      fontSize: 18,
      ...customHeaderStyles().style
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
            {...headerGroup.getHeaderGroupProps([getHeaderStyles(headerGroup)])}
          >
            {!isLoading &&
              headerGroup.headers.map((column) => (
                <TableCell
                  key={column.id}
                  {...column.getHeaderProps([
                    getHeaderStyles(column),
                    column.getSortByToggleProps()
                  ])}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 5,
                      borderRight: !isStatsPage ? '2px solid #ddd' : null
                    }}
                  >
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          if (!isStatsPage && row.original && !row.original.is_runner) {
            if (isNonRunnersShow) {
              return (
                <TableRow
                  key={`${row.id}-${i}`}
                  {...row.getRowProps([getRowProps(row)])}
                  classes={{
                    root: isHover ? classes.tableRow : null
                  }}
                  className={
                    row.isSelected
                      ? 'selected-row disabled-row'
                      : 'disabled-row'
                  }
                  hover={isHover}
                >
                  {isLoading ? (
                    <Loader />
                  ) : (
                    row.cells.map((cell, i) => (
                      <TableCell
                        key={`${Object.keys(cell).length}-${i}`}
                        {...cell.getCellProps([getCellProps(cell, raceInfo)])}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              )
            }
          } else {
            return (
              <TableRow
                key={`${row.id}-${i}`}
                {...row.getRowProps([getRowProps(row)])}
                classes={{
                  root: isHover ? classes.tableRow : null
                }}
                className={row.isSelected ? 'selected-row' : ''}
                hover={isHover}
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  row.cells.map((cell, i) => (
                    <TableCell
                      key={`${Object.keys(cell).length}-${i}`}
                      {...cell.getCellProps([getCellProps(cell, raceInfo)])}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))
                )}
              </TableRow>
            )
          }
        })}
      </TableBody>
    </MaUTable>
  )
}
Table.propTypes = {
  isLoading: PropTypes.bool,
  isHover: PropTypes.bool,
  raceInfo: PropTypes.shape({}),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  customHeaderStyles: PropTypes.func,
  getRowProps: PropTypes.func,
  getCellProps: PropTypes.func,
  hiddenColumns: PropTypes.array,
  selectedRows: PropTypes.array,
  handleHeaderClick: PropTypes.func,
  isStatsPage: PropTypes.bool,
  setSelectedRows: PropTypes.func,
  headerBackgroundColor: PropTypes.string
}

export default memo(Table)
