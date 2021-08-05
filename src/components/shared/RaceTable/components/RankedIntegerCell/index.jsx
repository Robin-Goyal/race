import React, { memo } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import PopOver from '@components/shared/PopOver'
import LampIcon from '@assets/img/table/lamp.png'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import dateConversations from '@utils/timeUtils'
import CellTooltip from '@components/shared/RaceTable/components/CellTooltip'
import ClothNumberPopOverContent from '@components/shared/RaceTable/components/ClothNumberPopOverContent'
import { isExtendedMember } from '@store/memberStore/selectors'
import { isFreeFriday } from '@store/memberStore/selectors'
import LockIcon from '@material-ui/icons/Lock'
import { useSelector } from 'react-redux'
import { racesTooltips } from '@constants/tablesConfigs/tooltips'

const useRankedIntegerCellStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2px',
    height: '100%',
    position: 'relative',
    fontWeight: 700,
    fontSize: '14px'
  },
  counterDiv: {
    position: 'absolute',
    right: 0
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

const RankedIntegerCell = ({
  value,
  originalRow,
  showDoubleBorder = false,
  showPadLock = false
}) => {
  const isMember = useSelector(isExtendedMember)
  const isFreeFridayMember = useSelector(isFreeFriday)
  const { isExample } = useSelector((store) => store.races)

  const classes = useRankedIntegerCellStyles()
  if (
    showPadLock &&
    !isMember &&
    !(
      isFreeFridayMember &&
      dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday'
    ) &&
    !isExample &&
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
          ? value.data && value.data.gelded
            ? {
                backgroundColor: `#${value.colour}`,
                borderRight: showDoubleBorder
                  ? '2px solid #ddd'
                  : '1px solid #ddd',
                paddingRight: 18,
                paddingLeft: 18
              }
            : {
                backgroundColor: `#${value.colour}`,
                borderRight: showDoubleBorder
                  ? '2px solid #ddd'
                  : '1px solid #ddd'
              }
          : value.data && value.data.gelded
          ? { paddingRight: 18, paddingLeft: 18 }
          : null
      }
    >
      {value.value}
      {value.data && value.data.gelded && isMember && (
        <div className={classes.counterDiv}>
          <PopOver
            content={
              !isEmpty(value.data.gelded_stats) ? (
                <CellTooltip
                  name="Horse Gelded Stats by Trainer"
                  stats={value.data.gelded_stats}
                />
              ) : (
                <ClothNumberPopOverContent caption="Horse Gelded" />
              )
            }
          >
            <img src={LampIcon} alt="Info" />
          </PopOver>
        </div>
      )}
    </div>
  )
}

RankedIntegerCell.propTypes = {
  value: PropTypes.shape({
    value: PropTypes.oneOfType[(PropTypes.string, PropTypes.number)],
    colour: PropTypes.string,
    data: PropTypes.any
  }),
  originalRow: PropTypes.object,
  showDoubleBorder: PropTypes.bool,
  showPadLock: PropTypes.bool
}
export default memo(RankedIntegerCell)
