import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'
import SettingsMenu from '@components/shared/SettingsMenu'
import racesSettingsMenuList from '@constants/racesSettingsMenuList'
import { useSelector } from 'react-redux'
import { MODALS_LIST } from '@constants/common'
import RaceColumnsSettingsModal from '@components/shared/RaceColumnsSettingsModal'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core'
import { downloadFile } from '@components/WebRatings/ducks/actions'
import { useDispatch } from 'react-redux'
import useModal from '@utils/customHook/useModal'
import isEqual from 'lodash/isEqual'
import { apiUrls } from '@constants/api'
import { toast } from 'react-toastify'
import dateConversations from '@utils/timeUtils'
import Backdrop from '@material-ui/core/Backdrop'
import { isFreeFriday } from '@store/memberStore/selectors'
import { isExtendedMember } from '@store/memberStore/selectors'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DEFAULT_DATE_FORMAT } from '@constants/dateFormatsList'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const RacesSettings = ({
  handleColumnsSettingsChange,
  handleMemberSettingsChange,
  handleFreezeHorseNameChange,
  handleSynchroniseScrollbar,
  columnSettingsData,
  memberSettings,
  showDownloadButtons,
  currentDate
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isExtendMember = useSelector(isExtendedMember)
  const isFreeFridayMember = useSelector(isFreeFriday)
  const [isSettingsOpen, setSettingsOpenStatus] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isLoading, setLoading] = useState(false)

  const [isOpen, toggleModalState] = useModal(
    MODALS_LIST.RACES_COLUMNS_SETTINGS
  )

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSettingsOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setSettingsOpenStatus(true)
  }

  const handleSettingsClose = () => {
    setAnchorEl(null)
    setSettingsOpenStatus(false)
  }
  const handleColumnsSettingsClose = () => {
    toggleModalState()
    handleSettingsClose()
  }

  const handleDownload = (file) => {
    handleSettingsClose()
    setLoading(true)
    const dateFormat = dateConversations.getFormattedDate(
      currentDate,
      DEFAULT_DATE_FORMAT
    )
    let url = apiUrls.races.downloadFile(file, dateFormat)
    dispatch(
      downloadFile({
        url,
        file,
        dateFormat,
        onSuccess: () => {
          setLoading(false)
        },
        onError: (e) => {
          setLoading(false)
          const message = e.message || e
          toast.error(message)
        }
      })
    )
  }

  return (
    <div>
      <Button
        color="primary"
        onClick={handleSettingsOpen}
        aria-controls="simple-menu"
        aria-haspopup="true"
        startIcon={
          <SettingsIcon style={{ width: 13, height: 13, marginLeft: 4 }} />
        }
        style={{ textTransform: 'none', height: 26 }}
      >
        {showDownloadButtons &&
        (isExtendMember ||
          (isFreeFridayMember &&
            dateConversations.getFormattedDate(currentDate, 'dddd') ===
              'Friday'))
          ? 'Settings / CSV'
          : 'Race Settings'}
      </Button>
      <SettingsMenu
        isOpen={isSettingsOpen}
        handleDownload={handleDownload}
        handleClose={handleSettingsClose}
        handleColumnsSettings={handleColumnsSettingsClose}
        anchorEl={anchorEl}
        menuList={racesSettingsMenuList}
        memberSettings={memberSettings.settings}
        horseFreezeName={memberSettings.horseNameFreeze}
        synchroniseScrollbar={memberSettings.synchroniseScrollbar}
        onChange={handleMemberSettingsChange}
        handleFreezeHorseNameChange={handleFreezeHorseNameChange}
        handleSynchroniseScrollbar={handleSynchroniseScrollbar}
        showDownloadButtons={showDownloadButtons}
      />
      <RaceColumnsSettingsModal
        settingsData={columnSettingsData}
        fullScreen={fullScreen}
        isOpen={isOpen}
        handleClose={handleColumnsSettingsClose}
        handleColumnsSettingsChange={handleColumnsSettingsChange}
      />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" disableShrink />
      </Backdrop>
    </div>
  )
}

RacesSettings.propTypes = {
  handleColumnsSettingsChange: PropTypes.func.isRequired,
  handleMemberSettingsChange: PropTypes.func.isRequired,
  handleFreezeHorseNameChange: PropTypes.func.isRequired,
  handleSynchroniseScrollbar: PropTypes.func,
  columnSettingsData: PropTypes.array.isRequired,
  showDownloadButtons: PropTypes.bool,
  currentDate: PropTypes.object,
  memberSettings: PropTypes.shape({
    settings: PropTypes.shape({
      hints_disabled: PropTypes.bool,
      show_fractional_odds: PropTypes.bool,
      show_nationalities: PropTypes.bool,
      hide_comments: PropTypes.bool,
      notifications_disabled: PropTypes.bool,
      show_non_runners: PropTypes.bool
    }),
    horseNameFreeze: PropTypes.bool.isRequired,
    synchroniseScrollbar: PropTypes.bool.isRequired
  }).isRequired
}

function areEqual(prevProps, nextProps) {
  return isEqual(prevProps, nextProps)
}

export default memo(RacesSettings, areEqual)
