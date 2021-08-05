import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomToolbar from '@components/shared/CustomToolbar'
import { Button, Typography, useTheme } from '@material-ui/core'
import { MTableHeader } from 'material-table'
import dateConversations from '@utils/timeUtils'
import { Link as RouterLink } from 'react-router-dom'
import {
  DATE_DAY_YEAR_FORMAT,
  WEEK_DAY_DATE_FORMAT,
  TIME_DEFAULT_FORMAT
} from '@constants/dateFormatsList'
import CustomTable from '@components/shared/CustomTable'
import latestResultTable from '@constants/tablesConfigs/latestResult'
import { DASHBOARD_LATEST_NAP_SELECTION_PERIOD } from '@constants/common'
import {
  getNapData,
  getSelectionData
} from '@components/Dashboard/ducks/selectors'
import { fetchLatestNapSelectionData } from '@components/Dashboard/ducks/actions'
import isNil from 'lodash/isNil'
import './index.scss'

// eslint-disable-next-line react/prop-types
const LatestResults = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { isLoading, latestNapSelection } = useSelector(
    ({ dashboard }) => dashboard
  )
  const { profile } = useSelector((store) => store.member)
  const napData = useSelector(getNapData)
  const selectionData = useSelector(getSelectionData)
  const [selectedPeriod, setSelectedPeriod] = useState(
    DASHBOARD_LATEST_NAP_SELECTION_PERIOD[0].value
  )

  useEffect(() => {
    dispatch(fetchLatestNapSelectionData())
  }, [])

  const handleChangePeriod = useCallback(
    (e, index) => {
      setSelectedPeriod(DASHBOARD_LATEST_NAP_SELECTION_PERIOD[index].value)
    },
    [dispatch]
  )

  const getColumns = useMemo(() => {
    if (selectedPeriod === 'entries') {
      return latestResultTable.header.NAP
    } else {
      return latestResultTable.header.selection
    }
  }, [selectedPeriod])

  const getData = useMemo(() => {
    if (selectedPeriod === 'entries') {
      return napData
    } else {
      return selectionData
    }
  }, [selectedPeriod, napData])

  const getComment = useMemo(() => {
    if (selectedPeriod === 'entries') {
      return latestNapSelection &&
        latestNapSelection.entries &&
        latestNapSelection.entries[0]
        ? latestNapSelection.entries[0].comment
        : ''
    } else {
      return latestNapSelection &&
        latestNapSelection.selections &&
        latestNapSelection.selections[0]
        ? latestNapSelection.selections[0].comment
        : ''
    }
  }, [selectedPeriod, latestNapSelection])

  if (isNil(latestNapSelection)) {
    return null
  }

  return (
    <div className="leader-board dashboard-latest-data">
      <div className="leader-board-table-section">
        <div className="leader-board-table-section-header">
          {selectedPeriod === 'entries' ? (
            <div className="leader-board-table-section-header-title">
              <div className="leader-board-table-section-header-title-heading">
                {latestNapSelection.entries && latestNapSelection.entries[0]
                  ? latestNapSelection.entries[0].data.header_text_1
                  : ''}
              </div>
              <span className="leader-board-table-section-header-title-subheading">
                {latestNapSelection.entries && latestNapSelection.entries[0]
                  ? ` (${latestNapSelection.entries[0].data.header_text_2})`
                  : ''}
              </span>
            </div>
          ) : (
            <div className="leader-board-table-section-header-title">
              <div className="leader-board-table-section-header-title-heading">
                {latestNapSelection.selections &&
                latestNapSelection.selections[0]
                  ? dateConversations.getFormattedDate(
                      latestNapSelection.selections[0].race_date,
                      DATE_DAY_YEAR_FORMAT
                    )
                  : ''}
              </div>
              <span className="leader-board-table-section-header-title-subheading">
                {` (${
                  latestNapSelection.selections &&
                  latestNapSelection.selections[0]
                    ? `I ${
                        latestNapSelection.selections[0].was_posted
                          ? 'posted'
                          : 'downloaded'
                      } ${latestNapSelection.selections[0].runs.length} runner${
                        latestNapSelection.selections[0].runs.length > 1
                          ? 's'
                          : ''
                      } at ${dateConversations.getFormattedUtcDate(
                        latestNapSelection.selections[0].submitted_at,
                        TIME_DEFAULT_FORMAT,
                        dateConversations.checkDST(
                          latestNapSelection.selections[0].submitted_at
                        )
                      )} on ${dateConversations.getFormattedUtcDate(
                        latestNapSelection.selections[0].submitted_at,
                        WEEK_DAY_DATE_FORMAT,
                        dateConversations.checkDST(
                          latestNapSelection.selections[0].submitted_at
                        )
                      )}`
                    : ''
                })`}
              </span>
            </div>
          )}
          <div className="leader-board-table-section-header-last-updated">
            <CustomToolbar
              type={selectedPeriod}
              handleChangePeriod={handleChangePeriod}
              isDisabled={isLoading}
              period={DASHBOARD_LATEST_NAP_SELECTION_PERIOD}
            />
          </div>
        </div>
        <CustomTable
          columns={getColumns}
          data={getData}
          options={{
            sorting: false,
            isLoading: isLoading,
            loadingType: 'overlay',
            paging: false
          }}
          components={{
            Header: (props) => <MTableHeader {...props} />
          }}
          isLoading={isLoading}
        />
        {getComment && (
          <Typography className="dashboard-latest-data-comment">
            Comment: {getComment}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          style={{
            textTransform: 'capitalize',
            marginTop: 10,
            backgroundColor: theme.palette.primary.light,
            color: '#fff'
          }}
          component={RouterLink}
          to={`/${selectedPeriod}/${
            profile && profile.username ? `${profile.username}/` : ''
          }`}
        >
          {selectedPeriod === 'entries'
            ? 'All My NAP Results'
            : 'All My Selection Results'}
        </Button>
      </div>
    </div>
  )
}

export default LatestResults
