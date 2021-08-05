import React from 'react'
import { Button, useTheme } from '@material-ui/core'
import './index.scss'

// eslint-disable-next-line react/prop-types
const SignUp = () => {
  const theme = useTheme()
  return (
    <div className="leader-board dashboard-signup">
      <div className="leader-board-table-section">
        <div className="dashboard-signup-title">Why Not Join Us Today?</div>
        <div className="dashboard-signup-subtitle">
          Join RatingTheRaces to get more useful features on your dashboard!
        </div>
        <div className="dashboard-signup-actions">
          <Button
            variant="contained"
            color="primary"
            href="https://ratingtheraces.com/index.php?register/MXapsx"
            style={{
              textTransform: 'capitalize',
              marginTop: 10,
              backgroundColor: theme.palette.primary.light,
              color: '#fff',
              marginRight: 15
            }}
          >
            Free Sign-up
          </Button>
          <Button
            variant="contained"
            color="primary"
            href="https://ratingtheraces.com/upgrade/"
            style={{
              textTransform: 'capitalize',
              marginTop: 10,
              backgroundColor: theme.palette.primary.light,
              color: '#fff'
            }}
          >
            Premium Sign-up
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
