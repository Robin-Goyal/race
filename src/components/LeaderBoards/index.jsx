/* eslint-disable react/prop-types */
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import {
  DEFAULT_DATE_FORMAT,
  DATE_DAY_YEAR_FORMAT
} from '@constants/dateFormatsList'
import { fetchData } from '@components/LeaderBoards/ducks/actions'
import CustomToolbar from '@components/shared/CustomToolbar'
import DateFilter from '@components/shared/DateFilter'
import { isAdmin } from '@store/memberStore/selectors'
import { history } from '@store'
import dayjs from 'dayjs'
import CustomTable from '@components/shared/CustomTable'
import dateConversations from '@utils/timeUtils'
import leaderBoardTable from '@constants/tablesConfigs/leaderBoards'
import cloneDeepWith from 'lodash/cloneDeepWith'
import { LEADERBOARD_TIMES_PERIOD } from '@constants/common'
import { MTableHeader } from 'material-table'
import SEO from '@components/SEO'
import { DEFAULT_SORT_DIR, DEFAULT_SORT_ID } from '@constants/common'
import './index.scss'

// eslint-disable-next-line react/prop-types
const LeaderBoards = ({ match }) => {
  const isAdminUser = useSelector(isAdmin)
  const typeIndex = LEADERBOARD_TIMES_PERIOD.findIndex(
    (item) => item.value === (match.params.type || 'day')
  )
  const [timePeriodState, setTimePeriodState] = useState({
    type: LEADERBOARD_TIMES_PERIOD[typeIndex].value,
    currentDate:
      match.params.detail &&
      dayjs(match.params.detail, DEFAULT_DATE_FORMAT).isValid()
        ? dayjs(match.params.detail)
        : dayjs(),
    displayName: LEADERBOARD_TIMES_PERIOD[typeIndex].displayName,
    format: LEADERBOARD_TIMES_PERIOD[typeIndex].dateFormat,
    isDate: LEADERBOARD_TIMES_PERIOD[typeIndex].isDate,
    tableColumnsType: LEADERBOARD_TIMES_PERIOD[typeIndex].tableColumnsType,
    detail:
      match.params.detail &&
      !dayjs(match.params.detail, DEFAULT_DATE_FORMAT).isValid()
        ? match.params.detail
        : '',
    extra: match.params.extra ? match.params.extra : ''
  })
  const [pageCurrent, setPage] = useState(1)
  const tableRef = useRef(null)
  /* Redux dispatch and store */
  const dispatch = useDispatch()
  const leaderboardStore = useSelector((state) => state.leaderboard)
  const { loggedIn } = useSelector((store) => store.member)

  useEffect(() => {
    setPage(1)
    dispatch(
      fetchData({
        date: timePeriodState.currentDate,
        type: timePeriodState.type,
        detail: timePeriodState.detail,
        extra: timePeriodState.extra
      })
    )
    return () => {}
  }, [timePeriodState])

  useEffect(() => {
    if (
      match.params.detail &&
      !dayjs(match.params.detail, DEFAULT_DATE_FORMAT).isValid()
    ) {
      setPage(1)
      dispatch(
        fetchData({
          date: timePeriodState.currentDate,
          type: timePeriodState.type,
          detail: match.params.detail,
          extra: match.params.extra ? match.params.extra : ''
        })
      )
    }
    return () => {}
  }, [match?.params?.detail])

  const updateUrl = (
    type = timePeriodState.type,
    date = timePeriodState.currentDate
  ) => {
    if (
      type === 'all-time' ||
      type === 'courses' ||
      type === 'race-types' ||
      type === 'events'
    ) {
      history.push(`/leaderboards/${type}/`)
    } else {
      history.push(`/leaderboards/${type}/${date.format(DEFAULT_DATE_FORMAT)}/`)
    }
  }

  const handleChangePeriod = useCallback(
    (e, index) => {
      const newPeriod = {
        type: LEADERBOARD_TIMES_PERIOD[index].value,
        format: LEADERBOARD_TIMES_PERIOD[index].dateFormat,
        isDate: LEADERBOARD_TIMES_PERIOD[index].isDate,
        currentDate:
          LEADERBOARD_TIMES_PERIOD[index].value === 'week'
            ? dayjs().weekday(6)
            : dayjs(),
        displayName: LEADERBOARD_TIMES_PERIOD[index].displayName,
        tableColumnsType: LEADERBOARD_TIMES_PERIOD[index].tableColumnsType,
        detail: '',
        extra: ''
      }
      setTimePeriodState((prevState) => ({
        ...prevState,
        ...newPeriod
      }))
      updateUrl(newPeriod.type, newPeriod.currentDate)
    },
    [dispatch]
  )

  const handleAddDate = () => {
    const newDate = dateConversations.addDate(
      timePeriodState.currentDate,
      timePeriodState.type,
      1
    )
    setTimePeriodState((prevState) => ({ ...prevState, currentDate: newDate }))
    updateUrl(timePeriodState.type, newDate)
  }

  const handleSubstDate = () => {
    const newDate = dateConversations.substractDate(
      timePeriodState.currentDate,
      timePeriodState.type,
      1
    )
    setTimePeriodState((prevState) => ({
      ...prevState,
      currentDate: newDate
    }))
    updateUrl(timePeriodState.type, newDate)
  }

  const isDoubleArrowsShown = () => timePeriodState.type === 'day'

  const handleWeeklyAdd = () => {
    const newDate = dateConversations.addDate(
      timePeriodState.currentDate,
      'week',
      1
    )
    setTimePeriodState((prevState) => ({ ...prevState, currentDate: newDate }))
    updateUrl(timePeriodState.type, newDate)
  }

  const handleWeeklySubst = () => {
    const newDate = dateConversations.substractDate(
      timePeriodState.currentDate,
      'week',
      1
    )
    setTimePeriodState((prevState) => ({
      ...prevState,
      currentDate: newDate
    }))
    updateUrl(timePeriodState.type, newDate)
  }

  const getColumns = useMemo(() => {
    if (isAdminUser) {
      return [
        ...leaderBoardTable.header(
          timePeriodState.tableColumnsType,
          timePeriodState.type,
          timePeriodState.displayName,
          match.params.detail &&
            !dayjs(match.params.detail, DEFAULT_DATE_FORMAT).isValid(),
          loggedIn,
          dateConversations.isDateToday(timePeriodState.currentDate)
        ),
        ...leaderBoardTable.header(
          'admin',
          timePeriodState.type,
          timePeriodState.displayName,
          match.params.detail &&
            !dayjs(match.params.detail, DEFAULT_DATE_FORMAT).isValid(),
          loggedIn,
          dateConversations.isDateToday(timePeriodState.currentDate)
        )
      ]
    } else {
      return leaderBoardTable.header(
        timePeriodState.tableColumnsType,
        timePeriodState.type,
        timePeriodState.displayName,
        match.params.detail &&
          !dayjs(match.params.detail, DEFAULT_DATE_FORMAT).isValid(),
        loggedIn,
        dateConversations.isDateToday(timePeriodState.currentDate)
      )
    }
  }, [timePeriodState, isAdminUser, match?.params?.detail, loggedIn])

  /* START Sort functionality  */
  const isSortingAvailable =
    leaderboardStore && leaderboardStore.rows && leaderboardStore.rows.length
      ? true
      : false
  const handleOrderChange = (a, b) => {
    dispatch(
      fetchData({
        date: timePeriodState.currentDate,
        type: timePeriodState.type,
        detail: timePeriodState.detail,
        extra: timePeriodState.extra,
        page: pageCurrent,
        dir: b,
        column: getColumns[a].field
      })
    )
  }
  const getSortOrderId = () =>
    isSortingAvailable && leaderboardStore.settings.order
      ? getColumns.findIndex(
          (i) => i.field === leaderboardStore.settings.order.column
        )
      : DEFAULT_SORT_ID
  const getSortOrderDir = () =>
    isSortingAvailable && leaderboardStore.settings.order
      ? leaderboardStore.settings.order.dir
      : DEFAULT_SORT_DIR
  /* END Sort functionality  */

  const handleChangePage = (e, page) => {
    setPage(page)
    dispatch(
      fetchData({
        date: timePeriodState.currentDate,
        type: timePeriodState.type,
        detail: timePeriodState.detail,
        extra: timePeriodState.extra,
        page: page,
        dir:
          isSortingAvailable && leaderboardStore.settings.order
            ? leaderboardStore.settings.order.dir
            : '',
        column:
          isSortingAvailable && leaderboardStore.settings.order
            ? leaderboardStore.settings.order.column
            : ''
      })
    )
  }

  const getTitle = () =>
    `${
      timePeriodState.isDate
        ? `${timePeriodState.currentDate.format(DATE_DAY_YEAR_FORMAT)} - `
        : `${LEADERBOARD_TIMES_PERIOD[typeIndex].label} - `
    }${
      match.params.detail &&
      !dayjs(match.params.detail, DEFAULT_DATE_FORMAT).isValid() &&
      leaderboardStore.selectedName
        ? `${leaderboardStore.selectedName} - `
        : ''
    }Leaderboard`

  return (
    <div className="row leader-board">
      <SEO title={getTitle()} />
      <div
        className="col-xs-12"
        style={{ paddingTop: leaderboardStore.loading ? 20 : 0 }}
      >
        <div id="page-wrapper">
          <div id="page-inner">
            {!leaderboardStore.loading && (
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 remove-padding-1">
                  <div className="main-bojects-controls">
                    <div className="inner-menu-controls">
                      <CustomToolbar
                        type={timePeriodState.type}
                        handleChangePeriod={handleChangePeriod}
                        isDisabled={leaderboardStore.loading}
                        period={LEADERBOARD_TIMES_PERIOD}
                        date={dayjs()}
                        selectedName={
                          match.params.detail &&
                          !dayjs(
                            match.params.detail,
                            DEFAULT_DATE_FORMAT
                          ).isValid()
                            ? leaderboardStore.selectedName
                            : ''
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 remove-padding">
                  <div className="leader-board-header-right-section">
                    {leaderboardStore.pagination &&
                      leaderboardStore.pagination.totalPages > 1 && (
                        <div
                          className="pagination-wrap"
                          style={{ marginRight: 20 }}
                        >
                          <Pagination
                            count={leaderboardStore.pagination.totalPages}
                            page={pageCurrent}
                            onChange={handleChangePage}
                            color="primary"
                          />
                        </div>
                      )}
                    {timePeriodState.isDate && (
                      <DateFilter
                        isLoading={leaderboardStore.loading}
                        dateFormat={timePeriodState.format}
                        date={timePeriodState.currentDate}
                        dateType={timePeriodState.type}
                        handleAddDate={handleAddDate}
                        handleSubstDate={handleSubstDate}
                        isWeeklyToggle={isDoubleArrowsShown()}
                        handleBackwardWeek={handleWeeklySubst}
                        handleForwardWeek={handleWeeklyAdd}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 remove-padding-1">
                <div className="leader-board-table-section">
                  <div className="leader-board-table-section-header">
                    <div className="leader-board-table-section-header-title">
                      Leaderboards
                    </div>
                    <div className="leader-board-table-section-header-last-updated">
                      {leaderboardStore.updated_at && (
                        <Typography>{leaderboardStore.updated_at}</Typography>
                      )}
                    </div>
                  </div>
                  <CustomTable
                    tableRef={tableRef}
                    columns={getColumns}
                    data={cloneDeepWith(leaderboardStore.rows)}
                    options={{
                      sorting: isSortingAvailable,
                      isLoading: leaderboardStore.loading,
                      loadingType: 'overlay',
                      paging: false
                    }}
                    onOrderChange={handleOrderChange}
                    components={{
                      Header: (props) => (
                        <MTableHeader
                          {...props}
                          onOrderChange={handleOrderChange}
                          orderBy={getSortOrderId()}
                          orderDirection={getSortOrderDir()}
                        />
                      )
                    }}
                    isLoading={leaderboardStore.loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoards
