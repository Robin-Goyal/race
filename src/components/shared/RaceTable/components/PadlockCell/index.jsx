/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import PopOver from '@components/shared/PopOver'
import ClothNumberPopOverContent from '../ClothNumberPopOverContent'
import { makeStyles } from '@material-ui/core/styles'
import LockIcon from '@material-ui/icons/Lock'
import { racesTooltips } from '@constants/tablesConfigs/tooltips'

const usePadlockCellCellStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    display: 'flex'
  },
  popover: {
    width: '100%',
    position: 'relative'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 165,
    position: 'relative'
  },
  padLockIcon: {
    color: theme.palette.primary.light,
    width: 18,
    height: 18,
    marginLeft: 5,
    marginRight: 5
  }
}))

const PadlockCell = () => {
  const classes = usePadlockCellCellStyles()
  return (
    <div className={classes.root}>
      <PopOver
        content={<ClothNumberPopOverContent caption={racesTooltips.padlock} />}
        className={classes.popover}
      >
        <div className={classes.content}>
          <LockIcon className={classes.padLockIcon} />
          <LockIcon className={classes.padLockIcon} />
          <LockIcon className={classes.padLockIcon} />
          <LockIcon className={classes.padLockIcon} />
          <LockIcon className={classes.padLockIcon} />
        </div>
      </PopOver>
    </div>
  )
}

export default memo(PadlockCell)
