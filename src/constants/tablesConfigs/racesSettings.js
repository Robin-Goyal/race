/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import NagmeButton from '@components/shared/NagMe/components/NagmeButton'
import StatsCell from '@components/shared/RaceTable/components/StatsCell'
import NapCell from '@components/shared/RaceTable/components/NapCell'
import ClothNumberCell from '@components/shared/RaceTable/components/ClothNumberCell'
import StallDrawCell from '@components/shared/RaceTable/components/StallDrawCell'
import RankedDecimalCell from '@components/shared/RaceTable/components/RankedDecimalCell'
import RankedIntegerCell from '@components/shared/RaceTable/components/RankedIntegerCell'
import PadlockCell from '@components/shared/RaceTable/components/PadlockCell'
import ISPCell from '@components/shared/RaceTable/components/ISPCell'
import NameCell from '@components/shared/RaceTable/components/NameCell'
import SelectedCell from '@components/shared/RaceTable/components/SelectCell'
import ResultCell from '@components/shared/RaceTable/components/ResultCell'
import RStatsCell from '@components/shared/RaceTable/components/RStatsCell'
import HeaderTooltip from '@components/shared/RaceTable/components/HeaderTooltip'
import { racesTooltips } from '@constants/tablesConfigs/tooltips'
import WinPriceCell from '@components/shared/RaceTable/components/WinPriceCell'
import PlaceOddsCell from '@components/shared/RaceTable/components/PlaceOddsCell'

const ALL_COLUMNS = [
  { defaultValue: 'date', value: 'race', label: 'Date' },
  { defaultValue: 'time', value: 'race_details', label: 'Time' },
  { defaultValue: 'course', value: 'race.course', label: 'Course' },
  { defaultValue: 'race_type', value: 'race.race_type', label: 'Race Type' },
  { defaultValue: 'distance', value: 'race.distance', label: 'Distance' },
  { defaultValue: 'going', value: 'race.going', label: 'Going' },
  { defaultValue: 'horse_name', value: 'horse', label: 'Horse Name' },
  { defaultValue: 'nap', value: 'id', label: 'NAP' },
  { defaultValue: 'nag_me', value: 'nagme', label: 'NagMe' },
  { defaultValue: 'cloth_number', value: 'cloth', label: 'Cloth' },
  { defaultValue: 'stall_draw', value: 'stall_draw', label: 'Draw' },
  {
    defaultValue: 'stall_draw_distance',
    value: 'stall_draw_distance',
    label: 'DBD'
  },
  { defaultValue: 'result', value: 'result', label: 'Pos' },
  { defaultValue: 'rtr_score', value: 'rtr_score', label: 'RTR Score' },
  { defaultValue: 'rtr_rank', value: 'rtr_rank', label: 'RTR Rank' },
  { defaultValue: 'value_odds', value: 'value_odds', label: 'Value Odds' },
  { defaultValue: 'win_price', value: 'win_price.value', label: 'Win Odds' },
  {
    defaultValue: 'win_price_reduction',
    value: 'win_price.reduction',
    label: 'Win PR'
  },
  {
    defaultValue: 'value_percentage',
    value: 'value_percentage',
    label: 'Value %'
  },
  { defaultValue: 'industry_starting_price', value: 'isp', label: 'ISP' },
  { defaultValue: 'place_price', value: 'place_price', label: 'Place Odds' },
  { defaultValue: 'form', value: 'form', label: 'Form' },
  { defaultValue: 'r10', value: 'r_values.r10', label: 'R10' },
  { defaultValue: 'r9', value: 'r_values.r9', label: 'R9' },
  { defaultValue: 'r8', value: 'r_values.r8', label: 'R8' },
  { defaultValue: 'r7', value: 'r_values.r7', label: 'R7' },
  { defaultValue: 'r6', value: 'r_values.r6', label: 'R6' },
  { defaultValue: 'r5', value: 'r_values.r5', label: 'R5' },
  { defaultValue: 'r4', value: 'r_values.r4', label: 'R4' },
  { defaultValue: 'r3', value: 'r_values.r3', label: 'R3' },
  { defaultValue: 'r2', value: 'r_values.r2', label: 'R2' },
  { defaultValue: 'r1', value: 'r_values.r1', label: 'R1' },
  { defaultValue: 'r', value: 'r_values.r1', label: 'R' },
  { defaultValue: 'av10', value: 'av10', label: 'AV10' },
  { defaultValue: 'av10_rank', value: 'av10_rank', label: 'AV10 Rank' },
  { defaultValue: 'av3', value: 'av3', label: 'AV3' },
  { defaultValue: 'av3_rank', value: 'av3_rank', label: 'AV3 Rank' },
  { defaultValue: 'class', value: 'class_change', label: 'Class' },
  { defaultValue: 'sex', value: 'sex', label: 'Sex' },
  { defaultValue: 'age', value: 'age', label: 'Age' },
  { defaultValue: 'days', value: 'days', label: 'Days' },
  { defaultValue: 'horse_a_stats', value: 'horse.stats.a', label: 'Horse SR' },
  {
    defaultValue: 'horse_c_stats',
    value: 'horse.stats.c',
    label: 'Horse C SR'
  },
  {
    defaultValue: 'horse_t_stats',
    value: 'horse.stats.t',
    label: 'Horse T SR'
  },
  {
    defaultValue: 'horse_d_stats',
    value: 'horse.stats.d',
    label: 'Horse D SR'
  },
  {
    defaultValue: 'horse_dt_stats',
    value: 'horse.stats.dt',
    label: 'Horse DT SR'
  },
  {
    defaultValue: 'horse_cd_stats',
    value: 'horse.stats.cd',
    label: 'Horse CD SR'
  },
  {
    defaultValue: 'horse_g_stats',
    value: 'horse.stats.g',
    label: 'Horse G SR'
  },
  { defaultValue: 'trainer_name', value: 'trainer', label: 'Trainer name' },
  {
    defaultValue: 'trainer_d7_stats',
    value: 'trainer.stats.d7',
    label: 'Trainer 7d SR'
  },
  {
    defaultValue: 'trainer_d14_stats',
    value: 'trainer.stats.d14',
    label: 'Trainer 14d SR'
  },
  {
    defaultValue: 'trainer_d28_stats',
    value: 'trainer.stats.d28',
    label: 'Trainer 28d SR'
  },
  {
    defaultValue: 'trainer_a_stats',
    value: 'trainer.stats.a',
    label: 'Trainer SR'
  },
  {
    defaultValue: 'trainer_c_stats',
    value: 'trainer.stats.c',
    label: 'Trainer C SR'
  },
  {
    defaultValue: 'trainer_t_stats',
    value: 'trainer.stats.t',
    label: 'Trainer T SR'
  },
  {
    defaultValue: 'trainer_d_stats',
    value: 'trainer.stats.d',
    label: 'Trainer D SR'
  },
  {
    defaultValue: 'trainer_dt_stats',
    value: 'trainer.stats.dt',
    label: 'Trainer DT SR'
  },
  {
    defaultValue: 'trainer_cd_stats',
    value: 'trainer.stats.cd',
    label: 'Trainer CD SR'
  },
  {
    defaultValue: 'trainer_g_stats',
    value: 'trainer.stats.g',
    label: 'Trainer G SR'
  },
  { defaultValue: 'jockey_name', value: 'jockey', label: 'Jockey name' },
  {
    defaultValue: 'jockey_d7_stats',
    value: 'jockey.stats.d7',
    label: 'Jockey 7d SR'
  },
  {
    defaultValue: 'jockey_d14_stats',
    value: 'jockey.stats.d14',
    label: 'Jockey 14d SR'
  },
  {
    defaultValue: 'jockey_d28_stats',
    value: 'jockey.stats.d28',
    label: 'Jockey 28d SR'
  },
  {
    defaultValue: 'jockey_a_stats',
    value: 'jockey.stats.a',
    label: 'Jockey SR'
  },
  {
    defaultValue: 'jockey_c_stats',
    value: 'jockey.stats.c',
    label: 'Jockey C SR'
  },
  {
    defaultValue: 'jockey_t_stats',
    value: 'jockey.stats.t',
    label: 'Jockey T SR'
  },
  {
    defaultValue: 'jockey_d_stats',
    value: 'jockey.stats.d',
    label: 'Jockey D SR'
  },
  {
    defaultValue: 'jockey_dt_stats',
    value: 'jockey.stats.dt',
    label: 'Jockey DT SR'
  },
  {
    defaultValue: 'jockey_cd_stats',
    value: 'jockey.stats.cd',
    label: 'Jockey CD SR'
  },
  {
    defaultValue: 'jockey_g_stats',
    value: 'jockey.stats.g',
    label: 'Jockey G SR'
  },
  { defaultValue: 'sire_name', value: 'sire', label: 'Sire name' },
  { defaultValue: 'sire_a_stats', value: 'sire.stats.a', label: 'Sire SR' },
  { defaultValue: 'sire_c_stats', value: 'sire.stats.c', label: 'Sire C SR' },
  { defaultValue: 'sire_t_stats', value: 'sire.stats.t', label: 'Sire T SR' },
  { defaultValue: 'sire_d_stats', value: 'sire.stats.d', label: 'Sire D SR' },
  {
    defaultValue: 'sire_dt_stats',
    value: 'sire.stats.dt',
    label: 'Sire DT SR'
  },
  {
    defaultValue: 'sire_cd_stats',
    value: 'sire.stats.cd',
    label: 'Sire CD SR'
  },
  { defaultValue: 'sire_g_stats', value: 'sire.stats.g', label: 'Sire G SR' },
  {
    defaultValue: 'jockey_and_trainer_a_stats',
    value: 'combination_stats.jockey_and_trainer_a',
    label: 'J&T SR'
  },
  {
    defaultValue: 'jockey_and_sire_a_stats',
    value: 'combination_stats.jockey_and_sire_a',
    label: 'J&S SR'
  },
  {
    defaultValue: 'trainer_and_sire_a_stats',
    value: 'combination_stats.trainer_and_sire_a',
    label: 'T&S SR'
  },
  { defaultValue: 'combined_ae', value: 'combined_ae', label: 'C AE' }
]

const STATS_TITLES = {
  a: '',
  c: 'at this course',
  t: 'in this race type',
  d: 'at this distance',
  dt: 'at this distance in this race type',
  cd: 'over this course & distance',
  g: 'at this going'
}

function racesDetailsColumns() {
  return [
    {
      columns: [
        {
          accessor: 'distance',
          in_accessor: 'value',
          Header: 'Distance'
        },
        {
          accessor: 'race_type',
          Header: 'Race Type'
        },
        {
          accessor: 'race_class',
          Header: 'Class'
        },
        {
          accessor: 'prize_money',
          Header: 'Prize Money'
        },
        {
          accessor: 'is_handicap',
          Header: 'Handicap',
          isBool: true
        },
        {
          accessor: 'age_range',
          Header: 'Ages'
        },
        {
          accessor: 'number_of_runners',
          Header: 'Runners'
        },
        {
          accessor: 'number_of_non_runners',
          Header: "NR's"
        },
        {
          accessor: 'going',
          Header: 'Going'
        }
      ]
    }
  ]
}

function statsColumns(
  name,
  displayName,
  showName,
  showPeriods = true,
  statsMod
) {
  const displayChar = displayName.charAt(0)

  let columns = ['a', 'c', 't', 'd', 'dt', 'cd', 'g'].map((stat) => ({
    accessor: `${name}.stats.${stat}`,
    sortDescFirst: true,
    sortType: (a, b) => {
      if (
        a.original &&
        b.original &&
        a.original[`${name}`].stats[`${stat}`] &&
        b.original[`${name}`].stats[`${stat}`]
      ) {
        const aStats = a.original[`${name}`].stats[`${stat}`][statsMod.value]
        const bStats = b.original[`${name}`].stats[`${stat}`][statsMod.value]
        if (aStats && bStats && statsMod.value === 'win_pr') {
          return aStats.value > bStats.value ? 1 : -1
        } else if (aStats && bStats) {
          const aStatsPercentage = aStats.successes / aStats.runs
          const bStatsPercentage = bStats.successes / bStats.runs
          return aStatsPercentage > bStatsPercentage ? 1 : -1
        } else {
          return 1
        }
      } else if (a.original && a.original[`${name}`].stats[`${stat}`]) {
        return 1
      } else if (b.original && b.original[`${name}`].stats[`${stat}`]) {
        return -1
      }
      return 1
    },
    Header: () => (
      <HeaderTooltip
        label={
          stat === 'a'
            ? `${displayChar} ${statsMod.value === 'win_pr' ? 'PR' : 'SR'}`
            : `${displayChar} ${stat.toUpperCase()} ${
                statsMod.value === 'win_pr' ? 'PR' : 'SR'
              }`
        }
      />
    ),
    style: { padding: 0, fontWeight: 700 },
    Cell: (props) => (
      <StatsCell
        value={props.value}
        name={`${displayName} ${STATS_TITLES[stat]}`}
      />
    )
  }))

  if (showPeriods) {
    columns = [7, 14, 28]
      .map((n) => ({
        accessor: `${name}.stats.d${n}`,
        sortDescFirst: true,
        sortType: (a, b) => {
          if (
            a.original &&
            b.original &&
            a.original[`${name}`].stats[`d${n}`] &&
            b.original[`${name}`].stats[`d${n}`]
          ) {
            return a.original[`${name}`].stats[`d${n}`] >
              b.original[`${name}`].stats[`d${n}`]
              ? 1
              : -1
          } else if (a.original && a.original[`${name}`].stats[`d${n}`]) {
            return 1
          } else if (b.original && b.original[`${name}`].stats[`d${n}`]) {
            return -1
          }
          return 1
        },
        Header: () => (
          <HeaderTooltip
            label={`${displayChar} ${n}d ${
              statsMod.value === 'win_pr' ? 'PR' : 'SR'
            }`}
          />
        ),
        style: { padding: 0, fontWeight: 700 },
        Cell: (props) => (
          <StatsCell value={props.value} name={`${displayName} ${n} Day`} />
        )
      }))
      .concat(columns)
  }

  if (showName) {
    columns = [
      {
        accessor: name,
        sortType: (a, b) => {
          if (
            a.original &&
            b.original &&
            a.original[`${name}`].name &&
            b.original[`${name}`].name
          ) {
            return a.original[`${name}`].name > b.original[`${name}`].name
              ? 1
              : -1
          } else if (a.original && a.original[`${name}`].name) {
            return 1
          } else if (b.original && b.original[`${name}`].name) {
            return -1
          }
          return 1
        },
        Header: () => (
          <HeaderTooltip
            label={`${displayName} name`}
            style={{ textAlign: 'left' }}
          />
        ),
        style: { padding: '0 5px' },
        Cell: (props) => (
          <NameCell
            value={props.value}
            showBorder={false}
            originalRow={props.row.original}
          />
        )
      }
    ].concat(columns)
  }

  return columns
}

function combinedColumns(isMember, statsMod) {
  let columns = [
    {
      accessor: 'combination_stats.jockey_and_trainer_a',
      sortDescFirst: true,
      sortType: (a, b) => {
        if (
          a.original &&
          b.original &&
          a.original.combination_stats &&
          b.original.combination_stats &&
          a.original.combination_stats.jockey_and_trainer_a &&
          b.original.combination_stats.jockey_and_trainer_a
        ) {
          const aStats =
            a.original.combination_stats.jockey_and_trainer_a[statsMod.value]
          const bStats =
            b.original.combination_stats.jockey_and_trainer_a[statsMod.value]
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
          a.original.combination_stats &&
          a.original.combination_stats.jockey_and_trainer_a
        ) {
          return 1
        } else if (
          b.original &&
          b.original.combination_stats &&
          b.original.combination_stats.jockey_and_trainer_a
        ) {
          return -1
        }
        return 1
      },
      Header: `J&T ${statsMod.value === 'win_pr' ? 'PR' : 'SR'}`,
      style: { padding: 0 },
      Cell: (props) => <StatsCell value={props.value} name="Jockey & Trainer" />
    },
    {
      accessor: 'combination_stats.jockey_and_sire_a',
      sortDescFirst: true,
      sortType: (a, b) => {
        if (
          a.original &&
          b.original &&
          a.original.combination_stats &&
          b.original.combination_stats &&
          a.original.combination_stats.jockey_and_sire_a &&
          b.original.combination_stats.jockey_and_sire_a
        ) {
          const aStats =
            a.original.combination_stats.jockey_and_sire_a[statsMod.value]
          const bStats =
            b.original.combination_stats.jockey_and_sire_a[statsMod.value]
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
          a.original.combination_stats &&
          a.original.combination_stats.jockey_and_sire_a
        ) {
          return 1
        } else if (
          b.original &&
          b.original.combination_stats &&
          b.original.combination_stats.jockey_and_sire_a
        ) {
          return -1
        }
        return 1
      },
      Header: `J&S ${statsMod.value === 'win_pr' ? 'PR' : 'SR'}`,
      style: { padding: 0 },
      Cell: (props) => <StatsCell value={props.value} name="Jockey & Sire" />
    },
    {
      accessor: 'combination_stats.trainer_and_sire_a',
      sortDescFirst: true,
      sortType: (a, b) => {
        if (
          a.original &&
          b.original &&
          a.original.combination_stats &&
          b.original.combination_stats &&
          a.original.combination_stats.trainer_and_sire_a &&
          b.original.combination_stats.trainer_and_sire_a
        ) {
          const aStats =
            a.original.combination_stats.trainer_and_sire_a[statsMod.value]
          const bStats =
            b.original.combination_stats.trainer_and_sire_a[statsMod.value]
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
          a.original.combination_stats &&
          a.original.combination_stats.trainer_and_sire_a
        ) {
          return 1
        } else if (
          b.original &&
          b.original.combination_stats &&
          b.original.combination_stats.trainer_and_sire_a
        ) {
          return -1
        }
        return 1
      },
      Header: `T&S ${statsMod.value === 'win_pr' ? 'PR' : 'SR'}`,
      style: { padding: 0 },
      Cell: (props) => <StatsCell value={props.value} name="Trainer & Sire" />
    },
    {
      accessor: 'combined_ae',
      sortDescFirst: true,
      sortType: (a, b) => {
        if (
          a.original &&
          b.original &&
          a.original.combined_ae &&
          b.original.combined_ae
        ) {
          return a.original.combined_ae.value > b.original.combined_ae.value
            ? 1
            : -1
        } else if (a.original && a.original.combined_ae) {
          return 1
        } else if (b.original && b.original.combined_ae) {
          return -1
        }
        return 1
      },
      Header: 'C AE',
      style: { padding: 0 },
      Cell: (props) => (
        <RankedDecimalCell
          value={props.value}
          originalRow={props.row.original}
        />
      )
    }
  ]

  if (!isMember) {
    columns = [
      {
        accessor: 'id',
        Header: '50+ Premium Insights',
        style: { padding: '0' },
        Cell: () => <PadlockCell />
      }
    ].concat(columns)
  }
  return columns
}

function generateRStatsColumns() {
  const rStatsColumns = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((i) => ({
    accessor: `r_values.r${i}`,
    sortDescFirst: true,
    sortType: (a, b) => {
      const aValue =
        a.original &&
        a.original.r_values &&
        a.original.r_values[`r${i}`] &&
        a.original.r_values[`r${i}`].value !== undefined &&
        a.original.r_values[`r${i}`].value !== ''
          ? typeof a.original.r_values[`r${i}`].value === 'string' &&
            a.original.r_values[`r${i}`].value !== '0'
            ? -1
            : a.original.r_values[`r${i}`].value
          : -2
      const bValue =
        b.original &&
        b.original.r_values &&
        b.original.r_values[`r${i}`] &&
        b.original.r_values[`r${i}`].value !== undefined &&
        b.original.r_values[`r${i}`].value !== ''
          ? typeof b.original.r_values[`r${i}`].value === 'string' &&
            b.original.r_values[`r${i}`].value !== '0'
            ? -1
            : b.original.r_values[`r${i}`].value
          : -2
      return aValue > bValue ? 1 : -1
    },
    Header: `R${i}`,
    Cell: (rowData) => (
      <RStatsCell value={rowData.value} res={rowData} rowID={i} />
    )
  }))
  return rStatsColumns
}

function columnsRender(isFreezeHorse, isMember = false, statsMod) {
  return [
    {
      Header: () => null,
      id: 'base_actions_columns',
      columns: [
        {
          accessor: 'id',
          disableSortBy: true,
          id: 'nap_action',
          style: { padding: '0 5px', width: 60, minWidth: 60 },
          Header: () => <HeaderTooltip label="NAP" title={racesTooltips.nap} />,
          Cell: (rowData) => (
            <NapCell
              runInfo={rowData.row.values}
              originalRow={rowData.row.original}
            />
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
      hasDoublePadding: isFreezeHorse ? true : false,
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
      id: 'rtr_r_values',
      columns: generateRStatsColumns()
    },
    {
      Header: () => null,
      id: 'rtr_historic_stats',
      columns: [
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

export {
  columnsRender,
  ALL_COLUMNS,
  racesDetailsColumns,
  generateRStatsColumns,
  statsColumns,
  combinedColumns
}
