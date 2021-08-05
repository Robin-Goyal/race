/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core'
import { isAdmin } from '@store/memberStore/selectors'
import useLeaderboardStore from '@utils/customHook/useLeaderboardStore'
import WarningIcon from '@components/shared/icons/WarningIcon'
import CustomTableBeta from '@components/shared/CustomTable/index_beta'
import leaderBoardTable from '@constants/tablesConfigs/leaderBoards'
import CircularProgress from '@material-ui/core/CircularProgress'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

const useNAPEntryTooltipStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    padding: 15,
    minHeight: 50,
    minWidth: 200
  },
  body: {
    fontSize: 14,
    letterSpacing: '0.27px',
    fontFamily: '"lato", sans-serif'
  },
  title: {
    borderBottom: '1px solid #E8E9EC',
    marginBottom: 15
  },
  h1: {
    color: '#001737',
    fontSize: 15,
    lineHeight: '24px',
    fontWeight: 700,
    letterSpacing: '0.27px',
    fontFamily: '"lato", sans-serif',
    margin: 0,
    paddingBottom: 15
  },
  error: {
    border: `1px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
    backgroundColor: '#4DB6AC0F',
    padding: '10px 20px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    marginTop: 15
  },
  paragraph: {
    margin: 0,
    marginLeft: 15,
    fontSize: 14
  }
}))
const NAPEntryTooltip = ({ rowData }) => {
  const classes = useNAPEntryTooltipStyles()
  const theme = useTheme()
  const leaderboardStore = useSelector((store) => store.leaderboard)
  const [isLoading, setLoading] = useState(false)
  const isAdminUser = useSelector(isAdmin)
  const {
    fetchNapDetails,
    getDetailInfo,
    getNapsDetailInfo,
    isAnyRaceCompleted
  } = useLeaderboardStore()

  useEffect(() => {
    setLoading(true)
    fetchNapDetails(
      rowData.id,
      () => {
        setLoading(false)
        window.dispatchEvent(new CustomEvent('resize'))
      },
      () => {
        setLoading(false)
      }
    )
    return () => {}
  }, [])

  const getHeaderProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        fontSize: 15,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        padding: '5px 10px',
        fontWeight: 500,
        letterSpacing: '0.26px',
        fontFamily: '"Lato",sans-serif',
        whiteSpace: 'nowrap'
      }
    }),
    []
  )

  const getRowProps = useCallback(
    () => ({
      style: {
        padding: 0,
        fontSize: 14
      }
    }),
    []
  )
  const getCellProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        height: 1,
        fontSize: 14,
        color: '#11141A',
        padding: '5px 10px',
        fontWeight: 'bold',
        letterSpacing: '0.32px',
        fontFamily: '"Lato",sans-serif'
      }
    }),
    []
  )

  if (
    (isNil(leaderboardStore.napsDetailInfo) ||
      isEmpty(leaderboardStore.napsDetailInfo)) &&
    !isLoading
  ) {
    return 'No data found'
  }

  return (
    <div
      className={classes.root}
      style={isLoading ? { textAlign: 'center' } : { textAlign: 'left' }}
    >
      {isLoading ? (
        <CircularProgress disableShrink color="primary" />
      ) : (
        <div>
          {getNapsDetailInfo().body &&
          (getNapsDetailInfo().body.has_entered ||
            isAdminUser ||
            isAnyRaceCompleted()) ? (
            <>
              <div className={classes.title}>
                <h1 className={classes.h1}>
                  {leaderboardStore.napsDetailInfo.title}
                </h1>
              </div>
              {getDetailInfo(getNapsDetailInfo().body.has_entered, isAdminUser)
                .length > 0 ? (
                <div className={classes.body}>
                  <div className="table-box">
                    <CustomTableBeta
                      columns={leaderBoardTable.napEntriesTableColumns()}
                      data={getDetailInfo(
                        getNapsDetailInfo().body.has_entered,
                        isAdminUser
                      )}
                      getRowProps={getRowProps}
                      getCellProps={getCellProps}
                      getHeaderProps={getHeaderProps}
                    />
                  </div>
                  {getNapsDetailInfo().body &&
                    (getNapsDetailInfo().body.prices_only_nap ||
                      getNapsDetailInfo().body.prices_only_nb ||
                      getNapsDetailInfo().body.prices_only_reserve) && (
                      <div className={classes.error}>
                        <WarningIcon color={theme.palette.primary.light} />
                        <p className={classes.paragraph}>
                          You’ll need to enter the NAP Comp to unlock all the
                          details of this member’s NAP picks ;)
                        </p>
                      </div>
                    )}
                </div>
              ) : (
                <div className={classes.error}>
                  <WarningIcon color={theme.palette.primary.light} />
                  <p className={classes.paragraph}>
                    You can't see NAP entry unless you've entered today (or race
                    has finished)
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className={classes.error}>
              <WarningIcon color={theme.palette.primary.light} />
              <p className={classes.paragraph}>
                You can't see NAP entry unless you've entered today (or race has
                finished)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

NAPEntryTooltip.propTypes = {
  rowData: PropTypes.object
}

export default NAPEntryTooltip
