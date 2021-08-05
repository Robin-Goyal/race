import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Accordion from '@components/shared/Accordion'
import { ButtonGroup, Button } from '@material-ui/core'
import kebabCase from 'lodash/kebabCase'
import Select from '@components/shared/Form/Select'
import dateConversations from '@utils/timeUtils'
import {
  TIME_DEFAULT_FORMAT,
  DEFAULT_DATE_FORMAT
} from '@constants/dateFormatsList'
import { history } from '@store'

const CustomButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 800,
    padding: '6px 12px',
    lineHeight: '32px',
    backgroundColor: '#ffffff',
    borderColor: '#DEDFDf',
    color: '#000000DE',
    '&:focus': {
      boxShadow: 'none',
      borderColor: '#DEDFDf',
      backgroundColor: '#ffffff',
      color: '#000000DE'
    },
    '&:active': {
      boxShadow: 'none',
      borderColor: '#DEDFDf',
      backgroundColor: '#f3f3f3',
      color: '#000000DE'
    },
    '&:hover': {
      backgroundColor: '#f3f3f3',
      borderColor: '#DEDFDf',
      boxShadow: 'none',
      color: '#000000DE'
    }
  }
})(Button)

const Races = ({
  isLoading = false,
  races,
  currentDate,
  racesCourseNames,
  racesStartTime,
  updateCurrentDate
}) => {
  const [racesArray, setRacesArray] = React.useState([])
  const [raceCardsArray, setRaceCardsArray] = React.useState([])

  useEffect(() => {
    if (races) {
      const raceDatas = races.map((race) => ({
        label: race.course
          ? `${dateConversations.getFormattedDate(
              race.start_time,
              TIME_DEFAULT_FORMAT
            )} ${race.course.name}${
              race.course.surface_abbr ? ` (${race.course.surface_abbr})` : ''
            }`
          : dateConversations.getFormattedDate(
              race.start_time,
              TIME_DEFAULT_FORMAT
            ),
        value: race
      }))
      setRacesArray(raceDatas)
    }
    if (racesCourseNames && racesStartTime) {
      const courseDatas = racesCourseNames.map((course) => ({
        label: `${course.actualLabel} (${racesStartTime[course.value].length})`,
        value: course.value
      }))
      setRaceCardsArray(courseDatas)
    }
  }, [races, racesCourseNames, racesStartTime])

  const handleSelectRaceDropdown = (event) => {
    const courseValue =
      event.value && event.value.course
        ? kebabCase(event.value.course.name)
        : ''
    const parseTime = event.value
      ? dateConversations.getFormattedUtcDate(
          event.value.start_time,
          TIME_DEFAULT_FORMAT,
          dateConversations.checkDST(event.value.start_time)
        )
      : ''

    if (courseValue && parseTime) {
      history.push(
        `/races/${currentDate.format(
          DEFAULT_DATE_FORMAT
        )}/${courseValue}/${parseTime}`
      )
    }
  }

  const handleSelectRaceCardsDropdown = (event) => {
    if (event && event.value) {
      history.push(
        `/races/${currentDate.format(DEFAULT_DATE_FORMAT)}/${event.value}`
      )
    }
  }

  const redirectToWebRatings = () => {
    history.push(`/races/${currentDate.format(DEFAULT_DATE_FORMAT)}/`)
  }

  const handleRaceDay = (day) => () => {
    if (day === 'today') {
      updateCurrentDate(currentDate, false)
    } else if (day === 'tomorrow') {
      updateCurrentDate(currentDate, true)
    }
  }

  return (
    <div>
      <Accordion
        title={`${
          dateConversations.checkTwoDates(currentDate, new Date())
            ? "Today's"
            : "Tomorrow's"
        } Races`}
        className="sidebar-box-1"
        showIcon
      >
        <div className="content-data">
          <ButtonGroup
            className="button-tab"
            aria-label="outlined primary button group"
            disableFocusRipple
            fullWidth
          >
            <CustomButton
              onClick={
                !dateConversations.checkTwoDates(currentDate, new Date())
                  ? handleRaceDay('today')
                  : null
              }
              className={
                dateConversations.checkTwoDates(currentDate, new Date())
                  ? 'active-btn'
                  : ''
              }
              disabled={isLoading}
            >
              Today
            </CustomButton>
            <CustomButton
              onClick={
                dateConversations.checkTwoDates(currentDate, new Date())
                  ? handleRaceDay('tomorrow')
                  : null
              }
              className={
                !dateConversations.checkTwoDates(currentDate, new Date())
                  ? 'active-btn'
                  : ''
              }
              disabled={isLoading}
            >
              Tomorrow
            </CustomButton>
          </ButtonGroup>
          <div className="input-tab">
            <div className="select-races">
              <Select
                value=""
                onChange={handleSelectRaceDropdown}
                options={racesArray || []}
                className="basic-single"
                classNamePrefix="select"
                isClearable={false}
                isLoading={false}
                isDisabled={isLoading}
                isSearchable={false}
                name="races"
                placeholder="Select Races"
              />
            </div>
            <div className="select-races middle-name">
              <Select
                value=""
                onChange={handleSelectRaceCardsDropdown}
                options={raceCardsArray || []}
                className="basic-single"
                classNamePrefix="select"
                isClearable={false}
                isLoading={false}
                isDisabled={isLoading}
                isSearchable={false}
                name="racecards"
                placeholder="Racecards"
              />
            </div>
            <div className="button">
              <Button
                type="button"
                variant="contained"
                fullWidth
                color="primary"
                disabled={isLoading}
                onClick={redirectToWebRatings}
                style={{ textTransform: 'none' }}
              >
                WebRatings
              </Button>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  )
}

Races.propTypes = {
  isLoading: PropTypes.bool,
  races: PropTypes.any,
  racesStartTime: PropTypes.object,
  racesCourseNames: PropTypes.array,
  currentDate: PropTypes.object,
  updateCurrentDate: PropTypes.func
}
export default Races
