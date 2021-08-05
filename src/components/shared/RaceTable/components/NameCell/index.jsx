import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useMemberStore from '@utils/customHook/useMembersStore'
import PopOver from '@components/shared/PopOver'
import LampIcon from '@assets/img/table/lamp.png'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import dateConversations from '@utils/timeUtils'
import { isExtendedMember } from '@store/memberStore/selectors'
import { isFreeFriday } from '@store/memberStore/selectors'
import HorseNapTooltip from '@components/shared/RaceTable/components/HorseNapTooltip'
import CellTooltip from '@components/shared/RaceTable/components/CellTooltip'
import CommonPopOverContent from '@components/shared/RaceTable/components/CommonPopOverContent'

const useNameCellStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    padding: '0 5px'
  },
  link: {
    position: 'relative',
    color: '#11141A',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.tableLinkBackground
    },
    whiteSpace: 'nowrap',
    fontWeight: 600,
    fontFamily: '"lato", sans-serif',
    fontSize: 13
  },
  counter: {
    padding: '1px 8px',
    fontSize: 12,
    textAlign: 'center',
    verticalAlign: 'text-top',
    marginLeft: 5,
    borderRadius: 9,
    background: theme.palette.primary.light,
    color: 'white',
    width: 18,
    maxWidth: 12,
    height: 18
  },
  counterDiv: {
    position: 'absolute',
    right: 5,
    lineHeight: 1.5
  }
}))

const NameCell = ({ value, showBorder = false, originalRow }) => {
  const classes = useNameCellStyles()
  const { memberStorage } = useMemberStore()
  const isMember = useSelector(isExtendedMember)
  const isFreeFridayMember = useSelector(isFreeFriday)
  const { isExample } = useSelector((store) => store.races)
  const isNationalitiesShow = useMemo(
    () => memberStorage.settings && memberStorage.settings.show_nationalities,
    [memberStorage.settings]
  )

  return (
    <div
      className={classes.root}
      style={
        showBorder
          ? value.new_trainer
            ? { borderRight: '2px solid #ddd', paddingRight: 20 }
            : { borderRight: '2px solid #ddd' }
          : value.new_trainer
          ? { paddingRight: 20 }
          : null
      }
    >
      <Link
        className={classNames(classes.link)}
        to={value.url.replace('/api', '')}
        target="_blank"
        style={!isEmpty(value.nap_pick_data) ? { paddingRight: 35 } : null}
      >
        {value.name}
        {value.nationality && isNationalitiesShow && (
          <span className={classes.nationality}> ({value.nationality})</span>
        )}
      </Link>
      {!isEmpty(value.nap_pick_data) &&
        (isMember ||
          (dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday' &&
            isFreeFridayMember) ||
          isExample ||
          (originalRow &&
            originalRow.race_detail &&
            originalRow.race_detail.is_first)) && (
          <div className={classes.counterDiv}>
            <PopOver content={<HorseNapTooltip data={value.nap_pick_data} />}>
              <div className={classes.counter}>
                {value.nap_pick_data.num_picks}
              </div>
            </PopOver>
          </div>
        )}
      {value.new_trainer &&
        (isMember ||
          (dateConversations.getFormattedDate(dayjs(), 'dddd') === 'Friday' &&
            isFreeFridayMember) ||
          isExample ||
          (originalRow &&
            originalRow.race_detail &&
            originalRow.race_detail.is_first)) && (
          <div className={classes.counterDiv}>
            <PopOver
              content={
                !isEmpty(value.new_trainer_stats) ? (
                  <CellTooltip
                    name="Trainer switch 1st run stats"
                    stats={value.new_trainer_stats}
                  />
                ) : (
                  <CommonPopOverContent
                    caption="Trainer Switch"
                    description="First Occasion"
                  />
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

NameCell.propTypes = {
  value: PropTypes.object.isRequired,
  showBorder: PropTypes.bool,
  originalRow: PropTypes.object
}
export default memo(NameCell)
