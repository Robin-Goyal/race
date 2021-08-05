/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  Button,
  useTheme,
  CircularProgress,
  Typography
} from '@material-ui/core'
import SEO from '@components/SEO'
import { MTableHeader } from 'material-table'
import Loader from '@components/shared/Loader'
import { Pagination } from '@material-ui/lab'
import LazyLoad from 'react-lazyload'
import latestResultTable from '@constants/tablesConfigs/latestResult'
import { useDispatch, useSelector } from 'react-redux'
import CustomTable from '@components/shared/CustomTable'
import { isAdmin } from '@store/memberStore/selectors'
import { history } from '@store'
import dateConversations from '@utils/timeUtils'
import {
  DATE_DAY_YEAR_FORMAT,
  WEEK_DAY_DATE_FORMAT,
  TIME_DEFAULT_FORMAT
} from '@constants/dateFormatsList'
import { getSelectionData } from '@components/SelectionsPage/ducks/selectors'
import { fetchData } from '@components/SelectionsPage/ducks/actions'
import './index.scss'

const SelectionsPage = ({ match }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [pageCurrent, setPage] = useState(1)
  const { profile } = useSelector((store) => store.member)
  const { loading, totalPages } = useSelector((store) => store.selections)
  const isAdminUser = useSelector(isAdmin)
  const selectionData = useSelector(getSelectionData)

  useEffect(() => {
    dispatch(
      fetchData({
        username: !isAdminUser ? profile?.username : match.params.username,
        page: 1
      })
    )
  }, [match.params.username])

  const handleChangePage = (e, page) => {
    setPage(page)
    dispatch(
      fetchData({
        username: !isAdminUser ? profile?.username : match.params.username,
        page: page
      })
    )
  }

  const handleEntries = (isMySelections) => {
    dispatch(
      fetchData({
        username: isMySelections ? profile?.username : null,
        page: 1
      })
    )
    if (isMySelections) {
      history.push(`/selections/${profile?.username}/`)
    } else {
      history.push(`/selections/`)
    }
  }

  return (
    <div className="nap-selection-page">
      <SEO title="My Selections" />
      <div className="row">
        <div className="col-xs-12">
          <div className="nap-selection-top-section">
            <div className="nap-selection-top-section-left">
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                style={{
                  textTransform: 'inherit',
                  marginRight: 15,
                  backgroundColor: theme.palette.primary.light,
                  color: '#fff'
                }}
                onClick={() => handleEntries(true)}
              >
                My selections
              </Button>
              {isAdminUser && (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  style={{
                    textTransform: 'inherit',
                    backgroundColor: theme.palette.primary.light,
                    color: '#fff'
                  }}
                  onClick={() => handleEntries(false)}
                >
                  All selections
                </Button>
              )}
            </div>
            <div className="nap-selection-top-section-right">
              {totalPages > 1 && (
                <div className="pagination-wrap">
                  <Pagination
                    count={totalPages}
                    page={pageCurrent}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          <div className="col-xs-12" style={{ paddingTop: 0 }}>
            <div className="nap-selection-table">
              {selectionData && selectionData.length > 0 ? (
                <div className="leader-board">
                  {selectionData.map((selection, index) => (
                    <LazyLoad
                      key={index}
                      placeholder={
                        <div
                          style={{
                            textAlign: 'center',
                            margin: '20px 0'
                          }}
                        >
                          <CircularProgress color="primary" disableShrink />
                        </div>
                      }
                    >
                      <div className="leader-board-table-section">
                        <div className="leader-board-table-section-header">
                          <div className="leader-board-table-section-header-title">
                            <div className="leader-board-table-section-header-title-heading">
                              {dateConversations.getFormattedDate(
                                selection.race_date,
                                DATE_DAY_YEAR_FORMAT
                              )}
                            </div>
                            <span className="leader-board-table-section-header-title-subheading">
                              {` (I ${
                                selection.was_posted ? 'posted' : 'downloaded'
                              } ${selection.runs.length} runner${
                                selection.runs.length > 1 ? 's' : ''
                              } at ${dateConversations.getFormattedUtcDate(
                                selection.submitted_at,
                                TIME_DEFAULT_FORMAT,
                                dateConversations.checkDST(
                                  selection.submitted_at
                                )
                              )} on ${dateConversations.getFormattedUtcDate(
                                selection.submitted_at,
                                WEEK_DAY_DATE_FORMAT,
                                dateConversations.checkDST(
                                  selection.submitted_at
                                )
                              )})`}
                            </span>
                          </div>
                        </div>
                        <CustomTable
                          columns={latestResultTable.header.selection}
                          data={selection.completeRuns}
                          options={{
                            sorting: false,
                            isLoading: loading,
                            loadingType: 'overlay',
                            paging: false
                          }}
                          components={{
                            Header: (props) => <MTableHeader {...props} />
                          }}
                          isLoading={loading}
                        />
                        {selection.comment && (
                          <Typography className="nap-selection-page-comment">
                            Comment: {selection.comment}
                          </Typography>
                        )}
                      </div>
                    </LazyLoad>
                  ))}
                </div>
              ) : (
                <div className="no-record-found">
                  {!loading && <span>No record found</span>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectionsPage
