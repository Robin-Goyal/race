import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { MTableHeader } from 'material-table'

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white
  },
  tableHeaderRow: {
    '& th:nth-child(1)': {
      borderBottom: 0
    },
    '& th:nth-child(2)': {}
  },
  tableHeaderCell: {
    padding: '10px',
    color: theme.palette.common.white,
    textAlign: 'center',
    border: `1px solid ${theme.palette.common.white}`
  }
}))

const StatsTableHeader = (props) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [columnToSort, setOrderBy] = React.useState('pick_type')
  const handleRequestSort = (event, property) => {
    const isAsc = columnToSort === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  return (
    <React.Fragment>
      <TableHead
        classes={{
          root: classes.tableHeader
        }}
      >
        <TableRow
          classes={{
            root: classes.tableHeaderRow
          }}
        >
          <TableCell />
          <TableCell colSpan="4" classes={{ root: classes.tableHeaderCell }}>
            Stats
          </TableCell>
          <TableCell colSpan="3" classes={{ root: classes.tableHeaderCell }}>
            XSP
          </TableCell>
        </TableRow>
      </TableHead>
      <MTableHeader {...props} />
    </React.Fragment>
  )
}

export default StatsTableHeader
