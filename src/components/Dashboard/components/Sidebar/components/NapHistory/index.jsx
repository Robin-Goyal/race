import React from 'react'
import PropTypes from 'prop-types'
import Accordion from '@components/shared/Accordion'

const NapHistory = ({ napInfo }) => (
  <div>
    <Accordion
      title="Free NAP Competition Details"
      className="sidebar-box-3"
      showIcon
    >
      <div className="content-data">
        <div className="history-data">
          <p>
            Twitter:{' '}
            {napInfo && napInfo.twitter_handle ? (
              <span>
                &nbsp;
                <a
                  className="leader-board__twitter-handle"
                  rel="noreferrer"
                  target="_blank"
                  href={`https://twitter.com/${napInfo.twitter_handle}`}
                >
                  {`@${napInfo.twitter_handle}`}
                </a>
              </span>
            ) : (
              'Not authorized'
            )}
          </p>
          {napInfo && napInfo.first_date && (
            <p>First NAP Entry: {napInfo.first_date}</p>
          )}
          <div className="history-data-row">
            <p>
              Played: {napInfo && napInfo.num_days ? napInfo.num_days : '0'}{' '}
              times
            </p>
            <p>
              % Played:{' '}
              {napInfo && napInfo.days_percentage
                ? napInfo.days_percentage
                : '0'}
              %
            </p>
          </div>
          <p className="history-data-row-underline">Streaks</p>
          <div className="history-data-row">
            <p>
              Longest:{' '}
              {napInfo && napInfo.longest_streak ? napInfo.longest_streak : '0'}{' '}
              {napInfo && napInfo.longest_streak === 1 ? 'Day' : 'Days'}
            </p>
            <p>
              Current:{' '}
              {napInfo && napInfo.current_streak ? napInfo.current_streak : '0'}{' '}
              {napInfo && napInfo.current_streak === 1 ? 'Day' : 'Days'}
            </p>
          </div>
        </div>
      </div>
    </Accordion>
  </div>
)

NapHistory.propTypes = {
  napInfo: PropTypes.object
}

export default NapHistory
