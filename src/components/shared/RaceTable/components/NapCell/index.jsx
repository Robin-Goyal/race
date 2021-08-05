/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import Select from '@components/shared/Form/Select'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import dateConversations from '@utils/timeUtils'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useEntries from '@utils/customHook/useEntries'
import { DEFAULT_DATE_FORMAT } from '@constants/dateFormatsList'
import { NAPS_MODS, NAP_DATE_ERROR } from '@constants/common'
import { getEntries } from '@components/WebRatings/ducks/selectors'
import Logger from '@utils/logger'

const useNapCellStyles = makeStyles(() => ({
  name: {
    color: '#11141A',
    whiteSpace: 'nowrap',
    fontWeight: 600,
    fontFamily: '"lato", sans-serif',
    fontSize: 13
  }
}))

const NapCell = ({ runInfo, originalRow }) => {
  /* REDUX STORES */
  const classes = useNapCellStyles()
  const { currentDate, earlyStage, isEntrySubmitted } = useSelector(
    (store) => store.races
  )
  const { getEntryType, createEntry } = useEntries()
  const entries = useSelector(getEntries)

  const isActive = useMemo(() => {
    if (originalRow.race_detail && originalRow.race_detail.start_time) {
      const date = new Date(`${originalRow.race_detail.start_time}`)
      return dateConversations.isTodayOrAfter(date)
    }
    return false
  }, [originalRow])

  const isTodayDateOrAfter = useMemo(() => {
    if (originalRow.race_detail && originalRow.race_detail.start_time) {
      const checkDate = dateConversations.getFormattedUtcDate(
        originalRow.race_detail.start_time,
        DEFAULT_DATE_FORMAT,
        dateConversations.checkDST(originalRow.race_detail.start_time)
      )
      const todayDate = dateConversations.getFormattedUtcDate(
        new Date(),
        DEFAULT_DATE_FORMAT,
        dateConversations.checkDST(new Date())
      )
      return dateConversations.isTodayDateOrAfter(checkDate, todayDate)
    }
    return false
  }, [originalRow])

  const handleChangeEntry = async (event) => {
    if (isActive) {
      try {
        createEntry(currentDate, event.value, runInfo.nap_action)
      } catch (e) {
        Logger.error(e)
      }
    } else {
      toast.error(NAP_DATE_ERROR)
    }
  }

  const showMessage = () => {
    if (!isActive) {
      toast.error(NAP_DATE_ERROR)
    }
  }

  const getNapMods = useMemo(
    () =>
      NAPS_MODS.map((mod) => {
        const result = entries.find(({ value }) => mod.value === value)
        if (result && mod.value) {
          mod.label = `${mod.originalLabel} (currently ${
            result.horse_name
          } in ${result.formatted_time}${
            result.formatted_time !==
            dateConversations.getLocalTime(result.start_time, 'HH:mm')
              ? ` / ${dateConversations.getLocalTime(
                  result.start_time,
                  'HH:mm'
                )} Local Time`
              : ''
          } @ ${result.course_name})`
        } else {
          mod.label = mod.originalLabel
        }
        return mod
      }),
    [entries]
  )

  return (
    <>
      {!isEntrySubmitted ? (
        isTodayDateOrAfter && !earlyStage ? (
          <div onClick={showMessage}>
            <Select
              simpleValue
              value={getEntryType(runInfo.nap_action)}
              onChange={handleChangeEntry}
              options={getNapMods}
              className="rtr-select-small"
              classNamePrefix="select"
              isLoading={false}
              isSearchable={false}
              isDisabled={!isActive}
              placeholder=" "
              name="naps-mode"
              smallSize
            />
          </div>
        ) : null
      ) : getEntryType(runInfo.nap_action) ? (
        <span className={classes.name}>
          {getEntryType(runInfo.nap_action).label}
        </span>
      ) : null}
    </>
  )
}
NapCell.propTypes = {
  runInfo: PropTypes.shape({
    id: PropTypes.oneOfType[(PropTypes.string, PropTypes.number)]
  }),
  originalRow: PropTypes.shape({})
}

export default memo(NapCell)
