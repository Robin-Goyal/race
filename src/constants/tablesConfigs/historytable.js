/* eslint-disable react/prop-types */
import HeaderTooltip from '@components/shared/RaceTable/components/HeaderTooltip'
import { racesTooltips } from '@constants/tablesConfigs/tooltips'
import NameCell from '@components/shared/RaceTable/components/NameCell'
import NagmeButton from '@components/shared/NagMe/components/NagmeButton'
import ClothNumberCell from '@components/shared/RaceTable/components/ClothNumberCell'
import StallDrawCell from '@components/shared/RaceTable/components/StallDrawCell'
import ResultCell from '@components/shared/RaceTable/components/ResultCell'
import RankedDecimalCell from '@components/shared/RaceTable/components/RankedDecimalCell'
import RankedIntegerCell from '@components/shared/RaceTable/components/RankedIntegerCell'
import WinPriceCell from '@components/shared/RaceTable/components/WinPriceCell'
import PlaceOddsCell from '@components/shared/RaceTable/components/PlaceOddsCell'
import ISPCell from '@components/shared/RaceTable/components/ISPCell'
import StatsCell from '@components/shared/RaceTable/components/StatsCell'
import RStatsCell from '@components/shared/RaceTable/components/RStatsCell'
import DateTimeCell from '@components/shared/RaceTable/components/DateTimeCell'
import TextCell from '@components/shared/RaceTable/components/TextCell'
import React from 'react'
import dateConversations from '@utils/timeUtils'
import {
  statsColumns,
  combinedColumns
} from '@constants/tablesConfigs/racesSettings'

function historyColumnsRender(isFreezeHorse, isMember = false, statsMod) {
  return [
    {
      Header: () => null,
      id: 'base_actions_columns',
      columns: [
        {
          accessor: 'race',
          sortType: (a, b) => {
            if (
              a.original &&
              b.original &&
              a.original.race &&
              b.original.race &&
              a.original.race.start_time &&
              b.original.race.start_time
            ) {
              const result = dateConversations.compareTwoDates(
                a.original.race.start_time,
                b.original.race.start_time
              )
              return result ? 1 : -1
            } else if (
              a.original &&
              a.original.race &&
              a.original.race.start_time
            ) {
              return 1
            } else if (
              b.original &&
              b.original.race &&
              b.original.race.start_time
            ) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="Date" title={racesTooltips.date} />
          ),
          style: { padding: '0' },
          Cell: (rowData) => (
            <DateTimeCell
              value={rowData.value}
              isTime={false}
              showBorder={true}
            />
          )
        },
        {
          accessor: 'race_details',
          disableSortBy: true,
          Header: () => (
            <HeaderTooltip label="Time" title={racesTooltips.time} />
          ),
          style: { padding: '0' },
          Cell: (rowData) => (
            <DateTimeCell
              value={rowData.value}
              isTime={true}
              showBorder={true}
            />
          )
        },
        {
          accessor: 'race.course',
          sortType: (a, b) => {
            if (
              a.original &&
              b.original &&
              a.original.race &&
              b.original.race &&
              a.original.race.course &&
              b.original.race.course
            ) {
              return a.original.race.course.name > b.original.race.course.name
                ? 1
                : -1
            } else if (
              a.original &&
              a.original.race &&
              a.original.race.course
            ) {
              return 1
            } else if (
              b.original &&
              b.original.race &&
              b.original.race.course
            ) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="Course" title={racesTooltips.course} />
          ),
          style: { padding: '0' },
          Cell: (rowData) => (
            <TextCell
              value={
                rowData.value
                  ? `${rowData.value.name}${
                      rowData.value.surface_abbr
                        ? ` (${rowData.value.surface_abbr})`
                        : ''
                    }`
                  : ''
              }
              showBorder={true}
            />
          )
        },
        {
          accessor: 'race.race_type',
          sortType: (a, b) => {
            if (
              a.original &&
              b.original &&
              a.original.race &&
              b.original.race &&
              a.original.race.race_type &&
              b.original.race.race_type
            ) {
              return a.original.race.race_type > b.original.race.race_type
                ? 1
                : -1
            } else if (
              a.original &&
              a.original.race &&
              a.original.race.race_type
            ) {
              return 1
            } else if (
              b.original &&
              b.original.race &&
              b.original.race.race_type
            ) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="Race Type" title={racesTooltips.raceType} />
          ),
          style: { padding: '0' },
          Cell: (rowData) => (
            <TextCell
              value={rowData.value ? rowData.value : ''}
              showBorder={true}
            />
          )
        },
        {
          accessor: 'race.distance',
          disableSortBy: true,
          Header: () => (
            <HeaderTooltip label="Distance" title={racesTooltips.distance} />
          ),
          style: { padding: '0' },
          Cell: (rowData) => (
            <TextCell
              value={rowData.value ? rowData.value.value : ''}
              showBorder={true}
            />
          )
        },
        {
          accessor: 'race.going',
          Header: () => (
            <HeaderTooltip label="Going" title={racesTooltips.going} />
          ),
          style: { padding: '0' },
          Cell: (rowData) => (
            <TextCell value={rowData.value} showBorder={false} />
          )
        },
        {
          accessor: 'cloth',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.cloth && a.original.cloth.number
                ? a.original.cloth.number
                : 9999999999
            const bValue =
              b.original && b.original.cloth && b.original.cloth.number
                ? b.original.cloth.number
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => <HeaderTooltip label="#" title={racesTooltips.cloth} />,
          style: { padding: '0', width: 40, minWidth: 40 },
          Cell: (rowData) => <ClothNumberCell value={rowData.value} />
        },
        {
          accessor: 'stall_draw',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.stall_draw && a.original.stall_draw.value
                ? a.original.stall_draw.value
                : 9999999999
            const bValue =
              b.original && b.original.stall_draw && b.original.stall_draw.value
                ? b.original.stall_draw.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="Draw" title={racesTooltips.stallDraw} />
          ),
          style: { padding: 0, textAlign: 'center' },
          Cell: (rowData) => <StallDrawCell value={rowData.value} />
        },
        {
          accessor: 'stall_draw_distance',
          sortDescFirst: true,
          sortType: (a, b) => {
            if (
              a.original &&
              b.original &&
              a.original.stall_draw_distance &&
              b.original.stall_draw_distance &&
              a.original.stall_draw_distance.stats &&
              b.original.stall_draw_distance.stats
            ) {
              const aStats =
                a.original.stall_draw_distance.stats[statsMod.value]
              const bStats =
                b.original.stall_draw_distance.stats[statsMod.value]
              if (aStats && bStats && statsMod.value === 'win_pr') {
                return aStats.value > bStats.value ? 1 : -1
              } else if (aStats && bStats) {
                const aStatsPercentage = aStats.successes / aStats.runs
                const bStatsPercentage = bStats.successes / bStats.runs
                return aStatsPercentage > bStatsPercentage ? 1 : -1
              } else {
                return 1
              }
            } else if (
              a.original &&
              a.original.stall_draw_distance &&
              a.original.stall_draw_distance.stats
            ) {
              return 1
            } else if (
              b.original &&
              b.original.stall_draw_distance &&
              b.original.stall_draw_distance.stats
            ) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip
              label="DBD"
              title={racesTooltips.stallDrawDistance}
            />
          ),
          style: { padding: 0 },
          Cell: (rowData) => (
            <StatsCell
              value={rowData.value && rowData.value.stats}
              name="Draw by distance"
            />
          )
        }
      ]
    },
    {
      Header: () => null,
      id: 'base_info_columns',
      sticky: isFreezeHorse ? 'left' : false,
      columns: [
        {
          accessor: 'horse',
          sortType: (a, b) => {
            if (
              a.original &&
              b.original &&
              a.original.horse &&
              b.original.horse
            ) {
              return a.original.horse.name > b.original.horse.name ? 1 : -1
            } else if (a.original && a.original.horse) {
              return 1
            } else if (b.original && b.original.horse) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip
              label="Horse Name"
              title={racesTooltips.horse}
              style={{ textAlign: 'left' }}
            />
          ),
          style: isFreezeHorse
            ? {
                background: 'inherit',
                backgroundClip: 'padding-box',
                left: 0,
                textAlign: 'left',
                padding: '0'
              }
            : { padding: '0', textAlign: 'left' },
          Cell: (rowData) => (
            <NameCell
              value={rowData.value}
              showBorder={true}
              originalRow={rowData.row.original}
              frozen
            />
          )
        }
      ]
    },
    {
      Header: () => null,
      id: 'rtr_run_info',
      columns: [
        {
          accessor: 'nag_me',
          disableSortBy: true,
          id: 'nagme_action',
          Header: () => (
            <HeaderTooltip label="NagMe" title={racesTooltips.nagme} />
          ),
          width: 90,
          Cell: (rowData) => (
            <NagmeButton
              data={rowData.value}
              horse={rowData.row.original.horse}
              run_id={rowData.row.original.id}
            />
          )
        },
        {
          accessor: 'result',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.result && a.original.result.value
                ? a.original.result.value
                : 9999999999
            const bValue =
              b.original && b.original.result && b.original.result.value
                ? b.original.result.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="Result" title={racesTooltips.result} />
          ),
          width: 20,
          style: { textAlign: 'center', padding: '0 5px' },
          Cell: (rowData) => <ResultCell value={rowData.value} res={rowData} />
        }
      ]
    },
    {
      Header: () => null,
      id: 'rtr_score_group',
      columns: [
        {
          accessor: 'rtr_score',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.rtr_score && a.original.rtr_score.value
                ? a.original.rtr_score.value
                : 9999999999
            const bValue =
              b.original && b.original.rtr_score && b.original.rtr_score.value
                ? b.original.rtr_score.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="RTR Score" title={racesTooltips.rtrScore} />
          ),
          Cell: (rowData) => (
            <RankedDecimalCell
              value={rowData.value}
              originalRow={rowData.row.original}
              showPadLock
            />
          )
        },
        {
          accessor: 'rtr_rank',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.rtr_rank && a.original.rtr_rank.value
                ? a.original.rtr_rank.value
                : 9999999999
            const bValue =
              b.original && b.original.rtr_rank && b.original.rtr_rank.value
                ? b.original.rtr_rank.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="RTR Rank" title={racesTooltips.rtrRank} />
          ),
          Cell: (rowData) => (
            <RankedIntegerCell
              value={rowData.value}
              originalRow={rowData.row.original}
              showPadLock
            />
          )
        },
        {
          accessor: 'value_odds',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.value_odds && a.original.value_odds.value
                ? a.original.value_odds.value
                : 9999999999
            const bValue =
              b.original && b.original.value_odds && b.original.value_odds.value
                ? b.original.value_odds.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="Value Odds" title={racesTooltips.valueOdds} />
          ),
          Cell: (rowData) => (
            <RankedDecimalCell
              value={rowData.value}
              originalRow={rowData.row.original}
              showPadLock
            />
          )
        }
      ]
    },
    {
      Header: () => null,
      id: 'rtr_odds_info',
      columns: [
        {
          accessor: 'win_price.value',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.win_price && a.original.win_price.value
                ? a.original.win_price.value
                : 9999999999
            const bValue =
              b.original && b.original.win_price && b.original.win_price.value
                ? b.original.win_price.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="Win Odds" title={racesTooltips.winPrice} />
          ),
          style: { padding: '0 5px' },
          Cell: (rowData) => (
            <WinPriceCell value={rowData.value} res={rowData} />
          )
        },
        {
          accessor: 'win_price.reduction',
          sortType: (a, b) => {
            const aValue =
              a.original &&
              a.original.win_price &&
              a.original.win_price.reduction
                ? a.original.win_price.reduction
                : 9999999999
            const bValue =
              b.original &&
              b.original.win_price &&
              b.original.win_price.reduction
                ? b.original.win_price.reduction
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip
              label="Win PR"
              title={racesTooltips.winPriceReduction}
            />
          ),
          style: { padding: '0 5px' },
          Cell: (rowData) => (
            <WinPriceCell
              value={rowData.value}
              res={rowData}
              isPercentage={true}
            />
          )
        },
        {
          accessor: 'value_percentage',
          sortDescFirst: true,
          sortType: (a, b) => {
            if (
              a.original &&
              b.original &&
              a.original.value_percentage &&
              b.original.value_percentage
            ) {
              return a.original.value_percentage.value >
                b.original.value_percentage.value
                ? 1
                : -1
            } else if (a.original && a.original.value_percentage) {
              return 1
            } else if (b.original && b.original.value_percentage) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip
              label="Value %"
              title={racesTooltips.valuePercentage}
            />
          ),
          style: { padding: '0 5px' },
          Cell: (rowData) => (
            <RankedDecimalCell
              value={rowData.value}
              originalRow={rowData.row.original}
              isPercentage={true}
            />
          )
        },
        {
          accessor: 'isp',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.isp && a.original.isp.decimal
                ? a.original.isp.decimal
                : 9999999999
            const bValue =
              b.original && b.original.isp && b.original.isp.decimal
                ? b.original.isp.decimal
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => <HeaderTooltip label="ISP" title={racesTooltips.isp} />,
          style: { padding: '0 5px' },
          Cell: (rowData) => <ISPCell value={rowData.value} />
        },
        {
          accessor: 'place_price',
          sortType: (a, b) => {
            const aValue =
              a.original &&
              a.original.place_price &&
              a.original.place_price.value
                ? a.original.place_price.value
                : 9999999999
            const bValue =
              b.original &&
              b.original.place_price &&
              b.original.place_price.value
                ? b.original.place_price.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip
              label="Place Odds"
              title={racesTooltips.placePrice}
            />
          ),
          Cell: (rowData) => (
            <PlaceOddsCell value={rowData.value} res={rowData} />
          )
        },
        {
          accessor: 'form',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.form ? a.original.form : 9999999999
            const bValue =
              b.original && b.original.form ? b.original.form : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip
              label="Form"
              title={racesTooltips.form}
              style={{ textAlign: 'left' }}
            />
          ),
          style: {
            padding: '0 5px',
            fontWeight: 700,
            fontSize: 14,
            textAlign: 'left'
          },
          sortable: false
        }
      ]
    },
    {
      Header: () => null,
      id: 'rtr_historic_stats',
      columns: [
        {
          accessor: 'r_values.r1',
          sortDescFirst: true,
          sortType: (a, b) => {
            const aValue =
              a.original &&
              a.original.r_values &&
              a.original.r_values.r1 &&
              a.original.r_values.r1.value !== undefined &&
              a.original.r_values.r1.value !== ''
                ? typeof a.original.r_values.r1.value === 'string' &&
                  a.original.r_values.r1.value !== '0'
                  ? -1
                  : a.original.r_values.r1.value
                : -2
            const bValue =
              b.original &&
              b.original.r_values &&
              b.original.r_values.r1 &&
              b.original.r_values.r1.value !== undefined &&
              b.original.r_values.r1.value !== ''
                ? typeof b.original.r_values.r1.value === 'string' &&
                  b.original.r_values.r1.value !== '0'
                  ? -1
                  : b.original.r_values.r1.value
                : -2
            return aValue > bValue ? 1 : -1
          },
          Header: `R`,
          Cell: (rowData) => (
            <RStatsCell value={rowData.value} res={rowData} rowID={1} />
          )
        },
        {
          accessor: 'av10',
          sortDescFirst: true,
          sortType: (a, b) => {
            if (
              a.original &&
              b.original &&
              a.original.av10 &&
              b.original.av10
            ) {
              return a.original.av10.value > b.original.av10.value ? 1 : -1
            } else if (a.original && a.original.av10) {
              return 1
            } else if (b.original && b.original.av10) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="AV10" title={racesTooltips.av10} />
          ),
          Cell: (props) => (
            <RankedDecimalCell
              value={props.value}
              originalRow={props.row.original}
              showDoubleBorder
              showOneDecimal
            />
          )
        },
        {
          accessor: 'av10_rank',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.av10_rank && a.original.av10_rank.value
                ? a.original.av10_rank.value
                : 9999999999
            const bValue =
              b.original && b.original.av10_rank && b.original.av10_rank.value
                ? b.original.av10_rank.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="AV10 Rank" title={racesTooltips.av10Rank} />
          ),
          Cell: (props) => (
            <RankedIntegerCell
              value={props.value}
              originalRow={props.row.original}
              showDoubleBorder
            />
          )
        },
        {
          accessor: 'av3',
          sortDescFirst: true,
          sortType: (a, b) => {
            if (a.original && b.original && a.original.av3 && b.original.av3) {
              return a.original.av3.value > b.original.av3.value ? 1 : -1
            } else if (a.original && a.original.av3) {
              return 1
            } else if (b.original && b.original.av3) {
              return -1
            }
            return 1
          },
          Header: () => <HeaderTooltip label="AV3" title={racesTooltips.av3} />,
          Cell: (props) => (
            <RankedDecimalCell
              value={props.value}
              originalRow={props.row.original}
              showDoubleBorder
              showOneDecimal
            />
          )
        },
        {
          accessor: 'av3_rank',
          sortType: (a, b) => {
            const aValue =
              a.original && a.original.av3_rank && a.original.av3_rank.value
                ? a.original.av3_rank.value
                : 9999999999
            const bValue =
              b.original && b.original.av3_rank && b.original.av3_rank.value
                ? b.original.av3_rank.value
                : 9999999999
            if (aValue && bValue) {
              return aValue > bValue ? 1 : -1
            } else if (aValue) {
              return 1
            } else if (bValue) {
              return -1
            }
            return 1
          },
          Header: () => (
            <HeaderTooltip label="AV3 Rank" title={racesTooltips.av3Rank} />
          ),
          Cell: (props) => (
            <RankedIntegerCell
              value={props.value}
              originalRow={props.row.original}
            />
          )
        }
      ]
    },
    {
      Header: () => null,
      id: 'rtr_horse_status',
      columns: [
        {
          accessor: 'class_change',
          style: { fontWeight: 700, padding: '0 5px' },
          Header: () => (
            <HeaderTooltip label="Class" title={racesTooltips.class} />
          )
        },
        {
          accessor: 'sex',
          sortType: (a, b) => {
            if (a.original && b.original && a.original.sex && b.original.sex) {
              return a.original.sex.value > b.original.sex.value ? 1 : -1
            } else if (a.original && a.original.sex) {
              return 1
            } else if (b.original && b.original.sex) {
              return -1
            }
            return 1
          },
          Header: () => <HeaderTooltip label="Sex" title={racesTooltips.sex} />,
          style: { padding: '0 5px' },
          Cell: (rowData) => (
            <RankedIntegerCell
              value={rowData.value}
              originalRow={rowData.row.original}
            />
          )
        },
        {
          accessor: 'age',
          style: { fontWeight: 700, padding: '0 5px' },
          Header: () => <HeaderTooltip label="Age" title={racesTooltips.age} />
        },
        {
          accessor: 'days',
          style: { fontWeight: 700, padding: '0 5px' },
          Header: () => (
            <HeaderTooltip label="Days" title={racesTooltips.days} />
          )
        }
      ]
    },
    {
      Header: () => null,
      id: 'rtr_horse',
      columns: statsColumns('horse', 'Horse', false, false, statsMod)
    },
    {
      Header: () => null,
      id: 'rtr_trainer',
      columns: statsColumns('trainer', 'Trainer', true, true, statsMod)
    },
    {
      Header: () => null,
      id: 'rtr_jockey',
      columns: statsColumns('jockey', 'Jockey', true, true, statsMod)
    },
    {
      Header: () => null,
      id: 'rtr_sire',
      columns: statsColumns('sire', 'Sire', true, false, statsMod)
    },
    {
      Header: () => null,
      id: 'rtr_combined',
      columns: combinedColumns(isMember, statsMod)
    }
  ]
}

export { historyColumnsRender }
