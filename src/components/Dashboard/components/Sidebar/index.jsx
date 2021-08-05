import React from 'react'
import PropTypes from 'prop-types'
import Races from '@components/Dashboard/components/Sidebar/components/Races'
import Downloads from '@components/Dashboard/components/Sidebar/components/Downloads'
import NapHistory from '@components/Dashboard/components/Sidebar/components/NapHistory'

const Sidebar = ({
  isLoading = false,
  races,
  racesCourseNames,
  racesStartTime,
  downloadFileInfo,
  currentDate,
  updateCurrentDate,
  napInfo,
  loggedIn
}) => (
  <div className="col-xl-3 col-lg-3 col-md-12 sidebar-tab">
    <div className="sidebar-box">
      <div className="col-12">
        <Races
          isLoading={isLoading}
          races={races}
          racesCourseNames={racesCourseNames}
          racesStartTime={racesStartTime}
          currentDate={currentDate}
          updateCurrentDate={updateCurrentDate}
        />
      </div>
      {loggedIn && (
        <div className="col-12">
          <Downloads
            isLoading={isLoading}
            currentDate={currentDate}
            updateCurrentDate={updateCurrentDate}
            downloadFileInfo={downloadFileInfo}
          />
        </div>
      )}
      {loggedIn && (
        <div className="col-12">
          <NapHistory napInfo={napInfo} />
        </div>
      )}
    </div>
  </div>
)

Sidebar.propTypes = {
  isLoading: PropTypes.bool,
  races: PropTypes.any,
  currentDate: PropTypes.object,
  racesStartTime: PropTypes.object,
  racesCourseNames: PropTypes.array,
  updateCurrentDate: PropTypes.func,
  downloadFileInfo: PropTypes.func,
  napInfo: PropTypes.object,
  loggedIn: PropTypes.bool
}
export default Sidebar
