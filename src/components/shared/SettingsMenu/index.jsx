import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@components/shared/Form/Checkbox'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import BorderAllIcon from '@material-ui/icons/BorderAll'
import GetAppIcon from '@material-ui/icons/GetApp'
import { makeStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import dateConversations from '@utils/timeUtils'
import { isFreeFriday } from '@store/memberStore/selectors'
import { isExtendedMember } from '@store/memberStore/selectors'
import isEmpty from 'lodash/isEmpty'
const useSettingsMenuStyles = makeStyles(() => ({
  root: {
    padding: '9px 11px 9px 0'
  }
}))
const SettingsMenu = ({
  anchorEl,
  isOpen,
  handleClose,
  handleDownload,
  handleColumnsSettings,
  handleFreezeHorseNameChange,
  handleSynchroniseScrollbar,
  menuList,
  memberSettings,
  horseFreezeName,
  synchroniseScrollbar,
  onChange,
  showDownloadButtons
}) => {
  const isExtendMember = useSelector(isExtendedMember)
  const isFreeFridayMember = useSelector(isFreeFriday)
  const { isExample } = useSelector((store) => store.races)

  const classes = useSettingsMenuStyles()
  return (
    <Menu
      id="settings-menu"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      getContentAnchorEl={null}
      keepMounted
      open={isOpen}
      onClose={handleClose}
    >
      <MenuItem key="columnsSettings" onClick={handleColumnsSettings}>
        <BorderAllIcon
          color="action"
          fontSize="small"
          classes={{
            root: classes.root
          }}
        />{' '}
        <span>Column Settings</span>
      </MenuItem>
      {!isEmpty(memberSettings) &&
        menuList.map(({ label, name }) =>
          !isExtendMember &&
          !isExample &&
          !(
            isFreeFridayMember &&
            dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday'
          ) &&
          name === 'hide_comments' ? null : (
            <MenuItem key={name} onClick={handleClose}>
              <Checkbox
                label={label}
                name={name}
                color="primary"
                checked={memberSettings[name]}
                onChange={() => onChange(name)}
              />
            </MenuItem>
          )
        )}
      <MenuItem key="horseNameFreeze" onClick={handleClose}>
        <Checkbox
          label="Freeze Horse Name"
          name="horseNameFreeze"
          color="primary"
          checked={horseFreezeName}
          onChange={handleFreezeHorseNameChange}
        />
      </MenuItem>
      {(isExtendMember ||
        (isFreeFridayMember &&
          dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday')) &&
        showDownloadButtons && (
          <MenuItem key="downloadCSV" onClick={() => handleDownload('csv')}>
            <GetAppIcon
              color="action"
              fontSize="small"
              classes={{
                root: classes.root
              }}
            />{' '}
            <span>Download CSV</span>
          </MenuItem>
        )}
      {(isExtendMember ||
        (isFreeFridayMember &&
          dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday')) &&
        showDownloadButtons && (
          <MenuItem key="downloadXLS" onClick={() => handleDownload('xls')}>
            <GetAppIcon
              color="action"
              fontSize="small"
              classes={{
                root: classes.root
              }}
            />{' '}
            <span>Download XLS</span>
          </MenuItem>
        )}
      {handleSynchroniseScrollbar && (
        <MenuItem key="synchroniseScrollbar" onClick={handleClose}>
          <Checkbox
            label="Synchronise Scroll bar"
            name="synchroniseScrollbar"
            color="primary"
            checked={synchroniseScrollbar}
            onChange={handleSynchroniseScrollbar}
          />
        </MenuItem>
      )}
    </Menu>
  )
}
SettingsMenu.propTypes = {
  anchorEl: function (props, propName, componentName) {
    if (typeof props[propName] !== 'object')
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      )
  },
  isOpen: PropTypes.bool.isRequired,
  horseFreezeName: PropTypes.bool.isRequired,
  synchroniseScrollbar: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleColumnsSettings: PropTypes.func.isRequired,
  handleFreezeHorseNameChange: PropTypes.func.isRequired,
  handleSynchroniseScrollbar: PropTypes.func,
  menuList: PropTypes.array.isRequired,
  handleDownload: PropTypes.func,
  memberSettings: PropTypes.shape({
    hints_disabled: PropTypes.bool,
    show_fractional_odds: PropTypes.bool,
    show_nationalities: PropTypes.bool,
    hide_comments: PropTypes.bool,
    notifications_disabled: PropTypes.bool,
    show_non_runners: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  showDownloadButtons: PropTypes.bool
}
export default React.memo(SettingsMenu)
