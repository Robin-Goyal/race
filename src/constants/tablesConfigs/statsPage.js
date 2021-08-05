/* eslint-disable react/prop-types */
import React from 'react'
import PlCell from '@components/StatsPage/components/PlCell'
import StatsColoredValue from '@components/StatsPage/components/StatsColoredValue'

export const getStatsTableConfig = (dynamicTitle, market, showISP) => {
  const to2dp = (props) => (props.value != null ? props.value.toFixed(2) : '-')
  const toPercentage = (props) =>
    props.value != null ? props.value.toFixed(2) + '%' : '-'
  const to2dpColoredPercentage = (props) =>
    props.value != null ? (
      <StatsColoredValue value={props.value} isPercentage={true} />
    ) : (
      '-'
    )

  const data = [
    {
      Header: () => dynamicTitle,
      id: 'title',
      columns: [
        {
          accessor: 'title',
          Header: () => '',
          Cell: (props) => (
            <span style={{ whiteSpace: 'nowrap' }}>{props.value}</span>
          )
        }
      ]
    },
    {
      Header: 'Stats',
      id: 'stats_columns',
      columns: [
        {
          accessor: 'runners',
          Header: 'Runs'
        },
        {
          accessor: 'non_runners',
          Header: 'Non-Runs'
        },
        {
          accessor: market === 'win' ? 'won' : 'place_won',
          Header: 'Won'
        },
        {
          accessor: market === 'win' ? 'sr' : 'place_sr',
          Header: 'SR',
          Cell: toPercentage
        },
        {
          accessor: market === 'win' ? 'llr' : 'llr_place',
          Header: 'LLR'
        }
      ]
    }
  ]

  if (market !== 'win') {
    data.push({
      Header: 'Place',
      id: 'place_columns',
      columns: [
        {
          accessor: 'average_price_place',
          Header: 'Avg. Price',
          Cell: to2dp
        },
        {
          accessor: 'p_and_l_place',
          Header: 'P & L',
          Cell: (props) => <PlCell value={props} type="place" />
        },
        {
          accessor: 'roi_place',
          Header: 'ROI',
          Cell: to2dpColoredPercentage
        }
      ]
    })
  } else {
    data.push({
      Header: 'XSP',
      id: 'xsp_columns',
      columns: [
        {
          accessor: 'average_price_bfsp',
          Header: 'Avg. Price',
          Cell: to2dp
        },
        {
          accessor: 'p_and_l_bfsp',
          Header: 'P & L',
          Cell: (props) => <PlCell value={props} type="bfsp" />
        },
        {
          accessor: 'roi_bfsp',
          Header: 'ROI',
          Cell: to2dpColoredPercentage
        }
      ]
    })
    if (showISP) {
      data.push({
        Header: 'ISP',
        id: 'isp_columns',
        columns: [
          {
            accessor: 'average_price_isp',
            Header: 'Avg. Price',
            Cell: to2dp
          },
          {
            accessor: 'p_and_l_isp',
            Header: 'P & L',
            Cell: (props) => <PlCell value={props} type="isp" />
          },
          {
            accessor: 'roi_isp',
            Header: 'ROI',
            Cell: to2dpColoredPercentage
          }
        ]
      })
    }
  }

  return data
}

export const getStatsCSVHeading = [
  { value: 'p_and_l', label: 'Historical P&L' },
  { value: 'run_p_and_l', label: 'Run P&L' },
  { value: 'start_time', label: 'Date' },
  { label: 'race__track__course__name_slug', value: 'Course' }
]
