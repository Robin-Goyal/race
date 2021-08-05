import React, { memo } from 'react'
import isEqual from 'lodash/isEqual'
import Skeleton from 'react-loading-skeleton'
import { useTheme } from '@material-ui/core/styles'

const columnArray = [...Array(10).keys()]
const rowArray = [...Array(5).keys()]

const RaceSkeleton = () => {
  const theme = useTheme()
  return (
    <div style={{ marginBottom: 30 }}>
      <div className="row main-space dev-space">
        <div
          className="col-md-12 col-sm-12 col-xs-12 col-lg-12"
          style={{ paddingBottom: 0, paddingTop: 5 }}
        >
          <div className="main-ul-controls ux">
            <div className="time-box">
              <Skeleton width={30} style={{ marginRight: 20 }} />
              <Skeleton width={80} style={{ marginRight: 20 }} />
              <Skeleton width={80} style={{ marginRight: 20 }} />
              <Skeleton width={300} style={{ marginRight: 20 }} />
            </div>
            <div className="time-box-arrow">
              <Skeleton width={100} />
            </div>
          </div>
          <div className={`row race-details`}>
            <div
              className="col-md-12 col-sm-12 col-xs-12 col-lg-7"
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <div className="main-ul-controls ux">
                <div className="data-content">
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
                  <div className="control-ui uw">
                    <p>
                      <span className="distance-here">
                        <Skeleton width={70} />
                      </span>
                    </p>
                    <p>
                      <span className="classic-minute">
                        <Skeleton width={70} />
                      </span>
                    </p>
                  </div>
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
                    <span className="distance-here">
                      <Skeleton width={50} />
                    </span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      <Skeleton width={50} />
                    </span>
                  </p>
                </li>
                <li className="control-ui tx-all">
                  <p>
                    <span className="distance-here">
                      <Skeleton width={50} />
                    </span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      <Skeleton width={50} />
                    </span>
                  </p>
                </li>
                <li className="control-ui text-center">
                  <p>
                    <span className="distance-here">
                      <Skeleton width={50} />
                    </span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      <Skeleton width={50} />
                    </span>
                  </p>
                </li>
                <li className="control-ui text-center">
                  <p>
                    <span className="distance-here">
                      <Skeleton width={50} />
                    </span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      <Skeleton width={50} />
                    </span>
                  </p>
                </li>
                <li className="control-ui text-center">
                  <p>
                    <span className="distance-here">
                      <Skeleton width={50} />
                    </span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      <Skeleton width={50} />
                    </span>
                  </p>
                </li>
                <li className="control-ui text-center">
                  <p>
                    <span className="distance-here">
                      <Skeleton width={50} />
                    </span>
                  </p>
                  <p>
                    <span className="classic-minute">
                      <Skeleton width={50} />
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="races__wrapper">
        <div className="races__table">
          <table>
            <thead>
              <tr>
                {columnArray.map((column, index) => (
                  <th
                    style={{
                      backgroundColor: theme.palette.primary.light,
                      padding: '5px 10px'
                    }}
                    key={index}
                  >
                    <Skeleton width={50} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowArray.map((row, idx) => (
                <tr key={`${idx}-main`}>
                  {columnArray.map((column, index) => (
                    <td
                      key={index}
                      style={{ textAlign: 'center', padding: '5px 10px' }}
                    >
                      <Skeleton width={50} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function areEqual(prevProps, nextProps) {
  return isEqual(prevProps, nextProps)
}

export default memo(RaceSkeleton, areEqual)
