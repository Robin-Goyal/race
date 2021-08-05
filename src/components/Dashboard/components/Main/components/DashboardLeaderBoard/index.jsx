import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { fetchData } from '@components/LeaderBoards/ducks/actions'
import CustomToolbar from '@components/shared/CustomToolbar'
import { isAdmin } from '@store/memberStore/selectors'
import CustomTable from '@components/shared/CustomTable'
import leaderBoardTable from '@constants/tablesConfigs/leaderBoards'
import cloneDeepWith from 'lodash/cloneDeepWith'
import { DASHBOARD_LEADERBOARD_TIMES_PERIOD } from '@constants/common'
import { MTableHeader } from 'material-table'
import { DEFAULT_SORT_DIR, DEFAULT_SORT_ID } from '@constants/common'
import './index.scss'

// eslint-disable-next-line react/prop-types
const DashboardLeaderBoard = () => {
  const isAdminUser = useSelector(isAdmin)
  const [timePeriodState, setTimePeriodState] = useState({
    type: DASHBOARD_LEADERBOARD_TIMES_PERIOD[1].value,
    currentDate: dayjs(),
    format: DASHBOARD_LEADERBOARD_TIMES_PERIOD[1].dateFormat,
    isDate: DASHBOARD_LEADERBOARD_TIMES_PERIOD[1].isDate,
    displayName: DASHBOARD_LEADERBOARD_TIMES_PERIOD[1].displayName,
    tableColumnsType: DASHBOARD_LEADERBOARD_TIMES_PERIOD[1].tableColumnsType
  })
  const tableRef = useRef(null)
  /* Redux dispatch and store */
  const dispatch = useDispatch()
  const leaderboardStore = useSelector((state) => state.leaderboard)
  const { loggedIn } = useSelector((store) => store.member)

  useEffect(() => {
    dispatch(
      fetchData({
        date: timePeriodState.currentDate,
        type: timePeriodState.type,
        dir: 'asc',
        page: 1,
        data: 1,
        dashboard: true
      })
    )
    return () => {}
  }, [timePeriodState])

  const getColumns = useMemo(() => {
    if (isAdminUser) {
      return [
        ...leaderBoardTable.header(
          timePeriodState.tableColumnsType,
          timePeriodState.type,
          timePeriodState.displayName,
          false,
          loggedIn
        ),
        ...leaderBoardTable.header(
          'admin',
          timePeriodState.type,
          timePeriodState.displayName,
          false,
          loggedIn
        )
      ]
    } else {
      return leaderBoardTable.header(
        timePeriodState.tableColumnsType,
        timePeriodState.type,
        timePeriodState.displayName,
        false,
        loggedIn
      )
    }
  }, [timePeriodState, isAdminUser, loggedIn])

  const handleChangePeriod = useCallback(
    (e, index) => {
      const newPeriod = {
        type: DASHBOARD_LEADERBOARD_TIMES_PERIOD[index].value,
        format: DASHBOARD_LEADERBOARD_TIMES_PERIOD[index].dateFormat,
        isDate: DASHBOARD_LEADERBOARD_TIMES_PERIOD[index].isDate,
        displayName: DASHBOARD_LEADERBOARD_TIMES_PERIOD[index].displayName,
        tableColumnsType:
          DASHBOARD_LEADERBOARD_TIMES_PERIOD[index].tableColumnsType
      }
      setTimePeriodState((prevState) => ({
        ...prevState,
        ...newPeriod
      }))
    },
    [dispatch]
  )

  /* START Sort functionality  */
  const isSortingAvailable = false
  const getSortOrderId = () => DEFAULT_SORT_ID
  const getSortOrderDir = () => DEFAULT_SORT_DIR
  /* END Sort functionality  */

  return (
    <div className="leader-board">
      <div className="leader-board-table-section">
        <div className="leader-board-table-section-header">
          <div className="leader-board-table-section-header-title">
            Leaderboards
          </div>
          <div className="leader-board-table-section-header-last-updated">
            <CustomToolbar
              type={timePeriodState.type}
              handleChangePeriod={handleChangePeriod}
              isDisabled={leaderboardStore.loading}
              period={DASHBOARD_LEADERBOARD_TIMES_PERIOD}
            />
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
          components={{
            Header: (props) => (
              <MTableHeader
                {...props}
                orderBy={getSortOrderId()}
                orderDirection={getSortOrderDir()}
              />
            )
          }}
          isLoading={leaderboardStore.loading}
        />
      </div>
    </div>
  )
}

export default DashboardLeaderBoard
