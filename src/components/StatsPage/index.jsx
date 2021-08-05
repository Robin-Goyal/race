import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUserFilter,
  fetchConfig,
  fetchStats,
  updateFilterSet,
  updateSorting
} from './ducks/actions'
import SEO from '@components/SEO'
import FilterBlock from './components/FilterBlock'
import EmptyDataMessage from '@components/shared/EmptyDataMessage'
import PropTypes from 'prop-types'
import { SELECTED_ROWS_BACKGROUND } from '@constants/tablesConfigs/common'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { toggleModal } from '@store/ui/actions'
import { MODALS_LIST } from '@constants/common'
import { Pagination } from '@material-ui/lab'
import {
  DEFAULT_STATS_GROUP_BY,
  FILTER_SET_GROUP_BY,
  STATS_GROUP_BY_LABEL,
  STATS_FILTER_SET_LABEL,
  STATS_SELECT_TYPE_LABEL,
  STATS_TYPES,
  STATS_MARKET,
  FILTER_APPLY_MESSAGE
} from '@constants/common'
import cloneDeepWith from 'lodash/cloneDeepWith'
import { makeStyles } from '@material-ui/core/styles'
import {
  getCurrentFilterSet,
  getCurrentFilters,
  getDataFilters,
  getTableFilters
} from '@components/StatsPage/ducks/selectors'
import StatsTopFilter from '@components/StatsPage/components/StatsTopFilter'
import StatsTypeFilter from '@components/StatsPage/components/StatsTypeFilter'
import StatsDeleteModal from '@components/StatsPage/components/StatsDeleteModal'
import FilterApplyModal from '@components/StatsPage/components/FilterApplyModal'
import StatsAddModal from '@components/StatsPage/components/StatsAddModal'
import FilterUpdateModal from '@components/StatsPage/components/FilterUpdateModal'
import './index.scss'
import RowToFilters from '@components/StatsPage/components/RowToFilters'
import DayFilter from '@components/StatsPage/components/DayFilter'
import StatsChip from '@components/StatsPage/components/StatsChip'
import FilterSetChip from '@components/StatsPage/components/FilterSetChip'
import helpers from '@utils/helpers'
import {
  addFilter,
  deleteFilter,
  deleteFilterSet
} from '@components/StatsPage/ducks/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import { toast } from 'react-toastify'
import { omitBy, isNil, isEmpty } from 'lodash'
import Table from '@components/shared/RaceTable'
import { getStatsTableConfig } from '@constants/tablesConfigs/statsPage'
import { history } from '@store'
import { Paper, useTheme } from '@material-ui/core'
import StatsChart from '@components/StatsPage/components/StatsChart'
import usePrevious from '@utils/customHook/usePrevious'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const StatsPage = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const statsStore = useSelector((state) => state.stats)

  /* Get table and data filters from reselect selectors */
  const tableFilters = useSelector(getTableFilters)
  const dataFilters = useSelector(getDataFilters)
  const modalStorage = useSelector((store) => store.ui)
  /* End of Get table and data filters from reselect selectors */

  /* Get member current filter-preset and current filter from reselect selectors */
  const currentFilters = useSelector(getCurrentFilters)
  const currentFilterSet = useSelector(getCurrentFilterSet)
  /* End of Get member current filter-preset and current filter from reselect selectors */

  const [currentStatsType, setCurrentStatsType] = useState(null)
  const [currentStatsMarket, setCurrentStatsMarket] = useState(null)
  const [updatedFilter, setUpdatedFilter] = useState(null)
  const [previousRowSelected, setPreviousRowSelected] = useState({})
  const [filterApplyData, setFilterApplyData] = useState(null)
  const [pageCurrent, setPage] = useState(1)
  const [currentGroupBy, setCurrentGroupBy] = useState(null)
  const previousCurrentFilters = usePrevious(currentFilters)
  const previousCurrentFilterSet = usePrevious(currentFilterSet)

  const isApplyModalOpen = () =>
    modalStorage.openModals.includes(MODALS_LIST.STATS_FILTER_APPLY_MODAL)

  const isDeleteModalOpen = () =>
    modalStorage.openModals.includes(MODALS_LIST.STATS_DELETE_MODAL)

  const isAddModalOpen = () =>
    modalStorage.openModals.includes(MODALS_LIST.STATS_ADD_MODAL)

  const isFilterUpdateModalOpen = () =>
    modalStorage.openModals.includes(MODALS_LIST.FILTER_UPDATE_MODAL)

  useEffect(() => {
    dispatch(
      fetchConfig({
        onSuccess: (groupBys) => {
          initialSetupType(groupBys)
        },
        onError: (e) => {
          const message = e.message || e
          toast.error(message)
        }
      })
    )
  }, [])

  useEffect(() => {
    if (currentStatsType && currentGroupBy) {
      handleUrlChange()
      if (currentGroupBy.id !== 'filter-sets') {
        dispatch(
          fetchStats({
            statsType: currentStatsType.value,
            groupBy:
              (currentGroupBy && currentGroupBy.id) ||
              DEFAULT_STATS_GROUP_BY.id,
            filterBy: '',
            body: {
              page: pageCurrent,
              dir: statsStore.dir,
              column: statsStore.column,
              filters: statsStore.currentFilters,
              filtersets: []
            }
          })
        )
      }
    }
  }, [currentGroupBy, currentStatsType])

  useEffect(() => {
    if (
      (!isEmpty(currentFilters) && previousCurrentFilters) ||
      (isEmpty(currentFilters) && !isEmpty(previousCurrentFilters))
    ) {
      dispatch(
        fetchStats({
          statsType: currentStatsType.value,
          groupBy:
            (currentGroupBy && currentGroupBy.id) || DEFAULT_STATS_GROUP_BY.id,
          filterBy:
            currentGroupBy && currentGroupBy.id === 'filter-sets'
              ? 'filterset'
              : '',
          body: {
            page: pageCurrent,
            dir: statsStore.dir,
            column: statsStore.column,
            filters: currentFilters,
            filtersets:
              currentGroupBy && currentGroupBy.id === 'filter-sets'
                ? currentFilterSet
                : []
          }
        })
      )
    }
  }, [currentFilters])

  useEffect(() => {
    if (
      (!isEmpty(currentFilterSet) && previousCurrentFilterSet) ||
      (isEmpty(currentFilterSet) && !isEmpty(previousCurrentFilterSet))
    ) {
      if (currentFilterSet.length === 0) {
        const [groupBy] = statsStore.groupBys.filter(
          (i) => i.id === DEFAULT_STATS_GROUP_BY.id
        )
        setCurrentGroupBy(groupBy)
      } else {
        dispatch(
          fetchStats({
            statsType: currentStatsType.value,
            groupBy:
              (currentGroupBy && currentGroupBy.id) ||
              DEFAULT_STATS_GROUP_BY.id,
            filterBy:
              currentGroupBy && currentGroupBy.id === 'filter-sets'
                ? 'filterset'
                : '',
            body: {
              page: pageCurrent,
              dir: statsStore.dir,
              column: statsStore.column,
              filters: currentFilters,
              filtersets:
                currentGroupBy && currentGroupBy.id === 'filter-sets'
                  ? currentFilterSet
                  : []
            }
          })
        )
      }
    }
  }, [currentFilterSet])

  useEffect(() => {
    if (updatedFilter && !isEmpty(updatedFilter)) {
      dispatch(toggleModal(MODALS_LIST.FILTER_UPDATE_MODAL))
    }
  }, [updatedFilter])

  /* Handle url changes*/
  const initialSetupType = (groupBys) => {
    const [market] = STATS_MARKET.filter((i) => i.value === 'win')
    setCurrentStatsMarket(market)

    const [type] = STATS_TYPES.filter((i) => i.value === match.params.statsType)
    setCurrentStatsType(type)

    // Add default filter
    if (match.params.statsType === 'prostats') {
      dispatch(
        addFilter([
          {
            name: 'rtr-rank',
            values: [
              {
                label: '1 - 1',
                value: '1|1'
              }
            ]
          }
        ])
      )
    }

    let groupBysID = match.params.groupBy
    if (
      match.params.statsType !== 'entry' &&
      match.params.groupBy === 'pick-type'
    ) {
      groupBysID = DEFAULT_STATS_GROUP_BY.id
    }
    if (
      match.params.statsType !== 'prostats' &&
      match.params.groupBy === 'filter-sets'
    ) {
      groupBysID = DEFAULT_STATS_GROUP_BY.id
    }

    let userFilters = [...statsStore.user_filters]
    if (
      match.params.statsType === 'prostats' &&
      match.params.groupBy === 'filter-sets'
    ) {
      if (userFilters && userFilters.length > 1) {
        userFilters = userFilters.filter((data) => data !== 'Default')
        setCurrentGroupBy(FILTER_SET_GROUP_BY)
        dispatch(updateFilterSet(userFilters))
      } else {
        groupBysID = DEFAULT_STATS_GROUP_BY.id
        const [groupBy] = groupBys.filter((i) => i.id === groupBysID)
        setCurrentGroupBy(groupBy)
      }
    } else {
      const [groupBy] = groupBys.filter((i) => i.id === groupBysID)
      setCurrentGroupBy(groupBy)
    }
  }

  const handleFilterApplyModal = () => {
    dispatch(toggleModal(MODALS_LIST.STATS_FILTER_APPLY_MODAL))
  }

  const handleDeleteStatsModal = () => {
    dispatch(toggleModal(MODALS_LIST.STATS_DELETE_MODAL))
  }

  const handleAddStatsModal = () => {
    dispatch(toggleModal(MODALS_LIST.STATS_ADD_MODAL))
  }

  const handleUrlChange = () => {
    if (currentStatsType && currentStatsType.value) {
      let groupBy =
        (currentGroupBy && currentGroupBy.id) || DEFAULT_STATS_GROUP_BY.id
      if (groupBy === 'filter-sets') {
        history.push(`/stats/${currentStatsType.value}/${groupBy}/filterset/`)
      } else {
        history.push(`/stats/${currentStatsType.value}/${groupBy}/`)
      }
    }
  }
  /* Handle url changes*/

  const handleStatsTypeChanged = (event) => () => {
    const [market] = STATS_MARKET.filter((i) => i.value === 'win')
    setCurrentStatsMarket(market)
    setCurrentStatsType(event)

    // Add default filter
    if (event && event.value === 'prostats') {
      dispatch(
        addFilter([
          {
            name: 'rtr-rank',
            values: [
              {
                label: '1 - 1',
                value: '1|1'
              }
            ]
          }
        ])
      )
    } else {
      dispatch(addFilter([]))
    }

    const [groupBy] = statsStore.groupBys.filter(
      (i) => i.id === DEFAULT_STATS_GROUP_BY.id
    )
    setCurrentGroupBy(groupBy)
  }

  const handleStatsMarketChanged = (event) => () => {
    setCurrentStatsMarket(event)
  }

  const handleGroupByChanged = (event) => {
    setCurrentGroupBy(event)
  }

  const handleFilterChange = (values, activeFilters) => {
    const filters = omitBy(values, isNil)
    dispatch(
      addFilter(helpers.mapStatsFilters(filters, cloneDeepWith(activeFilters)))
    )
  }

  const handleDeleteFilterSet = (filter) => {
    dispatch(deleteFilterSet(filter))
  }

  const handleDeleteFilter = (filter) => {
    dispatch(deleteFilter(filter))
  }

  const handleFiltersModal = (filter) => {
    setUpdatedFilter(filter)
  }

  const handleUserFilterSetChange = (name) => {
    dispatch(fetchUserFilter(name))
  }

  const handleFilterApply = async (type, action = 'create') => {
    try {
      const { num_added } = await Api.post(apiUrls.stats[type], {
        filters: currentFilters,
        action: action,
        filtersets:
          currentGroupBy && currentGroupBy.id === 'filter-sets'
            ? currentFilterSet
            : []
      })
      let message = `Successfully added ${num_added} selections`
      if (action === 'merge') {
        handleFilterApplyModal()
        message = `Successfully merged ${num_added} selections`
      } else if (action === 'replace') {
        handleFilterApplyModal()
        message = `Successfully replaced ${num_added} selections`
      }
      toast.success(message)
    } catch (e) {
      const message =
        e.message ||
        FILTER_APPLY_MESSAGE(
          type === 'today'
            ? statsStore.num_runs_today
            : statsStore.num_runs_tomorrow
        )
      setFilterApplyData({ type: type, message: message })
      handleFilterApplyModal()
    }
  }

  const handleRowToFilersClick = () => {
    if (previousRowSelected) {
      setPage(1)
      setPreviousRowSelected({})
      let allSeletedRows = []
      Object.keys(previousRowSelected).forEach((page) => {
        if (previousRowSelected[page].length > 0) {
          allSeletedRows = [...allSeletedRows, ...previousRowSelected[page]]
        }
      })
      const newFilters = allSeletedRows.reduce((acc, cur) => {
        let m = acc.findIndex((vendor) => vendor['name'] === currentGroupBy.id)
        if (m > -1) {
          acc[m].values.push({ value: cur.key || cur.title, label: cur.title })
        } else {
          acc.push({
            name: currentGroupBy.id,
            values: [{ value: cur.key || cur.title, label: cur.title }]
          })
        }
        return acc
      }, [])

      const selectedRowFilterExist = currentFilters.findIndex(
        (filter) => filter.name === currentGroupBy.id
      )
      if (selectedRowFilterExist > -1) {
        const myFilters = currentFilters.map((filter) => {
          const shallowFilter = { ...filter }
          if (shallowFilter.name === currentGroupBy.id) {
            const data = newFilters.filter(
              (infilter) => infilter.name === currentGroupBy.id
            )
            if (data && data.length > 0) {
              var values = data[0].values.map((value) => value.value)
              shallowFilter.values = [
                ...shallowFilter.values,
                ...data[0].values.filter((d) => !values.includes(d.value))
              ]
            }
          }
          return shallowFilter
        })
        dispatch(addFilter(myFilters))
      } else {
        dispatch(addFilter([...currentFilters, ...newFilters]))
      }
    }
  }

  const handleAllFilterSets = () => {
    let userFilters = [...statsStore.user_filters]
    if (userFilters && userFilters.length > 1) {
      userFilters = userFilters.filter((data) => data !== 'Default')
      dispatch(updateFilterSet(userFilters))
      setCurrentGroupBy(FILTER_SET_GROUP_BY)
    }
  }

  const getTableColumns = useMemo(() => {
    const dynamicTitle = currentGroupBy ? currentGroupBy.name : 'All'
    const market = currentStatsMarket ? currentStatsMarket.value : 'win'
    return getStatsTableConfig(dynamicTitle, market, true)
  }, [currentGroupBy, currentStatsMarket])

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

  const handleChangeSelections = (selections) => {
    if (statsStore.can_convert_rows_to_filters) {
      setPreviousRowSelected({
        ...previousRowSelected,
        [pageCurrent]: selections
      })
    }
  }

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
      },
      onClick: () => {
        if (
          statsStore.can_convert_rows_to_filters &&
          cellInfo.row &&
          cellInfo.row.id !== 'All'
        ) {
          cellInfo.row.toggleRowSelected()
        }
      }
    }),
    [dispatch, statsStore]
  )

  const handleCloseModals = (type) => {
    setFilterApplyData(null)
    dispatch(toggleModal(type))
  }

  const handleCloseFilterModals = () => {
    setUpdatedFilter(null)
    dispatch(toggleModal(MODALS_LIST.FILTER_UPDATE_MODAL))
  }

  const handleChangePage = (e, page) => {
    setPage(page)
    dispatch(
      fetchStats({
        statsType: currentStatsType.value,
        groupBy:
          (currentGroupBy && currentGroupBy.id) || DEFAULT_STATS_GROUP_BY.id,
        filterBy: '',
        body: {
          page: page,
          dir: statsStore.dir,
          column: statsStore.column,
          filters: statsStore.currentFilters,
          filtersets: []
        }
      })
    )
  }

  const getAllSelectedRows = useMemo(() => {
    let allSeletedRows = []
    Object.keys(previousRowSelected).forEach((page) => {
      if (previousRowSelected[page].length > 0) {
        allSeletedRows = [...allSeletedRows, ...previousRowSelected[page]]
      }
    })
    return allSeletedRows
  }, [previousRowSelected])

  const getGroupByOptions = useMemo(() => {
    if (currentStatsType && currentStatsType.value) {
      return currentStatsType.value === 'entry'
        ? statsStore.groupBys
        : statsStore.groupBys.filter((i) => i.id !== 'pick-type')
    }
  }, [currentStatsType])

  const handleHeaderClick = useCallback((column) => {
    if (column && column.length > 0) {
      dispatch(
        updateSorting({
          dir: column[0].desc ? 'desc' : 'asc',
          column: column[0].id
        })
      )
    } else {
      dispatch(
        updateSorting({
          dir: 'asc',
          column: 'title'
        })
      )
    }
  }, [])

  useEffect(() => {
    if (statsStore.column && statsStore.dir && currentStatsType) {
      setPage(1)
      dispatch(
        fetchStats({
          statsType: currentStatsType.value,
          groupBy:
            (currentGroupBy && currentGroupBy.id) || DEFAULT_STATS_GROUP_BY.id,
          filterBy: '',
          body: {
            page: 1,
            dir: statsStore.dir,
            column: statsStore.column,
            filters: statsStore.currentFilters,
            filtersets: []
          }
        })
      )
    }
  }, [statsStore.column, statsStore.dir])

  return (
    <>
      <div className="row">
        <SEO
          title={
            currentStatsType && currentStatsType.label
              ? `${currentStatsType.label} - Stats`
              : 'Stats'
          }
        />
        <div className="col-xs-12" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="stats-top-bar">
            <StatsTypeFilter
              label={STATS_SELECT_TYPE_LABEL}
              isLoading={statsStore.loading}
              filterValue={currentStatsType}
              filterOptions={STATS_TYPES}
              filterChangeHandler={handleStatsTypeChanged}
            />
            <StatsTopFilter
              label={STATS_GROUP_BY_LABEL}
              isLoading={statsStore.loading}
              filterValue={currentGroupBy}
              filterOptions={getGroupByOptions}
              filterChangeHandler={handleGroupByChanged}
              placeholder="Pick Type"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              name="statsGroupBySelect"
              id="statsGroupBySelect"
              isDisabled={currentFilterSet && currentFilterSet.length > 0}
            />
            <StatsTopFilter
              label={STATS_FILTER_SET_LABEL}
              isLoading={statsStore.loading}
              filterOptions={statsStore.user_filters}
              filterValue={statsStore.currentFilterName}
              filterChangeHandler={handleUserFilterSetChange}
              name="userFilterSelect"
              id="userFilterSelect"
              placeholder="Default"
              getOptionLabel={(option) => option}
              getOptionValue={(option) => option}
              showAddDelete={true}
              handleDeleteStatsModal={handleDeleteStatsModal}
              handleAddStatsModal={handleAddStatsModal}
              buttonDisabled={
                (currentFilterSet && currentFilterSet.length > 0) ||
                (statsStore.minimum_membership_to_filter ? true : false)
              }
              isDisabled={
                statsStore.minimum_membership_to_filter ? true : false
              }
            />
            <div className="stats-top-bar__list-item stats-top-bar__list-item--row-filters">
              <RowToFilters
                isActive={
                  statsStore.can_convert_rows_to_filters &&
                  getAllSelectedRows &&
                  getAllSelectedRows.length > 0 &&
                  !statsStore.minimum_membership_to_filter
                }
                isActiveFilterSet={
                  statsStore.user_filters &&
                  statsStore.user_filters.length > 1 &&
                  !statsStore.minimum_membership_to_filter
                }
                currentStatsType={currentStatsType}
                handleRowToFilersClick={handleRowToFilersClick}
                handleAllFilterSets={handleAllFilterSets}
              />
            </div>
            <div
              className={`stats-top-bar__list-item ${
                statsStore.download_url &&
                currentFilterSet &&
                currentFilterSet.length > 0
                  ? 'stats-top-bar__list-item--day-filters-download'
                  : 'stats-top-bar__list-item--day-filters'
              }`}
            >
              <DayFilter
                filterProp={{
                  today: statsStore.num_runs_today,
                  tomorrow: statsStore.num_runs_tomorrow
                }}
                handleTodayApply={handleFilterApply}
                handleTomorrowApply={handleFilterApply}
                downloadUrl={statsStore.download_url}
                numRunsDownload={statsStore.num_runs_download}
                currentFilterSet={currentFilterSet}
              />
            </div>
            <StatsTypeFilter
              isLoading={statsStore.loading}
              filterValue={currentStatsMarket}
              filterOptions={STATS_MARKET}
              filterChangeHandler={handleStatsMarketChanged}
            />
          </div>
        </div>
      </div>
      <div className="stats-container row">
        <div className="stats-container__filter-section col-xs-12 col-sm-12 col-md-12 col-lg-5">
          <div className="stats-container-current__filter-section">
            <div className="stats-container-current__filter-title">
              Table Filters :-{' '}
            </div>
            <div className="stats-container-current__filter-values">
              <StatsChip
                currentFilters={currentFilters}
                columnFilters={tableFilters}
                handleDelete={handleDeleteFilter}
                isTableFilters={true}
                handleFiltersModal={handleFiltersModal}
              />
            </div>
          </div>
          <div className="stats-container__filter-section-inner">
            <div className="stats-container__filter-item">
              <FilterBlock
                filterData={dataFilters}
                handleFilterChange={handleFilterChange}
                isLoading={statsStore.loading}
                currentFilters={currentFilters}
                filtersets={currentFilterSet}
                isDisabled={
                  (currentFilterSet && currentFilterSet.length > 0) ||
                  (statsStore.minimum_membership_to_filter ? true : false)
                }
                minimum_membership_to_filter={
                  statsStore.minimum_membership_to_filter
                }
              />
            </div>
            <div className="stats-container__filter-item">
              <FilterBlock
                isTable={true}
                filterData={tableFilters}
                handleFilterChange={handleFilterChange}
                isLoading={statsStore.loading}
                currentFilters={currentFilters}
                filtersets={currentFilterSet}
                isDisabled={
                  statsStore.minimum_membership_to_filter ? true : false
                }
                minimum_membership_to_filter={
                  statsStore.minimum_membership_to_filter
                }
              />
            </div>
          </div>
        </div>
        <div className="stats-container__table-section col-xs-12 col-sm-12 col-md-12 col-lg-7">
          <div className="stats-container-current__filter-section">
            <div className="stats-container-current__filter-title">
              {currentFilterSet && currentFilterSet.length > 0 ? (
                <>Filter sets :- </>
              ) : (
                <>Data Filters :- </>
              )}
            </div>
            <div className="stats-container-current__filter-values">
              {currentFilterSet && currentFilterSet.length > 0 ? (
                <FilterSetChip
                  filtersets={currentFilterSet}
                  handleDelete={handleDeleteFilterSet}
                />
              ) : (
                <StatsChip
                  currentFilters={currentFilters}
                  columnFilters={dataFilters}
                  handleDelete={handleDeleteFilter}
                  isTableFilters={false}
                  handleFiltersModal={handleFiltersModal}
                />
              )}
            </div>
          </div>
          <Paper style={{ padding: theme.spacing(2) }}>
            {statsStore.num_pages > 1 && (
              <div className="stats-table-pagination">
                <Pagination
                  siblingCount={0}
                  count={statsStore.num_pages}
                  page={pageCurrent}
                  onChange={handleChangePage}
                  color="primary"
                />
              </div>
            )}
            <div className="stats-table">
              {statsStore.minimum_membership_to_view &&
              statsStore.minimum_membership_to_view[
                currentStatsType && currentStatsType.value === 'prostats'
                  ? 'all'
                  : currentStatsType?.value || match.params.statsType
              ] ? (
                <EmptyDataMessage
                  isLoading={false}
                  message={`Upgrade to ${
                    statsStore.minimum_membership_to_view[
                      currentStatsType && currentStatsType.value === 'prostats'
                        ? 'all'
                        : currentStatsType?.value || match.params.statsType
                    ]
                  } membership to see these statistics!`}
                />
              ) : (
                <Table
                  columns={getTableColumns}
                  data={statsStore.rows || []}
                  getRowProps={getRowProps}
                  getCellProps={getCellProps}
                  setSelectedRows={handleChangeSelections}
                  handleHeaderClick={(column) => handleHeaderClick(column)}
                  isStatsPage={true}
                />
              )}
            </div>
            <Backdrop className={classes.backdrop} open={statsStore.loading}>
              <CircularProgress color="primary" disableShrink />
            </Backdrop>
          </Paper>
          {statsStore.showChart && statsStore.chartData && (
            <StatsChart chartData={statsStore.chartData} />
          )}
        </div>
      </div>
      <StatsDeleteModal
        isOpen={isDeleteModalOpen()}
        handleClose={() => handleCloseModals(MODALS_LIST.STATS_DELETE_MODAL)}
        stat={statsStore.currentFilterName}
        currentStatsType={currentStatsType}
        fullScreen={fullScreen}
      />
      <StatsAddModal
        isOpen={isAddModalOpen()}
        handleClose={() => handleCloseModals(MODALS_LIST.STATS_ADD_MODAL)}
        currentFilters={currentFilters}
        fullScreen={fullScreen}
      />
      <FilterUpdateModal
        isOpen={isFilterUpdateModalOpen()}
        handleClose={() => handleCloseFilterModals()}
        handleDelete={handleDeleteFilter}
        updatedFilter={updatedFilter}
        fullScreen={fullScreen}
      />
      <FilterApplyModal
        isOpen={isApplyModalOpen()}
        handleClose={() =>
          handleCloseModals(MODALS_LIST.STATS_FILTER_APPLY_MODAL)
        }
        message={filterApplyData ? filterApplyData.message : ''}
        type={filterApplyData ? filterApplyData.type : ''}
        fullScreen={fullScreen}
        handleFilterApply={handleFilterApply}
      />
    </>
  )
}

StatsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      statsType: PropTypes.string,
      groupBy: PropTypes.string
    })
  })
}
export default StatsPage
