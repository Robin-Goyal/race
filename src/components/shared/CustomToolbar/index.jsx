/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Tabs, Tab } from '@material-ui/core'
import { DEFAULT_DATE_FORMAT } from '@constants/dateFormatsList'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
  }
}))

const CustomTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.primary.light
  }
}))(Tabs)

const CustomTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 68,
    fontWeight: 600,
    color: '#000000CC',
    padding: 0,
    fontSize: 13,
    letterSpacing: 0.65,
    marginRight: 15,
    fontFamily: ['"lato"', 'sans-serif'].join(','),
    '&:hover': {
      color: theme.palette.primary.light,
      opacity: 1
    },
    '&$selected': {
      color: theme.palette.primary.light
    },
    '&:focus': {
      color: theme.palette.primary.light
    }
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />)

const CustomToolbar = ({
  handleChangePeriod,
  type,
  isDisabled,
  period,
  date,
  selectedName
}) => {
  const classes = useStyles()
  const typeIndex = period.findIndex((item) => item.value === type)

  return (
    <div className={classes.root}>
      <CustomTabs
        value={typeIndex || 0}
        onChange={handleChangePeriod}
        aria-label="Time Period"
        variant="scrollable"
        scrollButtons="off"
      >
        {period.map((period, i) => (
          <CustomTab
            key={period.value}
            label={`${period.label}${
              selectedName && period.value === type ? ` > ${selectedName}` : ''
            }`}
            value={i}
            disabled={isDisabled}
            component="a"
            onClick={(event) => {
              event.preventDefault()
            }}
            href={
              date
                ? period.value === 'all-time' ||
                  period.value === 'courses' ||
                  period.value === 'race-types' ||
                  period.value === 'events'
                  ? `/leaderboards/${period.value}/`
                  : `/leaderboards/${period.value}/${
                      period.value === 'week'
                        ? date.weekday(6).format(DEFAULT_DATE_FORMAT)
                        : date.format(DEFAULT_DATE_FORMAT)
                    }`
                : `/leaderboards/${period.value}/`
            }
          />
        ))}
      </CustomTabs>
    </div>
  )
}

export default React.memo(CustomToolbar)
