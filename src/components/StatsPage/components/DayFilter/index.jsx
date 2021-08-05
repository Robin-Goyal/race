import React, { useState } from 'react'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import dateConversations from '@utils/timeUtils'
import { DEFAULT_DATE_FORMAT } from '@constants/dateFormatsList'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'
import FilterIcon from '@assets/icons/filter.svg'
import { downloadSelections } from '@components/StatsPage/ducks/actions'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  toggleButtonGroupRoot: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  toggleButtonGroupGrouped: {
    [theme.breakpoints.down('xs')]: {
      '&:not(:first-child)': {
        borderLeft: '1px solid #cccccc'
      }
    }
  },
  toggleButtonRoot: {
    flex: '1 0 50%',
    textTransform: 'none',
    maxHeight: '38px',
    border: '1px solid #cccccc',
    [theme.breakpoints.down('xs')]: {
      borderRadius: ' 0px',
      fontSize: '14px',
      width: '100px',
      padding: 0,
      border: '1px solid #cccccc'
    }
  }
}))
const DayFilter = ({
  filterProp,
  handleTodayApply,
  handleTomorrowApply,
  downloadUrl,
  numRunsDownload,
  currentFilterSet
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isDownloading, setDownloading] = useState(false)

  const handleFilterChange = (type) => {
    if (type === 'today') {
      handleTodayApply(type)
    } else {
      handleTomorrowApply(type)
    }
  }

  const handleDownloadSelections = () => {
    const dateFormat = dateConversations.getFormattedDate(
      new Date(),
      DEFAULT_DATE_FORMAT
    )
    setDownloading(true)
    dispatch(
      downloadSelections({
        url: downloadUrl,
        dateFormat,
        onSuccess: () => {
          setDownloading(false)
        },
        onError: (e) => {
          const message = e.message || e
          toast.error(message)
          setDownloading(false)
        }
      })
    )
  }

  return (
    <div className="stats-top-bar__single-row">
      <ToggleButtonGroup
        size="medium"
        value={filterProp}
        exclusive
        onChange={(e, type) => handleFilterChange(type)}
        aria-label="Time period"
        classes={{
          root: classes.toggleButtonGroupRoot,
          grouped: classes.toggleButtonGroupGrouped
        }}
      >
        <ToggleButton
          key="today"
          value="today"
          aria-label="today"
          classes={{
            root: classes.toggleButtonRoot
          }}
          disabled={!filterProp.today}
        >
          <img src={FilterIcon} style={{ marginRight: 5 }} alt="Filter" />
          Today: {filterProp.today}
        </ToggleButton>
        <ToggleButton
          key="tomorrow"
          value="tomorrow"
          aria-label="tomorrow"
          classes={{
            root: classes.toggleButtonRoot
          }}
          disabled={!filterProp.tomorrow}
        >
          Tomorrow: {filterProp.tomorrow}
        </ToggleButton>
      </ToggleButtonGroup>
      {downloadUrl && currentFilterSet && currentFilterSet.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          disabled={isDownloading}
          size="small"
          onClick={handleDownloadSelections}
          style={{ textTransform: 'capitalize' }}
          className="download-selections"
        >
          Download selections: {numRunsDownload}
        </Button>
      )}
    </div>
  )
}

DayFilter.propTypes = {
  filterProp: PropTypes.shape({
    tomorrow: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    today: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  handleTodayApply: PropTypes.func.isRequired,
  handleTomorrowApply: PropTypes.func.isRequired,
  currentFilterSet: PropTypes.array,
  downloadUrl: PropTypes.string,
  numRunsDownload: PropTypes.number
}

export default DayFilter
