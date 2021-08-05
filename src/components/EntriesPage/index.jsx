/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  Button,
  useTheme,
  CircularProgress,
  Typography
} from '@material-ui/core'
import { MTableHeader } from 'material-table'
import Loader from '@components/shared/Loader'
import LazyLoad from 'react-lazyload'
import { Pagination } from '@material-ui/lab'
import latestResultTable from '@constants/tablesConfigs/latestResult'
import { useDispatch, useSelector } from 'react-redux'
import CustomTable from '@components/shared/CustomTable'
import { isAdmin } from '@store/memberStore/selectors'
import { history } from '@store'
import SEO from '@components/SEO'
import { getNapData } from '@components/EntriesPage/ducks/selectors'
import { fetchData } from '@components/EntriesPage/ducks/actions'
import './index.scss'

const EntriesPage = ({ match }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [pageCurrent, setPage] = useState(1)
  const { profile } = useSelector((store) => store.member)
  const { loading, totalPages } = useSelector((store) => store.entries)
  const isAdminUser = useSelector(isAdmin)
  const napData = useSelector(getNapData)

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

  const handleEntries = (isMyEntries) => {
    dispatch(
      fetchData({
        username: isMyEntries ? profile?.username : null,
        page: 1
      })
    )
    if (isMyEntries) {
      history.push(`/entries/${profile?.username}/`)
    } else {
      history.push(`/entries/`)
    }
  }

  return (
    <div className="nap-selection-page">
      <SEO title="My NAP entries" />
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
                My NAP entries
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
                  All NAP entries
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
              {napData && napData.length > 0 ? (
                <div className="leader-board">
                  {napData.map((entry, index) => (
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
                              {entry.header_text_1 || ''}
                            </div>
                            <span className="leader-board-table-section-header-title-subheading">
                              {entry.header_text_2
                                ? ` (${entry.header_text_2})`
                                : ''}
                            </span>
                          </div>
                        </div>
                        <CustomTable
                          columns={latestResultTable.header.NAP}
                          data={entry.data}
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
                        {entry.comment && (
                          <Typography className="nap-selection-page-comment">
                            Comment: {entry.comment}
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

export default EntriesPage
