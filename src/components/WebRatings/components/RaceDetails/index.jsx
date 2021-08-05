/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Loader from '@components/shared/Loader'
import dateConversations from '@utils/timeUtils'
import { racesDetailsColumns } from '@constants/tablesConfigs/racesSettings'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'

const RaceDetails = ({
  datakey,
  raceInfo,
  selectedStartTime,
  isLoading = false,
  showLink = false,
  sortName = '',
  showBothLink = false,
  redirectToRace
}) => {
  const [flagImage, setFlagImage] = useState(null)
  const [drawerOpenStatus, setDrawerOpenStatus] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const image = await import(
          `@assets/icons/flags/1x1/${raceInfo.course.flag}.svg`
        )
        setFlagImage(image.default)
      } catch (e) {
        setFlagImage(null)
      }
    })()
  }, [])

  const redirectToOneRace = () => {
    if (showBothLink || showLink) {
      redirectToRace(raceInfo.course, raceInfo.start_time)
    }
  }

  const redirectToAllRace = () => {
    if (showBothLink || !showLink) {
      redirectToRace(raceInfo.course, '')
    }
  }

  const columnsData = racesDetailsColumns()

  const handleDrawerToggle = () => {
    setDrawerOpenStatus(!drawerOpenStatus)
  }

  return (
    <div
      className="row main-space dev-space"
      style={{ marginBottom: 0 }}
      id={`race-detail-${datakey.toString()}`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className="col-md-12 col-sm-12 col-xs-12 col-lg-12"
            style={{ paddingBottom: 0, paddingTop: 5 }}
          >
            <div className="main-ul-controls ux">
              <div className="time-box">
                <span className="behind-the-race">
                  <span
                    className={
                      showBothLink || showLink
                        ? 'main-obj link-main-obj'
                        : 'main-obj'
                    }
                    style={{ marginLeft: 0 }}
                    onClick={redirectToOneRace}
                  >
                    {raceInfo.time}
                  </span>
                  <span
                    className={
                      showBothLink || !showLink
                        ? 'rtr-course link-main-obj'
                        : 'rtr-course'
                    }
                    onClick={redirectToAllRace}
                  >
                    {raceInfo.course.flag && flagImage && (
                      <img
                        className="img-fluid"
                        src={flagImage}
                        style={{ width: 16, height: 16 }}
                      />
                    )}
                    <b className="oriented-wraper">{`${raceInfo.course.name}${
                      raceInfo.course.surface_abbr
                        ? ` (${raceInfo.course.surface_abbr})`
                        : ''
                    }`}</b>
                  </span>
                  {raceInfo.time !==
                    dateConversations.getLocalTime(
                      selectedStartTime,
                      'HH:mm'
                    ) && (
                    <span className="main-obj">
                      {`(${dateConversations.getLocalTime(
                        selectedStartTime,
                        'HH:mm'
                      )} Local Time)`}
                    </span>
                  )}
                  {raceInfo.is_abandoned && (
                    <span className="rtr-course-abandoned">
                      <span className="main-cross-abandoned">ABANDONED</span>
                    </span>
                  )}
                  <span title={raceInfo.name} className="rtr-course-info">
                    <span className="main-cross">{raceInfo.name}</span>
                  </span>
                </span>
              </div>
              <div className="time-box-arrow">
                <div
                  className={classnames('sorted-by-section', {
                    blink: sortName,
                    hasSortBy: sortName
                  })}
                >
                  Sorted by:{' '}
                  <span>{sortName ? `${sortName}` : 'RTR Rank (Asc)'}</span>
                </div>
                <Tooltip
                  title={`${
                    !drawerOpenStatus
                      ? 'Show race details'
                      : 'Hide race details'
                  }`}
                >
                  <IconButton
                    className="time-box-arrow-icon"
                    edge="start"
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
          </div>

          <div
            className={`row race-details${!drawerOpenStatus ? ' hide' : ''}`}
          >
            <div
              className="col-md-12 col-sm-12 col-xs-12 col-lg-7"
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <div
                className={classnames(
                  'sorted-by-section sorted-by-section-responsive',
                  {
                    blink: sortName
                  }
                )}
              >
                Sorted by:{' '}
                <span>{sortName ? `${sortName}` : 'RTR Rank (Asc)'}</span>
              </div>
              <div className="main-ul-controls ux">
                <div className="data-content">
                  {columnsData &&
                    columnsData.length &&
                    columnsData[0].columns &&
                    columnsData[0].columns.length &&
                    columnsData[0].columns.map((column) => {
                      const initialValue = column.in_accessor
                        ? raceInfo[column.accessor][column.in_accessor]
                        : raceInfo[column.accessor]
                      const value = column.isBool
                        ? initialValue
                          ? 'Yes'
                          : 'No'
                        : initialValue
                      return (
                        <div className="control-ui uw" key={column.accessor}>
                          <p>
                            <span className="distance-here">
                              {column.Header}
                            </span>
                          </p>
                          <p>
                            <span
                              className="classic-minute"
                              style={
                                column.isBool
                                  ? initialValue
                                    ? { color: '#218B37' }
                                    : { color: '#FF6565' }
                                  : {}
                              }
                            >
                              {value || 'N/A'}
                            </span>
                          </p>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            <div
              className="col-md-12 col-sm-12 col-xs-12 col-lg-5"
              style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 5 }}
            >
              <ul className="main-ul-controls ui-example">
                <li className="control-ui uix">
                  <p>
                    <span className="distance-here">Win Overround</span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      {raceInfo.over_round || 'N/A'}
                    </span>
                  </p>
                </li>
                <li className="control-ui tx-all">
                  <p>
                    <span className="distance-here">Place Overround</span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      {raceInfo.place_over_round || 'N/A'}
                    </span>
                  </p>
                </li>
                {raceInfo.returns &&
                  raceInfo.returns.length &&
                  raceInfo.returns.map((returnData) => (
                    <li className="control-ui text-center" key={returnData[0]}>
                      <p>
                        <span className="distance-here">{returnData[0]}</span>
                      </p>
                      <p>
                        <span className="classic-minute">
                          {returnData[1] || '-'}
                        </span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

RaceDetails.propTypes = {
  raceInfo: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  datakey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedStartTime: PropTypes.string,
  showLink: PropTypes.bool,
  sortName: PropTypes.string,
  showBothLink: PropTypes.bool,
  redirectToRace: PropTypes.func
}
export default RaceDetails
