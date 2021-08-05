import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Accordion from '@components/shared/Accordion'
import { ButtonGroup, Button } from '@material-ui/core'
import { Description } from '@material-ui/icons'
import dateConversations from '@utils/timeUtils'

const CustomButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 800,
    padding: '6px 12px',
    lineHeight: '32px',
    backgroundColor: '#ffffff',
    borderColor: '#DEDFDf',
    color: '#000000DE',
    '&:focus': {
      boxShadow: 'none',
      borderColor: '#DEDFDf',
      backgroundColor: '#ffffff',
      color: '#000000DE'
    },
    '&:active': {
      boxShadow: 'none',
      borderColor: '#DEDFDf',
      backgroundColor: '#f3f3f3',
      color: '#000000DE'
    },
    '&:hover': {
      backgroundColor: '#f3f3f3',
      borderColor: '#DEDFDf',
      boxShadow: 'none',
      color: '#000000DE'
    }
  }
})(Button)

const Downloads = ({
  isLoading = false,
  currentDate,
  updateCurrentDate,
  downloadFileInfo
}) => {
  const handleRaceDay = (day) => () => {
    if (day === 'today') {
      updateCurrentDate(currentDate, false)
    } else if (day === 'tomorrow') {
      updateCurrentDate(currentDate, true)
    }
  }
  const isTodaysDate = dateConversations.checkTwoDates(currentDate, new Date())

  return (
    <div>
      <Accordion title="Downloads" className="sidebar-box-2" showIcon>
        <div className="content-data">
          <ButtonGroup
            className="button-tab"
            aria-label="outlined primary button group"
            disableFocusRipple
            fullWidth
          >
            <CustomButton
              onClick={!isTodaysDate ? handleRaceDay('today') : null}
              className={isTodaysDate ? 'active-btn' : ''}
              disabled={isLoading}
            >
              Today
            </CustomButton>
            <CustomButton
              onClick={isTodaysDate ? handleRaceDay('tomorrow') : null}
              className={!isTodaysDate ? 'active-btn' : ''}
              disabled={isLoading}
            >
              Tomorrow
            </CustomButton>
          </ButtonGroup>
          <div className="file-button">
            <div className="button">
              <Button
                variant="contained"
                color="primary"
                disabled={isLoading}
                startIcon={<Description style={{ color: '#fff' }} />}
                onClick={downloadFileInfo('xls', isTodaysDate)}
              >
                XLS
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isLoading}
                startIcon={<Description style={{ color: '#fff' }} />}
                onClick={downloadFileInfo('csv', isTodaysDate)}
              >
                CSV
              </Button>
            </div>
          </div>
          <div className="input-tab-2">
            <div className="button">
              <Button
                variant="outlined"
                color="primary"
                disabled={isLoading}
                onClick={downloadFileInfo('rtr', isTodaysDate)}
              >
                RTR Staking Manager 1.2
              </Button>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  )
}

Downloads.propTypes = {
  isLoading: PropTypes.bool,
  currentDate: PropTypes.object,
  updateCurrentDate: PropTypes.func,
  downloadFileInfo: PropTypes.func
}

export default Downloads
