import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import Select from '@components/shared/Form/Select'
import dateConversations from '@utils/timeUtils'
import { TIME_DEFAULT_FORMAT } from '@constants/dateFormatsList'
import { TABLE_MODS } from '@constants/common'

const RaceFilters = ({
  selectedCourse = '',
  selectedStartTime = '',
  selectedWp = {},
  courses = [],
  startTimes = {},
  handleSelectRace,
  handleSelectRaceCard,
  handleSelectStatsMode
}) => {
  const getTimeOptions = useMemo(() => {
    if (selectedCourse) {
      return startTimes[selectedCourse.value]
    } else {
      return []
    }
  }, [selectedCourse, startTimes])
  const getOption = useCallback(
    (option) => dateConversations.getFormattedDate(option, TIME_DEFAULT_FORMAT),
    [selectedStartTime, startTimes]
  )
  const getValue = useMemo(() => [selectedStartTime], [
    selectedStartTime,
    startTimes
  ])
  return (
    <>
      <Select
        value={selectedCourse}
        onChange={handleSelectRace}
        options={courses || []}
        className="basic-single"
        classNamePrefix="select"
        name="races"
        placeholder="Race"
      />
      <Select
        value={getValue}
        onChange={handleSelectRaceCard}
        options={getTimeOptions}
        getOptionLabel={getOption}
        getOptionValue={getOption}
        className="basic-single"
        classNamePrefix="select"
        isClearable={false}
        name="races"
        placeholder="Race"
      />
      <Select
        simpleValue
        value={selectedWp}
        onChange={handleSelectStatsMode}
        options={TABLE_MODS}
        className="basic-single"
        classNamePrefix="select"
        isLoading={false}
        isSearchable={false}
        name="stats-mode"
        placeholder="WP"
      />
    </>
  )
}
RaceFilters.propTypes = {
  selectedCourse: PropTypes.shape({}),
  selectedStartTime: PropTypes.string,
  selectedWp: PropTypes.shape({}),
  courses: PropTypes.array,
  startTimes: PropTypes.shape({}),
  handleSelectRace: PropTypes.func.isRequired,
  handleSelectRaceCard: PropTypes.func.isRequired,
  handleSelectStatsMode: PropTypes.func.isRequired
}
export default RaceFilters
