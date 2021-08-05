import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import LockIcon from '@material-ui/icons/Lock'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import dateConversations from '@utils/timeUtils'
import { isExtendedMember } from '@store/memberStore/selectors'
import { isFreeFriday } from '@store/memberStore/selectors'

import ClothNumberPopOverContent from '@components/shared/RaceTable/components/ClothNumberPopOverContent'
import PopOver from '@components/shared/PopOver'
import { racesTooltips } from '@constants/tablesConfigs/tooltips'

const useRankedDecimalCellStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2px',
    height: '100%',
    fontWeight: 700,
    fontSize: '14px'
  },
  padLock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  padLockIcon: {
    color: theme.palette.primary.light,
    width: 18,
    height: 18
  }
}))

const RankedDecimalCell = ({
  value,
  originalRow,
  isPercentage = false,
  showDoubleBorder = false,
  showOneDecimal = false,
  showPadLock = false
}) => {
  const isMember = useSelector(isExtendedMember)
  const isFreeFridayMember = useSelector(isFreeFriday)
  const { isExample } = useSelector((store) => store.races)

  const classes = useRankedDecimalCellStyles()
  if (
    showPadLock &&
    !isMember &&
    !isExample &&
    !(
      isFreeFridayMember &&
      dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday'
    ) &&
    (!originalRow ||
      (originalRow && !originalRow.race_detail) ||
      (originalRow &&
        originalRow.race_detail &&
        !originalRow.race_detail.is_first))
  )
    return (
      <PopOver
        content={<ClothNumberPopOverContent caption={racesTooltips.padlock} />}
      >
        <div className={classes.padLock}>
          <LockIcon className={classes.padLockIcon} />
        </div>
      </PopOver>
    )
  if (!value || !value.value) return <div>-</div>
  return (
    <div
      className={classes.root}
      style={
        value.colour
          ? {
              backgroundColor: `#${value.colour}`,
              borderRight: showDoubleBorder
                ? '2px solid #ddd'
                : '1px solid #ddd'
            }
          : {}
      }
    >
      {/* eslint-disable-next-line react/prop-types */}
      {isPercentage
        ? `${value.value.toFixed(showOneDecimal ? 1 : 2)}%`
        : value.value.toFixed(showOneDecimal ? 1 : 2)}
    </div>
  )
}

RankedDecimalCell.propTypes = {
  value: PropTypes.shape({
    value: PropTypes.oneOfType[(PropTypes.string, PropTypes.number)],
    colour: PropTypes.string
  }),
  originalRow: PropTypes.object,
  isPercentage: PropTypes.bool,
  showDoubleBorder: PropTypes.bool,
  showOneDecimal: PropTypes.bool,
  showPadLock: PropTypes.bool
}
export default memo(RankedDecimalCell)
