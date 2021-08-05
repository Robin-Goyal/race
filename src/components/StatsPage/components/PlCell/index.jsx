import React from 'react'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ColoredValue from '../StatsColoredValue'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { fetchChartData } from '@components/StatsPage/ducks/actions'

const usePlCellStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  icon: {
    color: '#000'
  }
}))

const PlCell = ({ value, type }) => {
  const dispatch = useDispatch()
  const classes = usePlCellStyles()
  if (!value) return <div>-</div>
  // eslint-disable-next-line react/prop-types
  const getKey = () => (value.row && value.row.original.extra_data_key) || ''
  const handleChartOpen = () => {
    dispatch(
      fetchChartData({
        key: getKey(),
        type: type,
        onError: (e) => {
          const message =
            e.message ||
            'Oops, something went wrong. Please contact to administrator'
          toast.error(message)
        }
      })
    )
  }
  return (
    <div onClick={handleChartOpen} title="Show chart" className={classes.root}>
      <ColoredValue value={value.value} />
      {value.value ? <EqualizerIcon className={classes.icon} /> : null}
    </div>
  )
}
PlCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      value: PropTypes.number
    })
  ]),
  type: PropTypes.string
}
export default PlCell
