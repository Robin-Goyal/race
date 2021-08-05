import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import SEO from '@components/SEO'
import DateFilter from '@components/shared/DateFilter'
import { isAdmin } from '@store/memberStore/selectors'
import ScrollContainer from 'react-indiana-drag-scroll'
import useRaceTableSettings from '@utils/customHook/useRaceTableSettings'
import useEntries from '@utils/customHook/useEntries'
import Storage from '@utils/storage'
import { isExtendedMember } from '@store/memberStore/selectors'
import { getStatsMod } from '@components/WebRatings/ducks/selectors'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import Logger from '@utils/logger'
import { isFree } from '@store/memberStore/selectors'
import { isFreeFriday } from '@store/memberStore/selectors'
import {
  changeCourse,
  changeDate,
  changeStartTime,
  changeStatsMode,
  fetchData,
  getComments,
  fetchDetailedData,
  fetchAllRacesData,
  fetchAllRacesPaginationData,
  updateNagmeInRaces
} from './ducks/actions'
import './index.scss'
import dateConversations from '@utils/timeUtils'
import { toggleModal } from '@store/ui/actions'
// import LazyLoad from 'react-lazyload'
import { MODALS_LIST, SELECTION_DATE_ERROR } from '@constants/common'
import NagmeCreateModal from '@components/shared/NagMe/components/NagmeCreateModal'
import NagmeUpdateModal from '@components/shared/NagMe/components/NagmeUpdateModal'
import RacesSettings from '@components/WebRatings/components/RacesSettings'
// import RaceSkeleton from '@components/WebRatings/components/RaceSkeleton'
import AdvancedRatingModal from '@components/WebRatings/components/AdvancedRatingModal'
import NewVersionModal from '@components/WebRatings/components/NewVersionModal'
import kebabCase from 'lodash/kebabCase'
import { columnsRender } from '@constants/tablesConfigs/racesSettings'
import {
  DEFAULT_DATE_FORMAT,
  TIME_DEFAULT_FORMAT,
  TIME_TRIMMED_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  DATE_DAY_YEAR_FORMAT
} from '@constants/dateFormatsList'
import usePrevious from '@utils/customHook/usePrevious'
import EmptyDataMessage from '@components/shared/EmptyDataMessage'
import helpers from '@utils/helpers'
import {
  getEntries,
  getSelectedRows
} from '@components/WebRatings/ducks/selectors'
import Table from '@components/shared/RaceTable'
import { SELECTED_ROWS_BACKGROUND } from '@constants/tablesConfigs/common'
import useMemberStore from '@utils/customHook/useMembersStore'
import {
  removeSelections,
  removeSelection,
  addSelection,
  resetCourse,
  resetSelections,
  resetStartTime,
  submitSelections,
  downloadSelections
} from '@components/WebRatings/ducks/actions'
import { history } from '@store'
import PropTypes from 'prop-types'
import {
  Tabs,
  Tab,
  Button,
  Tooltip,
  CircularProgress,
  Typography,
  IconButton
} from '@material-ui/core'
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage
} from '@material-ui/icons'
import RaceDetails from '@components/WebRatings/components/RaceDetails'
import RaceComments from '@components/WebRatings/components/RaceComments'
import SelectionConfirmationModal from '@components/WebRatings/components/SelectionConfirmationModal'
import useModal from '@utils/customHook/useModal'
import EntriesModal from '@components/shared/EntriesModal'
import isEqual from 'lodash/isEqual'
import { withStyles, useTheme } from '@material-ui/core/styles'
import SelectionsModal from '@components/shared/SelectionsModal'
import Select from '@components/shared/Form/Select'
import { TABLE_MODS } from '@constants/common'
import { ALL_COLUMNS } from '@constants/tablesConfigs/racesSettings'

const CustomTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.primary.light
  }
}))(Tabs)

const CustomTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: 600,
    color: '#000000CC',
    padding: 0,
    fontSize: 13,
    letterSpacing: 0.65,
    marginRight: 18,
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

const WebRatings = ({ match }) => {
  const dispatch = useDispatch()

  /* REDUX STORES */
  const {
    runs,
    raceDetails,
    courseRaces,
    currentDate,
    isLoading,
    total_pages,
    isSingleRaceLoading,
    isCommentLoading,
    selectedCourse,
    selectedStartTime,
    races,
    isEntrySubmitted,
    isSelectionSubmitted,
    submittedIds,
    allRaces,
    racesCourseNames,
    racesStartTime,
    selectedWp,
    earlyStage,
    isExample
  } = useSelector((store) => store.races)

  const theme = useTheme()

  const {
    columnSettingsData,
    handleColumnsSettingsChange,
    handleSynchroniseScrollbar,
    handleFreezeHorseNameChange,
    handleMemberSettingsChange
  } = useRaceTableSettings()

  const { createEntry } = useEntries()
  const modalStorage = useSelector((store) => store.ui)
  const { memberStorage, fetchMemberRaceColumns } = useMemberStore()
  const isMember = useSelector(isExtendedMember)
  const statsMod = useSelector(getStatsMod)
  const isFreeMember = useSelector(isFree)
  const isFreeFridayMember = useSelector(isFreeFriday)
  const isAdminUser = useSelector(isAdmin)
  /* END REDUX STORES  */

  /* GET CURRENT SELECTED ROWS  */
  const selectedRows = useSelector(getSelectedRows)
  /* END GET CURRENT SELECTED ROWS  */

  /* GET RUNS FROM ENTRY  */
  const entries = useSelector(getEntries)
  /* END GET RUNS FROM ENTRY  */

  /* PREVIOUS VALUES FOR COMPARE ON RERENDER*/
  const previousCurrentDate = usePrevious(currentDate)
  const previousSelectedCourse = usePrevious(selectedCourse)
  const previousSelectedStartTime = usePrevious(selectedStartTime)

  /* END PREVIOUS VALUES FOR COMPARE ON RERENDER*/
  const [sortingHeaders, setSortingHeaders] = useState({})
  const [advancedRatingPopup, setAdvancedRatingPopup] = useState(false)

  const [drawerOpenStatus, setDrawerOpenStatus] = useState(true)

  const [tableRowSelected, setTableRowSelected] = useState(null)
  const [confirmationRowSelected, setConfirmationRowSelected] = useState(null)
  const [selectedRowCount, setSelectedRowCount] = useState(
    selectedRows ? selectedRows.length : 0
  )
  const [isFetching, setIsFetching] = useState(false)
  const [page, _setPage] = useState(1)
  const pageRef = React.useRef(page)
  const totalPageRef = React.useRef(total_pages)
  // const container = React.useRef(null)
  const scrollRefs = {}
  const [scrollEvent, setScrollEvent] = useState(false)

  const setPage = (data) => {
    pageRef.current = data
    _setPage(data)
  }

  useEffect(() => {
    setupCourseTime()
  }, [])

  /* For Auto Delete NAP and Selection with timer */
  useEffect(() => {
    const interval = setInterval(() => {
      // Remove selected runs if date/time passed
      if (selectedRows && selectedRows.length > 0) {
        const notValidSelectedRuns = selectedRows.filter((row) => {
          if (!dateConversations.isTodayOrAfter(row.start_time)) {
            return row
          }
        })
        if (notValidSelectedRuns.length > 0) {
          dispatch(
            removeSelections({
              date: dateConversations.getFormattedDate(currentDate),
              ids: notValidSelectedRuns.map(({ id }) => id),
              onSuccess: () => {
                notValidSelectedRuns.map((row) => {
                  toast.warning(
                    `Selection removed when race started: RTR ${
                      row.rtr_rank
                    }, ${row.horse_name}${
                      row.horse_nationality ? ` (${row.horse_nationality})` : ''
                    } in the ${row.formatted_time} @ ${row.course_name}`
                  )
                })
              },
              onError: (e) => {
                toast.error(`Error: ${e.message}`)
              }
            })
          )
        }
      }
      // Remove selected NAP if date/time passed
      if (entries && entries.length > 0 && !isEntrySubmitted) {
        const removeEntriesRuns = entries.filter((entry) => {
          if (!dateConversations.isTodayOrAfter(entry.start_time)) {
            return entry
          }
        })
        if (removeEntriesRuns.length > 0) {
          removeEntriesRuns.map((removeEntry) => {
            createEntry(currentDate, '', removeEntry.id)
            toast.warning(
              `NAP entry removed when race started: RTR ${
                removeEntry.rtr_rank
              }, ${removeEntry.horse_name}${
                removeEntry.horse_nationality
                  ? ` (${removeEntry.horse_nationality})`
                  : ''
              } in the ${removeEntry.formatted_time} @ ${
                removeEntry.course_name
              }`
            )
          })
        }
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [selectedRows, entries])

  /* For Advanced Ratings PopUp */
  useEffect(() => {
    const popUp = Storage.get('rtr-advanced-rating-popup')
    if (currentDate && !isLoading && !popUp) {
      const checkDate = dateConversations.getFormattedDate(
        currentDate,
        DEFAULT_DATE_FORMAT
      )
      const nextTwoDaysDate = dateConversations
        .addDate(new Date(), 'day', 2)
        .format(DEFAULT_DATE_FORMAT)
      const isAdvancedRating = dateConversations.isTodayDateOrAfter(
        checkDate,
        nextTwoDaysDate
      )
      if (
        (isAdvancedRating && !helpers.isEmptyObject(raceDetails) && runs) ||
        (isAdvancedRating && courseRaces && courseRaces.length > 0) ||
        (isAdvancedRating && allRaces && allRaces.length > 0)
      ) {
        if (!isAdvancedModalOpen && !advancedRatingPopup) {
          setAdvancedRatingPopup(true)
          toggleAdvanceModalOpen()
        }
      }
    }

    const popUpNewVersion = Storage.get('rtr-new-version-popup')
    if (
      currentDate &&
      !isLoading &&
      !popUpNewVersion &&
      !isNewVersionModalOpen
    ) {
      // toggleNewVersionModalOpen()
    }
  }, [currentDate, courseRaces, allRaces, raceDetails, isLoading])

  useEffect(() => {
    if (currentDate) {
      fetchMemberRaceColumns({
        date: dateConversations.getFormattedDate(
          currentDate,
          DEFAULT_DATE_FORMAT
        )
      })
    }
    if (currentDate && previousCurrentDate) {
      dispatch(
        fetchData({
          date: dateConversations.getFormattedDate(
            currentDate,
            DEFAULT_DATE_FORMAT
          ),
          onSuccess: ({ racesCourseNames, racesStartTime }) => {
            if (racesCourseNames.length) {
              dispatch(changeCourse(racesCourseNames[0]))
              dispatch(
                changeStartTime(racesStartTime[racesCourseNames[0].value][0])
              )
            }
          }
        })
      )
      changeUrl(currentDate)
      handleResetFilters()
    }
    if (!previousCurrentDate && currentDate) {
      dispatch(
        fetchData({
          date: dateConversations.getFormattedDate(
            currentDate,
            DEFAULT_DATE_FORMAT
          ),
          onSuccess: ({ racesCourseNames, racesStartTime }) => {
            if (
              racesCourseNames.length &&
              !selectedStartTime &&
              !selectedCourse
            ) {
              dispatch(changeCourse(racesCourseNames[0]))
              dispatch(
                changeStartTime(racesStartTime[racesCourseNames[0].value][0])
              )
            }
          }
        })
      )
    }
  }, [currentDate])

  useEffect(() => {
    /* If we change course and time of race (selectedCourse && selectedStartTime) */
    if (
      selectedCourse &&
      !isEqual(selectedCourse, previousSelectedCourse) &&
      typeof selectedStartTime !== undefined &&
      selectedStartTime !== null &&
      !isEqual(selectedStartTime, previousSelectedStartTime)
    ) {
      changeUrl(currentDate, selectedCourse.value, selectedStartTime)
      dispatch(
        fetchDetailedData({
          date: dateConversations.getFormattedDate(currentDate),
          course: selectedCourse.value,
          time: selectedStartTime
            ? dateConversations.getFormattedUtcDate(
                selectedStartTime,
                TIME_TRIMMED_FORMAT,
                dateConversations.checkDST(selectedStartTime)
              )
            : '',
          onSuccess: (raceDetails) => {
            setTimeout(() => {
              if (
                raceDetails &&
                (isMember ||
                  (dateConversations.getFormattedDate(currentDate, 'dddd') ===
                    'Friday' &&
                    isFreeFridayMember))
              ) {
                dispatch(
                  getComments({
                    date: dateConversations.getFormattedDate(currentDate),
                    course: selectedCourse.value,
                    time: selectedStartTime
                      ? dateConversations.getFormattedUtcDate(
                          selectedStartTime,
                          TIME_TRIMMED_FORMAT,
                          dateConversations.checkDST(selectedStartTime)
                        )
                      : '',
                    id: raceDetails.id,
                    page: 1,
                    hideComments: false
                  })
                )
              }
            }, 0)
          }
        })
      )
      return
    }

    /* If we only change course of race (selectedCourse) */
    if (
      selectedCourse &&
      !isEqual(selectedCourse, previousSelectedCourse) &&
      typeof selectedStartTime !== undefined &&
      selectedStartTime !== null
    ) {
      changeUrl(currentDate, selectedCourse.value, selectedStartTime)
      dispatch(
        fetchDetailedData({
          date: dateConversations.getFormattedDate(currentDate),
          course: selectedCourse.value,
          time: selectedStartTime
            ? dateConversations.getFormattedUtcDate(
                selectedStartTime,
                TIME_TRIMMED_FORMAT,
                dateConversations.checkDST(selectedStartTime)
              )
            : '',
          onSuccess: (raceDetails) => {
            setTimeout(() => {
              if (
                raceDetails &&
                (isMember ||
                  (dateConversations.getFormattedDate(currentDate, 'dddd') ===
                    'Friday' &&
                    isFreeFridayMember))
              ) {
                dispatch(
                  getComments({
                    date: dateConversations.getFormattedDate(currentDate),
                    course: selectedCourse.value,
                    time: selectedStartTime
                      ? dateConversations.getFormattedUtcDate(
                          selectedStartTime,
                          TIME_TRIMMED_FORMAT,
                          dateConversations.checkDST(selectedStartTime)
                        )
                      : '',
                    id: raceDetails.id,
                    page: 1,
                    hideComments: false
                  })
                )
              }
            }, 0)
          }
        })
      )
      return
    }

    /* If we only change time of race time (selectedStartTime) */
    if (
      selectedCourse &&
      typeof selectedStartTime !== undefined &&
      selectedStartTime !== null &&
      !isEqual(selectedStartTime, previousSelectedStartTime)
    ) {
      changeUrl(currentDate, selectedCourse.value, selectedStartTime)
      dispatch(
        fetchDetailedData({
          date: dateConversations.getFormattedDate(currentDate),
          course: selectedCourse.value,
          time: selectedStartTime
            ? dateConversations.getFormattedUtcDate(
                selectedStartTime,
                TIME_TRIMMED_FORMAT,
                dateConversations.checkDST(selectedStartTime)
              )
            : '',
          onSuccess: (raceDetails) => {
            setTimeout(() => {
              if (
                raceDetails &&
                (isMember ||
                  (dateConversations.getFormattedDate(currentDate, 'dddd') ===
                    'Friday' &&
                    isFreeFridayMember))
              ) {
                dispatch(
                  getComments({
                    date: dateConversations.getFormattedDate(currentDate),
                    course: selectedCourse.value,
                    time: selectedStartTime
                      ? dateConversations.getFormattedUtcDate(
                          selectedStartTime,
                          TIME_TRIMMED_FORMAT,
                          dateConversations.checkDST(selectedStartTime)
                        )
                      : '',
                    id: raceDetails.id,
                    page: 1,
                    hideComments: false
                  })
                )
              }
            }, 0)
          }
        })
      )
      return
    }

    /* If we change course and time of race (selectedCourse && selectedStartTime) for All races */
    if (
      !selectedCourse &&
      previousSelectedCourse &&
      typeof selectedStartTime !== undefined &&
      selectedStartTime !== null
    ) {
      changeUrl(currentDate, selectedCourse, selectedStartTime)
      dispatch(
        fetchAllRacesData({
          date: dateConversations.getFormattedDate(
            currentDate,
            DEFAULT_DATE_FORMAT
          ),
          // page: 1,
          onSuccess: (data) => {
            setPage(2)
            totalPageRef.current = data.total_pages
            // setScrollEvent(true)
          },
          onError: (e) => {
            Logger.error(e)
          }
        })
      )
      return
    }
  }, [selectedCourse, selectedStartTime, isMember, isFreeFridayMember])

  useEffect(() => {
    if (!scrollEvent) {
      return
    }
    window.addEventListener('scroll', handleScroll)

    function handleScroll() {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
          document.documentElement.offsetHeight ||
        isFetching ||
        totalPageRef.current < pageRef.current
      )
        return
      setIsFetching(true)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollEvent])

  useEffect(() => {
    if (!isFetching) return
    fetchMoreListItems()
  }, [isFetching])

  const fetchMoreListItems = () => {
    if (!selectedStartTime && !selectedCourse) {
      dispatch(
        fetchAllRacesPaginationData({
          date: dateConversations.getFormattedDate(
            currentDate,
            DEFAULT_DATE_FORMAT
          ),
          page: page,
          onSuccess: () => {
            setPage(page + 1)
            setIsFetching(false)
          },
          onError: (e) => {
            Logger.error(e)
          }
        })
      )
    }
  }

  const changeUrl = (date, course, time) => {
    setPage(1)
    setScrollEvent(false)
    if (date && course && time) {
      const parseTime = dateConversations.getFormattedUtcDate(
        time,
        TIME_DEFAULT_FORMAT,
        dateConversations.checkDST(time)
      )
      return history.push(
        `/races/${date.format(DEFAULT_DATE_FORMAT)}/${course}/${parseTime}`
      )
    }
    if (date && course) {
      return history.push(
        `/races/${date.format(DEFAULT_DATE_FORMAT)}/${course}`
      )
    }
    if (date) {
      return history.push(`/races/${date.format(DEFAULT_DATE_FORMAT)}/`)
    }
  }

  const hideComments = useMemo(
    () => memberStorage.settings && memberStorage.settings.hide_comments,
    [memberStorage.settings]
  )

  const setupCourseTime = () => {
    if (match.params.course && match.params.date) {
      dispatch(changeDate(dateConversations.getRawDate(match.params.date)))

      if (match.params.time) {
        const isDST = dateConversations.checkDST(
          dateConversations
            .getRawDate(`${match.params.date} ${match.params.time}`)
            .format(DEFAULT_DATE_TIME_FORMAT)
        )
        dispatch(
          changeStartTime(
            `${dateConversations
              .getRawDate(`${match.params.date} ${match.params.time}`)
              .format(DEFAULT_DATE_TIME_FORMAT)}${isDST ? '+01:00' : 'Z'}`
          )
        )
      } else {
        // In case of All time selected
        dispatch(changeStartTime(''))
      }

      return dispatch(
        changeCourse({
          value: match.params.course,
          label: helpers.transformRacesQueryCourseName(match.params.course)
        })
      )
    }
    if (match.params.date) {
      return dispatch(
        changeDate(dateConversations.getRawDate(match.params.date))
      )
    }
    dispatch(changeDate(dateConversations.getRawDate(new Date())))
  }

  const [isEntriesModalOpen, toggleEntriesModalState] = useModal(
    MODALS_LIST.ENTRIES_SUBMIT_MODAL
  )
  const [isSelectionsModalOpen, toggleSelectionsModalOpen] = useModal(
    MODALS_LIST.SELECTIONS_SUBMIT_MODAL
  )
  const [isAdvancedModalOpen, toggleAdvanceModalOpen] = useModal(
    MODALS_LIST.ADVANCED_RATING_MODAL
  )
  const [isNewVersionModalOpen, toggleNewVersionModalOpen] = useModal(
    MODALS_LIST.NEW_VERSION_MODAL
  )
  const [
    isSelectionConfirmationOpen,
    toggleSelectionConfirmationModalOpen
  ] = useModal(MODALS_LIST.SELECTION_CONFIRMATION_MODAL)

  const isNagmeModalOpen = useMemo(
    () => modalStorage.openModals.includes(MODALS_LIST.NAGME_CREATING_MODAL),
    [modalStorage.openModals]
  )
  const isUpdateModalOpen = useMemo(
    () => modalStorage.openModals.includes(MODALS_LIST.NAGME_UPDATE_MODAL),
    [modalStorage.openModals]
  )

  const handleSelectRaceTime = (time) => () => {
    dispatch(changeStartTime(time))
  }

  const handleDateChange = useCallback(
    (val) => {
      dispatch(changeDate(dayjs(val)))
    },
    [dispatch]
  )

  const handleSelectStatsMode = useCallback(
    (event) => {
      dispatch(changeStatsMode(event))
    },
    [dispatch, selectedWp]
  )

  const handleResetFilters = () => {
    dispatch(resetCourse())
    dispatch(resetStartTime())
  }

  const handlePreviousRace = () => {
    const raceIndex = races.findIndex(
      (race) =>
        race.course.name === selectedCourse.label &&
        race.start_time === selectedStartTime
    )
    if (raceIndex > -1) {
      const previousRace = races[raceIndex - 1]
      if (previousRace && previousRace.name) {
        dispatch(
          changeCourse({
            value: kebabCase(previousRace.course.name),
            label: previousRace.course.name
          })
        )
        dispatch(changeStartTime(previousRace.start_time))
      }
    }
  }

  const handleNextRace = () => {
    const raceIndex = races.findIndex(
      (race) =>
        race.course.name === selectedCourse.label &&
        race.start_time === selectedStartTime
    )
    if (raceIndex > -1) {
      const nextRace = races[raceIndex + 1]
      if (nextRace && nextRace.name) {
        dispatch(
          changeCourse({
            value: kebabCase(nextRace.course.name),
            label: nextRace.course.name
          })
        )
        dispatch(changeStartTime(nextRace.start_time))
      }
    }
  }

  const handleAddDate = useCallback(() => {
    const newDate = dateConversations.addDate(currentDate, 'day', 1)
    dispatch(changeDate(newDate))
  }, [dispatch, currentDate])

  const handleSubstDate = useCallback(() => {
    const newDate = dateConversations.substractDate(currentDate, 'day', 1)
    dispatch(changeDate(newDate))
  }, [dispatch, currentDate])

  const handleWeeklySubst = useCallback(() => {
    const newDate = dateConversations.substractDate(currentDate, 'week', 1)
    dispatch(changeDate(newDate))
  }, [dispatch, currentDate])

  const handleWeeklyAdd = useCallback(() => {
    const newDate = dateConversations.addDate(currentDate, 'week', 1)
    dispatch(changeDate(newDate))
  }, [dispatch, currentDate])

  const handleClose = () => {
    dispatch(toggleModal(MODALS_LIST.NAGME_CREATING_MODAL))
  }

  const handleCloseUpdateNagMe = () => {
    dispatch(toggleModal(MODALS_LIST.NAGME_UPDATE_MODAL))
  }

  const handleNagmeInRaces = (data, runId) => {
    dispatch(updateNagmeInRaces({ data, runId }))
  }

  const getHiddenColumns = useMemo(
    () =>
      ALL_COLUMNS.filter(
        (elem) =>
          !memberStorage.activeColumns.find(
            ({ value }) => elem.value === value
          ) && elem.value
      ).map((i) => i.value),
    [memberStorage.activeColumns]
  )

  const handleHeaderClick = useCallback((column, key) => {
    if (column && column.length > 0) {
      const raceDetailSection = document.getElementById(`race-detail-${key}`)
      if (raceDetailSection) {
        const sortedBySection = raceDetailSection.getElementsByClassName(
          'sorted-by-section'
        )
        if (sortedBySection && sortedBySection.length > 0) {
          for (let i = 0; i < sortedBySection.length; i++) {
            if (hasClass(sortedBySection[i], 'blink')) {
              removeClass(sortedBySection[i], 'blink')
              setTimeout(() => {
                addClass(sortedBySection[i], 'blink')
              }, 0)
            }
          }
        }
      }
      const columnName = ALL_COLUMNS.filter(
        (elem) => elem.value === column[0].id
      ).map((i) => i.label)
      setSortingHeaders({
        ...sortingHeaders,
        [key]: `${columnName} ${column[0].desc ? '(Desc)' : '(Asc)'}`
      })
    } else {
      setSortingHeaders({
        ...sortingHeaders,
        [key]: ''
      })
    }
  }, [])

  const hasClass = (el, className) => {
    if (el.classList) return el.classList.contains(className)
    return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
  }

  const removeClass = (el, className) => {
    if (el.classList) el.classList.remove(className)
    else if (hasClass(el, className)) {
      const reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
      el.className = el.className.replace(reg, ' ')
    }
  }

  const addClass = (el, className) => {
    if (el.classList) el.classList.add(className)
    else if (!hasClass(el, className)) el.className += ` ${className}`
  }

  /* PROPS FOR ELEMENTS OF TABLE */
  const getRowProps = useCallback(
    (rowInfo) => ({
      style: {
        backgroundColor: rowInfo.isSelected ? SELECTED_ROWS_BACKGROUND : '',
        padding: 0,
        borderColor: '#fff'
      }
    }),
    [dispatch]
  )

  useEffect(() => {
    if (tableRowSelected && tableRowSelected.original) {
      const requestedTime = dateConversations.getTimeStamp()
      if (tableRowSelected.isSelected) {
        setSelectedRowCount(selectedRowCount > 0 ? selectedRowCount - 1 : 0)
        dispatch(
          removeSelection({
            id: tableRowSelected.original.id,
            requestBody: {
              requested_at: requestedTime
            },
            onSuccess: () => {
              setTableRowSelected(null)
            },
            onError: (e) => {
              setSelectedRowCount(selectedRowCount + 1)
              setTableRowSelected(null)
              toast.error(`Error: ${e.message}`)
            }
          })
        )
      } else {
        setSelectedRowCount(selectedRowCount + 1)
        dispatch(
          addSelection({
            id: tableRowSelected.original.id,
            requestBody: {
              requested_at: requestedTime
            },
            onSuccess: () => {
              setTableRowSelected(null)
            },
            onError: (e) => {
              setSelectedRowCount(
                selectedRowCount > 0 ? selectedRowCount - 1 : 0
              )
              setTableRowSelected(null)
              toast.error(`Error: ${e.message}`)
            }
          })
        )
      }
    }
  }, [tableRowSelected])

  useEffect(() => {
    if (confirmationRowSelected && confirmationRowSelected.original) {
      toggleSelectionConfirmationModalOpen()
    }
  }, [confirmationRowSelected])

  useEffect(() => {
    if (selectedRows) {
      setSelectedRowCount(selectedRows.length)
    }
  }, [selectedRows])

  const getCellProps = useCallback(
    (cellInfo, raceInfo) => ({
      style: {
        textAlign: 'center',
        padding: '0',
        fontSize: '13px',
        fontFamily: '"lato", sans-serif',
        height: 30,
        minWidth: cellInfo.column.totalMinWidth || 130,
        ...cellInfo.column.style
      },
      onClick: () => {
        if (
          cellInfo.column &&
          cellInfo.column.id !== 'nap_action' &&
          cellInfo.column.id !== 'horse' &&
          cellInfo.column.id !== 'trainer' &&
          cellInfo.column.id !== 'jockey' &&
          cellInfo.column.id !== 'sire' &&
          cellInfo.column.id !== 'nagme_action' &&
          cellInfo.column.id !== 'cloth' &&
          !cellInfo.column.id.includes('r_values') &&
          !cellInfo.column.id.includes('horse.stats') &&
          !cellInfo.column.id.includes('trainer.stats') &&
          !cellInfo.column.id.includes('jockey.stats') &&
          !cellInfo.column.id.includes('sire.stats') &&
          !cellInfo.column.id.includes('combination_stats') &&
          raceInfo &&
          !earlyStage
        ) {
          const date = dateConversations.getRawDate(raceInfo.start_time)
          if (dateConversations.isTodayOrAfter(date)) {
            if (
              !isSelectionSubmitted ||
              (cellInfo.row && cellInfo.row.isSelected) ||
              (cellInfo.row &&
                cellInfo.row.original &&
                submittedIds.includes(cellInfo.row.original.id))
            ) {
              setTableRowSelected({ ...cellInfo.row })
              cellInfo.row.toggleRowSelected()
            } else {
              setConfirmationRowSelected({ ...cellInfo.row })
            }
          } else {
            toast.dismiss()
            toast.error(SELECTION_DATE_ERROR)
          }
        }
      }
    }),
    [
      currentDate,
      selectedStartTime,
      earlyStage,
      selectedRows,
      isSelectionSubmitted,
      submittedIds
    ]
  )
  const getHeaderProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        padding: '0',
        fontSize: 18
      }
    }),
    [dispatch]
  )
  const getTableColumns = useMemo(
    () =>
      columnsRender(
        memberStorage.horseNameFreeze,
        isMember ||
          (currentDate &&
            dateConversations.getFormattedDate(currentDate, 'dddd') ===
              'Friday' &&
            isFreeFridayMember) ||
          isExample ||
          (raceDetails && raceDetails.is_first),
        statsMod
      ),
    [
      memberStorage.activeColumns,
      memberStorage.horseNameFreeze,
      runs,
      selectedRows,
      statsMod,
      currentDate,
      raceDetails
    ]
  )

  const handleSelectionConfirmation = async (status) => {
    if (confirmationRowSelected && confirmationRowSelected.original) {
      if (status) {
        setTableRowSelected({ ...confirmationRowSelected })
        confirmationRowSelected.toggleRowSelected()
        setConfirmationRowSelected(null)
        toggleSelectionConfirmationModalOpen()
      } else {
        dispatch(
          removeSelections({
            date: dateConversations.getFormattedDate(currentDate),
            ids: selectedRows.map(({ id }) => id),
            onSuccess: () => {
              setTableRowSelected({ ...confirmationRowSelected })
              confirmationRowSelected.toggleRowSelected()
              setConfirmationRowSelected(null)
              toggleSelectionConfirmationModalOpen()
            },
            onError: (e) => {
              setTableRowSelected(null)
              setConfirmationRowSelected(null)
              toggleSelectionConfirmationModalOpen()
              toast.error(`Error: ${e.message}`)
            }
          })
        )
      }
    }
  }

  const handleSubmitSelections = (payload) => {
    const requestedTime = dateConversations.getTimeStamp()
    dispatch(
      submitSelections({
        data: {
          ids: payload.runIds,
          comment: payload.comment || '',
          requested_at: requestedTime
        },
        date: dateConversations.getFormattedDate(currentDate),
        onSuccess: () => {
          toast.success('Your Selections have been submitted')
          payload.cb && payload.cb()
        },
        onError: (e) => {
          toast.error(`Error: ${e.message}`)
          payload.cb && payload.cb()
        }
      })
    )
  }

  const handleDownloadSelections = (payload) => {
    dispatch(
      downloadSelections({
        date: payload.date,
        comment: payload.comment || '',
        onSuccess: () => {
          payload.cb && payload.cb()
        },
        onError: (e) => {
          toast.error(`Error: ${e.message}`)
          payload.cb && payload.cb()
        }
      })
    )
  }

  const handleClearSelections = (cb) => {
    dispatch(
      resetSelections({
        date: dateConversations.getFormattedDate(currentDate),
        onSuccess: () => {
          toast.success('Selections deleted')
          cb && cb()
        },
        onError: (e) => {
          toast.error(e)
          cb && cb()
        }
      })
    )
  }

  const handleSelectRace = useCallback(
    (e, newValue) => {
      const data = racesCourseNames.filter(
        (course) => course.value === newValue
      )
      if (data && data.length > 0) {
        dispatch(changeCourse(data[0]))
        dispatch(changeStartTime(racesStartTime[data[0].value][0]))
      }
    },
    [dispatch, selectedCourse, racesStartTime]
  )

  const handleAllRaces = () => {
    dispatch(changeCourse(null))
    dispatch(changeStartTime(''))
  }

  const getTimeOptions = useMemo(() => {
    if (selectedCourse) {
      return racesStartTime[selectedCourse.value]
    } else {
      return []
    }
  }, [selectedCourse, racesStartTime])

  const calculateDownloadButtonDates = useMemo(() => {
    if (isAdminUser) {
      return true
    } else {
      if (dateConversations.checkTwoDates(currentDate, new Date())) {
        // For today
        return true
      } else if (
        dateConversations.checkTwoDates(
          currentDate,
          dateConversations.addDate(new Date(), 'day', 1)
        )
      ) {
        // For tomorrow
        return true
      } else if (
        dateConversations.isBeforeDate(currentDate) &&
        dateConversations.isTodayDateOrAfter(
          currentDate,
          dateConversations.getRawDate(
            dateConversations
              .substractDate(new Date(), 'day', 3)
              .format(DEFAULT_DATE_FORMAT + ' 00:00:00')
          )
        )
      ) {
        // For last 3 days
        return true
      }
      return false
    }
  }, [currentDate, isAdminUser])

  const getValue = useMemo(() => selectedStartTime, [
    selectedStartTime,
    racesStartTime
  ])

  const selectedRaceIndex = useMemo(() => {
    if (races && races.length > 0 && selectedCourse && selectedStartTime) {
      return races.findIndex(
        (race) =>
          race.course.name === selectedCourse.label &&
          race.start_time === selectedStartTime
      )
    }
    return -1
  }, [selectedCourse, selectedStartTime, races])

  const redirectToRace = (course, time) => {
    dispatch(
      changeCourse({
        value: kebabCase(course.name),
        label: course.name
      })
    )
    dispatch(changeStartTime(time))
  }

  const handleDrawerToggle = () => {
    setDrawerOpenStatus(!drawerOpenStatus)
  }

  const onScrollTable = (scrollValue, key, synchroniseScrollbar) => {
    if (scrollRefs[key] && synchroniseScrollbar) {
      Object.keys(scrollRefs).forEach((innerkey) => {
        if (
          Number(innerkey) !== key &&
          scrollRefs[Number(innerkey)] &&
          scrollRefs[Number(innerkey)].container &&
          scrollRefs[Number(innerkey)].container.current
        ) {
          scrollRefs[
            Number(innerkey)
          ].container.current.scrollLeft = scrollValue
          scrollRefs[Number(innerkey)].container.current.scrollTop = scrollValue
        }
      })
    }
  }

  const setRef = (key, ref) => {
    scrollRefs[key] = ref
  }

  const getTitle = () =>
    `${
      selectedStartTime
        ? `${dateConversations.getFormattedUtcDate(
            selectedStartTime,
            TIME_DEFAULT_FORMAT,
            dateConversations.checkDST(selectedStartTime)
          )} `
        : ''
    }${selectedCourse && currentDate ? `${selectedCourse.label} - ` : ''}${
      !selectedCourse && !selectedStartTime && currentDate
        ? isFreeMember
          ? 'WebRaces - '
          : 'WebRatings - '
        : ''
    }${currentDate ? currentDate.format(DATE_DAY_YEAR_FORMAT) : ''}`

  const raceTableData = (
    key,
    raceDetails,
    runs,
    startTime,
    isLoading,
    showLink,
    showBothLink
  ) => (
    <React.Fragment key={key}>
      <RaceDetails
        key={key}
        datakey={key}
        currentDate={currentDate}
        raceInfo={raceDetails}
        selectedStartTime={startTime}
        isLoading={isLoading}
        showLink={showLink}
        sortName={sortingHeaders[key]}
        showBothLink={showBothLink}
        redirectToRace={redirectToRace}
      />
      <div className="races__wrapper">
        <div
          className={`races__table${
            statsMod && statsMod.value === 'place_sr'
              ? ' placeSRStat'
              : statsMod && statsMod.value === 'win_pr'
              ? ' winPRStat'
              : ''
          }`}
        >
          <ScrollContainer
            className="scroll-container"
            horizontal={true}
            vertical={false}
            hideScrollbars={false}
            ref={(ref) => setRef(key, ref)}
            onScroll={(scrollValue) =>
              onScrollTable(
                scrollValue,
                key,
                memberStorage.synchroniseScrollbar
              )
            }
          >
            <Table
              columns={getTableColumns}
              data={runs}
              isHover={true}
              isLoading={isLoading}
              getRowProps={getRowProps}
              getCellProps={getCellProps}
              getHeaderProps={getHeaderProps}
              hiddenColumns={getHiddenColumns}
              selectedRows={selectedRows}
              raceInfo={raceDetails}
              handleHeaderClick={(column) => handleHeaderClick(column, key)}
              headerBackgroundColor={
                (statsMod && statsMod.value) === 'place_sr'
                  ? '#0e4216'
                  : statsMod && statsMod.value === 'win_pr'
                  ? '#229'
                  : theme.palette.primary.light
              }
            />
          </ScrollContainer>
        </div>
      </div>
      {(isMember ||
        (currentDate &&
          dateConversations.getFormattedDate(currentDate, 'dddd') ===
            'Friday' &&
          isFreeFridayMember)) &&
        !hideComments && (
          <RaceComments
            raceInfo={raceDetails}
            currentDate={currentDate}
            selectedStartTime={startTime}
            isLoading={isLoading}
            isCommentLoading={isCommentLoading}
          />
        )}
    </React.Fragment>
  )

  /* PROPS FOR ELEMENTS OF TABLE */
  return (
    <>
      <div className="row">
        <SEO title={getTitle()} />
        <div className="col-xs-12" style={{ paddingTop: isLoading ? 20 : 0 }}>
          <div id="page-wrapper">
            <div id="page-inner">
              <div
                className={
                  !isLoading && !isSingleRaceLoading
                    ? 'web-rating-top-section'
                    : ''
                }
              >
                <div
                  className={
                    !drawerOpenStatus
                      ? 'web-rating-top-section-main hide'
                      : 'web-rating-top-section-main'
                  }
                >
                  {!isLoading && (
                    <div className="row web-rating-top-race-settings">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 remove-padding-1">
                        <div className="main-bojects-controls">
                          <div className="inner-menu-controls">
                            {racesCourseNames && racesCourseNames.length > 0 && (
                              <CustomTabs
                                value={
                                  selectedCourse ? selectedCourse.value : false
                                }
                                onChange={handleSelectRace}
                                aria-label="Users"
                                variant="scrollable"
                                scrollButtons="off"
                              >
                                {racesCourseNames.map((el) => {
                                  const label =
                                    racesStartTime && racesStartTime[el.value]
                                      ? `${el.actualLabel} (${
                                          racesStartTime[el.value].length
                                        })`
                                      : el.actualLabel
                                  return (
                                    <CustomTab
                                      key={el.value}
                                      label={label}
                                      value={el.value}
                                    />
                                  )
                                })}
                              </CustomTabs>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 remove-padding">
                        <div className="main-bojects-controls">
                          <div className="inner-menu2-controls">
                            <ul className="main-obj2-menu">
                              <li>
                                <Button
                                  type="button"
                                  color="primary"
                                  size="small"
                                  disabled={isLoading}
                                  onClick={toggleSelectionsModalOpen}
                                  style={{ textTransform: 'none', height: 26 }}
                                  className={
                                    selectedRowCount > 0
                                      ? 'select-higlighted'
                                      : ''
                                  }
                                >
                                  Select{' '}
                                  <span className="new-bdge">
                                    {selectedRowCount}
                                  </span>
                                </Button>
                              </li>
                              <li className="main-space">
                                <Button
                                  className={
                                    entries.length === 3 && !isEntrySubmitted
                                      ? 'nap-higlighted'
                                      : ''
                                  }
                                  type="button"
                                  color="primary"
                                  size="small"
                                  disabled={isLoading}
                                  onClick={toggleEntriesModalState}
                                  style={
                                    isEntrySubmitted
                                      ? {
                                          textTransform: 'none',
                                          height: 26,
                                          backgroundColor: '#337ab7',
                                          color: '#fff'
                                        }
                                      : { textTransform: 'none', height: 26 }
                                  }
                                >
                                  NAP:{' '}
                                  {isEntrySubmitted
                                    ? 'Submitted'
                                    : `${entries.length}/3`}
                                </Button>
                              </li>
                              <li className="main-space">
                                <Select
                                  simpleValue
                                  value={selectedWp}
                                  onChange={handleSelectStatsMode}
                                  options={TABLE_MODS}
                                  className="rtr-select-small"
                                  classNamePrefix="select"
                                  isLoading={false}
                                  isDisabled={isLoading}
                                  isSearchable={false}
                                  name="stats-mode"
                                  placeholder="WP"
                                  smallSize
                                />
                              </li>
                              <li className="main-space">
                                <RacesSettings
                                  columnSettingsData={columnSettingsData}
                                  memberSettings={memberStorage}
                                  handleColumnsSettingsChange={
                                    handleColumnsSettingsChange
                                  }
                                  handleMemberSettingsChange={
                                    handleMemberSettingsChange
                                  }
                                  handleFreezeHorseNameChange={
                                    handleFreezeHorseNameChange
                                  }
                                  handleSynchroniseScrollbar={
                                    handleSynchroniseScrollbar
                                  }
                                  showDownloadButtons={
                                    calculateDownloadButtonDates
                                  }
                                  currentDate={currentDate}
                                />
                              </li>
                              {selectedCourse && (
                                <li className="main-space rtr-all-races">
                                  <div className="bordr-ll">
                                    <Tooltip title={'One day backward'}>
                                      <span>
                                        <Button
                                          type="button"
                                          color="primary"
                                          size="small"
                                          disabled={isLoading}
                                          style={{
                                            textTransform: 'none',
                                            height: 26
                                          }}
                                          onClick={handleSubstDate}
                                        >
                                          <FirstPage
                                            style={{ width: 18, height: 18 }}
                                          />
                                        </Button>
                                      </span>
                                    </Tooltip>
                                  </div>
                                  {races &&
                                    races.length > 0 &&
                                    selectedStartTime && (
                                      <div className="bordr-ll">
                                        <Tooltip title={'Previous Race'}>
                                          <span>
                                            <Button
                                              type="button"
                                              color="primary"
                                              size="small"
                                              disabled={
                                                isLoading ||
                                                selectedRaceIndex === 0
                                              }
                                              style={{
                                                textTransform: 'none',
                                                height: 26
                                              }}
                                              onClick={handlePreviousRace}
                                            >
                                              <ChevronLeft
                                                style={{
                                                  width: 18,
                                                  height: 18
                                                }}
                                              />
                                            </Button>
                                          </span>
                                        </Tooltip>
                                      </div>
                                    )}
                                  <Button
                                    type="button"
                                    color="primary"
                                    size="small"
                                    disabled={isLoading}
                                    onClick={handleAllRaces}
                                    style={{
                                      textTransform: 'none',
                                      height: 26
                                    }}
                                  >
                                    All Races
                                  </Button>
                                  {races &&
                                    races.length > 0 &&
                                    selectedStartTime && (
                                      <div className="bordr-l">
                                        <Tooltip title={'Next Race'}>
                                          <span>
                                            <Button
                                              type="button"
                                              color="primary"
                                              size="small"
                                              disabled={
                                                isLoading ||
                                                selectedRaceIndex ===
                                                  races.length - 1
                                              }
                                              style={{
                                                textTransform: 'none',
                                                height: 26
                                              }}
                                              onClick={handleNextRace}
                                            >
                                              <ChevronRight
                                                style={{
                                                  width: 18,
                                                  height: 18
                                                }}
                                              />
                                            </Button>
                                          </span>
                                        </Tooltip>
                                      </div>
                                    )}
                                  <div className="bordr-l">
                                    <Tooltip title={'One day forward'}>
                                      <span>
                                        <Button
                                          type="button"
                                          color="primary"
                                          size="small"
                                          disabled={isLoading}
                                          style={{
                                            textTransform: 'none',
                                            height: 26
                                          }}
                                          onClick={handleAddDate}
                                        >
                                          <LastPage
                                            style={{ width: 18, height: 18 }}
                                          />
                                        </Button>
                                      </span>
                                    </Tooltip>
                                  </div>
                                </li>
                              )}
                              {!selectedStartTime && !selectedCourse && (
                                <li className="main-space rtr-all-races">
                                  <DateFilter
                                    isLoading={isLoading}
                                    date={currentDate}
                                    handleAddDate={handleAddDate}
                                    handleSubstDate={handleSubstDate}
                                    isWeeklyToggle={true}
                                    isDataPicker={true}
                                    handleBackwardWeek={handleWeeklySubst}
                                    handleForwardWeek={handleWeeklyAdd}
                                    handleDateChange={handleDateChange}
                                  />
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row" style={{ marginBottom: 5 }}>
                    <div className="col-xs-12 col-sm-12 col-md-12 remove-padding-1">
                      <div className="main-timer-controls">
                        <div className="inner-timer-controls">
                          {getTimeOptions && getTimeOptions.length > 0 && (
                            <ul className="controls-timer">
                              {getTimeOptions.map((el) => (
                                <li
                                  className={getValue === el ? 'active' : ''}
                                  key={el}
                                  onClick={handleSelectRaceTime(el)}
                                >
                                  {dateConversations.getFormattedDate(
                                    el,
                                    TIME_DEFAULT_FORMAT
                                  )}
                                </li>
                              ))}
                              <li
                                className={getValue === '' ? 'active' : ''}
                                onClick={handleSelectRaceTime('')}
                              >
                                All
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-timer-controls-arrow">
                  <Tooltip
                    title={`${
                      !drawerOpenStatus ? 'Show race info' : 'Hide race info'
                    }`}
                  >
                    <IconButton
                      className="main-timer-controls-arrow-icon"
                      color="inherit"
                      onClick={handleDrawerToggle}
                    >
                      {drawerOpenStatus ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              <div
                className={
                  !isLoading && !isSingleRaceLoading
                    ? !selectedStartTime && !selectedCourse
                      ? !drawerOpenStatus
                        ? 'web-rating-main-section web-rating-main-section-allraces low-margin'
                        : 'web-rating-main-section web-rating-main-section-allraces'
                      : !drawerOpenStatus
                      ? 'web-rating-main-section low-margin'
                      : 'web-rating-main-section'
                    : ''
                }
              >
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 remove-padding-1">
                    {selectedStartTime &&
                    !helpers.isEmptyObject(raceDetails) &&
                    runs ? (
                      raceTableData(
                        raceDetails.id,
                        raceDetails,
                        runs,
                        selectedStartTime,
                        isLoading || isSingleRaceLoading,
                        false,
                        false
                      )
                    ) : (
                      <>
                        {selectedStartTime === '' &&
                        courseRaces &&
                        courseRaces.length > 0 ? (
                          <>
                            {courseRaces.map((race) => (
                              <div key={race.id}>
                                {raceTableData(
                                  race.id,
                                  race,
                                  race.runs,
                                  race.start_time,
                                  isLoading || isSingleRaceLoading,
                                  true,
                                  false
                                )}
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {!selectedStartTime &&
                            !selectedCourse &&
                            allRaces &&
                            allRaces.length > 0 ? (
                              <>
                                {allRaces.map((race) => (
                                  <div key={race.id}>
                                    {raceTableData(
                                      race.id,
                                      race,
                                      race.runs,
                                      race.start_time,
                                      isLoading || isSingleRaceLoading,
                                      true,
                                      true
                                    )}
                                  </div>
                                ))}
                              </>
                            ) : (
                              <>
                                <div className="races__wrapper" />
                                <EmptyDataMessage
                                  isLoading={isLoading || isSingleRaceLoading}
                                  message="No races for this date"
                                  loadingMessage={
                                    <div className="rtr-loading-message">
                                      <Typography>
                                        Please wait, the races are loading...
                                      </Typography>
                                      <Typography>
                                        We thank you for your patience
                                      </Typography>
                                    </div>
                                  }
                                />
                              </>
                            )}
                            {isFetching && (
                              <div
                                style={{
                                  textAlign: 'center',
                                  margin: '20px 0'
                                }}
                              >
                                <CircularProgress
                                  color="primary"
                                  disableShrink
                                />
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NagmeCreateModal
        isOpen={isNagmeModalOpen}
        onClose={handleClose}
        handleClose={handleClose}
        handleNagmeInRaces={handleNagmeInRaces}
        noteMaxLength={memberStorage.noteMaxLength}
      />
      <NagmeUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateNagMe}
        handleClose={handleCloseUpdateNagMe}
        handleNagmeInRaces={handleNagmeInRaces}
        noteMaxLength={memberStorage.noteMaxLength}
      />
      {isEntriesModalOpen && (
        <EntriesModal
          isOpen={isEntriesModalOpen}
          date={currentDate}
          isEntrySubmitted={isEntrySubmitted}
          handleClose={toggleEntriesModalState}
        />
      )}
      {isSelectionsModalOpen && (
        <SelectionsModal
          isOpen={isSelectionsModalOpen}
          handleClose={toggleSelectionsModalOpen}
          date={currentDate}
          handleSubmitSelections={handleSubmitSelections}
          handleClearSelections={handleClearSelections}
          handleDownloadSelections={handleDownloadSelections}
        />
      )}
      {isAdvancedModalOpen && (
        <AdvancedRatingModal
          isOpen={isAdvancedModalOpen}
          handleClose={toggleAdvanceModalOpen}
        />
      )}
      {isNewVersionModalOpen && (
        <NewVersionModal
          isOpen={isNewVersionModalOpen}
          handleClose={toggleNewVersionModalOpen}
        />
      )}
      {isSelectionConfirmationOpen && (
        <SelectionConfirmationModal
          isOpen={isSelectionConfirmationOpen}
          handleClose={toggleSelectionConfirmationModalOpen}
          handleSelectionConfirmation={handleSelectionConfirmation}
        />
      )}
    </>
  )
}

WebRatings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      time: PropTypes.string,
      course: PropTypes.string,
      date: PropTypes.string
    })
  })
}

export default WebRatings
