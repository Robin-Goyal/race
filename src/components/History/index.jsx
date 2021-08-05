import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchData,
  updateNagmeInHistory
} from '@components/History/ducks/actions'
import { Pagination } from '@material-ui/lab'
import dayjs from 'dayjs'
import dateConversations from '@utils/timeUtils'
import './index.scss'
import { MODALS_LIST } from '@constants/common'
import NagmeCreateModal from '@components/shared/NagMe/components/NagmeCreateModal'
import NagmeUpdateModal from '@components/shared/NagMe/components/NagmeUpdateModal'
import { ROWS_BACKGROUND } from '@constants/tablesConfigs/common'
import PropTypes from 'prop-types'
import ScrollContainer from 'react-indiana-drag-scroll'
import Typography from '@material-ui/core/Typography'
import Table from '@components/shared/RaceTable'
import useModal from '@utils/customHook/useModal'
import useMemberStore from '@utils/customHook/useMembersStore'
import { historyColumnsRender } from '@constants/tablesConfigs/historytable'
import { getStatsMod } from '@components/WebRatings/ducks/selectors'
import RacesSettings from '@components/WebRatings/components/RacesSettings'
import useRaceTableSettings from '@utils/customHook/useRaceTableSettings'
import EmptyDataMessage from '@components/shared/EmptyDataMessage'
import isEmpty from 'lodash/isEmpty'
import SEO from '@components/SEO'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { ALL_COLUMNS } from '@constants/tablesConfigs/racesSettings'
import { isExtendedMember } from '@store/memberStore/selectors'
import { isFreeFriday } from '@store/memberStore/selectors'

const useHistoryStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 24,
    color: theme.palette.primary.light,
    marginBottom: 8
  }
}))
const History = ({ match }) => {
  const classes = useHistoryStyles()
  const [type, setType] = useState('')
  const [pageCurrent, setPage] = useState(1)

  const dispatch = useDispatch()
  const statsMod = useSelector(getStatsMod)
  const isMember = useSelector(isExtendedMember)
  const isFreeFridayMember = useSelector(isFreeFriday)

  const historyStore = useSelector(({ history }) => history)

  const [isNagmeCreatingModalOpen, toggleNagmeCreatingModal] = useModal(
    MODALS_LIST.NAGME_CREATING_MODAL
  )
  const [isNagmeUpdatingModalOpen, toggleNagmeUpdatingModal] = useModal(
    MODALS_LIST.NAGME_UPDATE_MODAL
  )
  const { memberStorage, fetchMemberRaceColumns } = useMemberStore()
  const {
    columnSettingsData,
    handleColumnsSettingsChange,
    handleFreezeHorseNameChange,
    handleSynchroniseScrollbar,
    handleMemberSettingsChange
  } = useRaceTableSettings()

  useEffect(() => {
    dispatch(fetchData({ ...match.params, ...{ page: pageCurrent } }))
    setType(match.params.type)
    return () => {}
  }, [])

  useEffect(() => {
    fetchMemberRaceColumns({
      date: match.params.type
    })
  }, [match.params.type])

  const gitTitle = () =>
    `${historyStore.name ? `${historyStore.name} - ` : ''}${
      type ? `${type.charAt(0).toUpperCase() + type.slice(1)} history` : ''
    }`
  const getRowProps = useCallback(
    () => ({
      style: {
        backgroundColor: ROWS_BACKGROUND,
        padding: 0,
        borderColor: ' #fff'
      }
    }),
    [dispatch]
  )
  const getCellProps = useCallback(
    (cellInfo) => ({
      style: {
        textAlign: 'center',
        padding: '0',
        fontSize: '13px',
        fontFamily: '"lato", sans-serif',
        height: 30,
        minWidth: cellInfo.column.totalMinWidth || 130,
        ...cellInfo.column.style
      }
    }),
    []
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
      historyColumnsRender(
        memberStorage.horseNameFreeze,
        isMember ||
          (dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday' &&
            isFreeFridayMember),
        statsMod
      ),
    [
      memberStorage.activeColumns,
      memberStorage.horseNameFreeze,
      historyStore.data,
      statsMod
    ]
  )

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

  const handleNagmeInRaces = (data, runId) => {
    dispatch(updateNagmeInHistory({ data, runId }))
  }

  const handleChangePage = (e, page) => {
    setPage(page)
    dispatch(fetchData({ ...match.params, ...{ page: page } }))
  }

  return (
    <div>
      <div className="col-xs-12">
        <SEO title={gitTitle()} />
        <div className="main-bojects-controls">
          <div className="inner-menu2-controls">
            <ul className="main-obj2-menu">
              <li className="main-space">
                <RacesSettings
                  columnSettingsData={columnSettingsData}
                  memberSettings={memberStorage}
                  handleColumnsSettingsChange={handleColumnsSettingsChange}
                  handleMemberSettingsChange={handleMemberSettingsChange}
                  handleFreezeHorseNameChange={handleFreezeHorseNameChange}
                  handleSynchroniseScrollbar={handleSynchroniseScrollbar}
                  showDownloadButtons={false}
                />
              </li>
              <li className="main-space">
                {historyStore.page_info &&
                  historyStore.page_info.num_pages > 1 && (
                    <div className="pagination-wrap" style={{ marginLeft: 20 }}>
                      <Pagination
                        count={historyStore.page_info.num_pages}
                        siblingCount={0}
                        page={pageCurrent}
                        onChange={handleChangePage}
                        color="primary"
                      />
                    </div>
                  )}
              </li>
            </ul>
          </div>
        </div>
        {!isEmpty(historyStore.data) ? (
          <>
            <Typography className={classes.pageTitle} variant="h4">
              {gitTitle()}
            </Typography>
            <div className="races__wrapper">
              <div className="races__table">
                <ScrollContainer
                  className="scroll-container"
                  horizontal={true}
                  vertical={false}
                  hideScrollbars={false}
                >
                  <Table
                    columns={getTableColumns}
                    data={historyStore.data}
                    isLoading={historyStore.isLoading}
                    getRowProps={getRowProps}
                    getCellProps={getCellProps}
                    getHeaderProps={getHeaderProps}
                    hiddenColumns={getHiddenColumns}
                  />
                </ScrollContainer>
              </div>
            </div>
          </>
        ) : (
          <EmptyDataMessage
            isLoading={historyStore.isLoading}
            message="No history data"
          />
        )}
      </div>
      <NagmeCreateModal
        isOpen={isNagmeCreatingModalOpen}
        onClose={toggleNagmeCreatingModal}
        handleClose={toggleNagmeCreatingModal}
        handleNagmeInRaces={handleNagmeInRaces}
        noteMaxLength={memberStorage.noteMaxLength}
      />
      <NagmeUpdateModal
        isOpen={isNagmeUpdatingModalOpen}
        onClose={toggleNagmeUpdatingModal}
        handleClose={toggleNagmeUpdatingModal}
        handleNagmeInRaces={handleNagmeInRaces}
        noteMaxLength={memberStorage.noteMaxLength}
      />
    </div>
  )
}
History.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string
    })
  }).isRequired,
  index: PropTypes.number
}
export default History
