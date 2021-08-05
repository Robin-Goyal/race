import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomToolbar from '@components/shared/CustomToolbar'
import { fetchStats } from '@components/StatsPage/ducks/actions'
import { Button, useTheme } from '@material-ui/core'
import Table from '@components/shared/RaceTable'
import { getStatsTableConfig } from '@constants/tablesConfigs/statsPage'
import StatsChart from '@components/StatsPage/components/StatsChart'
import { Link as RouterLink } from 'react-router-dom'
import {
  DEFAULT_STATS_GROUP_BY,
  DASHBOARD_TIPSTATS_PERIOD
} from '@constants/common'
import './index.scss'

// eslint-disable-next-line react/prop-types
const TipStats = () => {
  const dispatch = useDispatch()
  const statsStore = useSelector((state) => state.stats)
  const theme = useTheme()
  const [selectedPeriod, setSelectedPeriod] = useState(
    DASHBOARD_TIPSTATS_PERIOD[0].value
  )

  useEffect(() => {
    dispatch(
      fetchStats({
        statsType: selectedPeriod,
        groupBy:
          selectedPeriod === 'entry' ? 'pick-type' : DEFAULT_STATS_GROUP_BY.id,
        body: {
          page: 1,
          dir: statsStore.dir,
          column: statsStore.column,
          filters: statsStore.currentFilters,
          filtersets: statsStore.filtersets
        }
      })
    )
  }, [selectedPeriod])

  const handleChangePeriod = useCallback(
    (e, index) => {
      setSelectedPeriod(DASHBOARD_TIPSTATS_PERIOD[index].value)
    },
    [dispatch]
  )

  const getTableColumns = useMemo(() => {
    const dynamicTitle = selectedPeriod === 'entry' ? 'Pick Type' : 'All'
    const market = 'win'
    return getStatsTableConfig(dynamicTitle, market, false)
  }, [selectedPeriod])

  const getCellProps = useCallback(
    (cellInfo) => ({
      style: {
        textAlign: 'center',
        padding: '0',
        fontSize: 14,
        borderLeft: '1px solid #ddd',
        borderRight: '1px solid #ddd',
        fontFamily: '"lato", sans-serif',
        ...cellInfo.column.style
      }
    }),
    [dispatch]
  )

  const getRowProps = useCallback(
    () => ({
      style: {
        padding: 0,
        borderColor: '#fff'
      }
    }),
    [dispatch]
  )

  return (
    <div className="leader-board dashboard-latest-data">
      <div className="leader-board-table-section">
        <div className="leader-board-table-section-header">
          <div className="leader-board-table-section-header-title">
            <div className="leader-board-table-section-header-title-heading">
              TipStats
            </div>
          </div>
          <div className="leader-board-table-section-header-last-updated">
            <CustomToolbar
              type={selectedPeriod}
              handleChangePeriod={handleChangePeriod}
              isDisabled={statsStore.loading}
              period={DASHBOARD_TIPSTATS_PERIOD}
            />
          </div>
        </div>
        <div className="stats-table">
          <Table
            columns={getTableColumns}
            data={statsStore.rows || []}
            getRowProps={getRowProps}
            getCellProps={getCellProps}
            isStatsPage={true}
            isLoading={statsStore.loading}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={statsStore.loading}
          component={RouterLink}
          to={`/stats/${selectedPeriod}/all/`}
          style={{
            textTransform: 'capitalize',
            marginTop: 10,
            backgroundColor: theme.palette.primary.light,
            color: '#fff'
          }}
        >
          {selectedPeriod === 'entry'
            ? 'Detailed stats for my NAP picks'
            : selectedPeriod === 'selection'
            ? 'Detailed stats for my selections'
            : 'Detailed stats for my NagMes'}
        </Button>
        {statsStore.showChart && statsStore.chartData && (
          <StatsChart chartData={statsStore.chartData} />
        )}
      </div>
    </div>
  )
}

export default TipStats
