import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '@components/Dashboard/components/Sidebar'
import { changeDate, fetchData } from '@components/WebRatings/ducks/actions'
import dateConversations from '@utils/timeUtils'
import { DEFAULT_DATE_FORMAT } from '@constants/dateFormatsList'
import DashboardLeaderBoard from '@components/Dashboard/components/Main/components/DashboardLeaderBoard'
import LatestResults from '@components/Dashboard/components/Main/components/LatestResults'
import TipStats from '@components/Dashboard/components/Main/components/TipStats'
import SignUp from '@components/Dashboard/components/Main/components/SignUp'
import { fetchNapHistory } from '@components/History/ducks/actions'
import { makeStyles } from '@material-ui/core/styles'
import { apiUrls } from '@constants/api'
import { downloadFile } from '@components/WebRatings/ducks/actions'
import SEO from '@components/SEO'
import { toast } from 'react-toastify'
import { Backdrop, CircularProgress } from '@material-ui/core'
import './index.scss'

const useDashboardStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const Dashboard = () => {
  const dispatch = useDispatch()
  const classes = useDashboardStyles()
  const [isDownloading, setDownloading] = useState(false)
  const [currentDate, setCurrentDate] = React.useState(
    dateConversations.getRawDate(new Date())
  )

  /* REDUX STORES */
  const { loggedIn } = useSelector((store) => store.member)
  const { isLoading, races, racesCourseNames, racesStartTime } = useSelector(
    (store) => store.races
  )
  const historyStore = useSelector(({ history }) => history)

  useEffect(() => {
    dispatch(changeDate())
    dispatch(fetchNapHistory())
  }, [])

  useEffect(() => {
    if (currentDate) {
      dispatch(
        fetchData({
          date: dateConversations.getFormattedDate(
            currentDate,
            DEFAULT_DATE_FORMAT
          )
        })
      )
    }
  }, [currentDate])

  const updateCurrentDate = (date, next) => {
    if (next) {
      setCurrentDate(dateConversations.addDate(date, 'day', 1))
    } else {
      setCurrentDate(dateConversations.substractDate(date, 'day', 1))
    }
  }

  const downloadFileInfo = (file, isTodaysDate) => () => {
    const dateFormat = dateConversations.getFormattedDate(
      currentDate,
      DEFAULT_DATE_FORMAT
    )
    if (file === 'rtr') {
      const win = window.open(
        'https://ratingtheraces.com/wp-content/uploads/static/RTR-Staking-Manager-1.2.xlsm',
        '_blank'
      )
      win.focus()
    } else {
      setDownloading(true)
      let url = apiUrls.races.downloadFile(file)
      if (!isTodaysDate) {
        url = apiUrls.races.downloadFile(file, dateFormat)
      }
      dispatch(
        downloadFile({
          url,
          file,
          dateFormat,
          onSuccess: () => {
            setDownloading(false)
          },
          onError: (e) => {
            const message = e.message || e
            toast.error(message)
            setDownloading(false)
          }
        })
      )
    }
  }

  return (
    <div className="row">
      <SEO title="Dashboard" />
      <div id="page-wrapper">
        <div id="page-inner">
          <div className="row dashboard-page">
            <Sidebar
              isLoading={isLoading}
              races={races}
              racesCourseNames={racesCourseNames}
              racesStartTime={racesStartTime}
              currentDate={currentDate}
              downloadFileInfo={downloadFileInfo}
              updateCurrentDate={updateCurrentDate}
              napInfo={historyStore.napInfo}
              loggedIn={loggedIn}
            />
            <div className="col-xl-9 col-lg-9 col-md-12 inner-page">
              <DashboardLeaderBoard />
              {loggedIn ? (
                <>
                  <LatestResults />
                  <TipStats />
                </>
              ) : (
                <SignUp />
              )}
            </div>
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={isDownloading}>
          <CircularProgress color="primary" disableShrink />
        </Backdrop>
      </div>
    </div>
  )
}
export default Dashboard
