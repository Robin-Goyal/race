import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import { KeyboardArrowDown, GetApp } from '@material-ui/icons/'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Menu, MenuItem, Typography, Button, useTheme } from '@material-ui/core'

const useSheduleStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2)
  },
  graphHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  arrowIcon: {
    marginLeft: 10,
    width: 18,
    height: 18
  },
  downloadButton: {
    textTransform: 'capitalize',
    borderRadius: 20
  },
  h2: {
    fontSize: 16,
    fontWeight: 700
  }
}))

const StatsChart = ({ chartData }) => {
  const classes = useSheduleStyles()
  const chartRef = React.useRef(null)
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const customTooltips = function (tooltip) {
    const chart = chartRef.current
    if (!chart) {
      return
    }
    const data =
      chart.props.data && tooltip.dataPoints && tooltip.dataPoints.length > 0
        ? chart.props.data.datasets[tooltip.dataPoints[0].datasetIndex]
            .completeData[tooltip.dataPoints[0].index]
        : null

    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip')

    if (!tooltipEl) {
      tooltipEl = document.createElement('div')
      tooltipEl.id = 'chartjs-tooltip'
      let style = 'background-color: #fff'
      style += '; padding: 10px'
      style +=
        '; box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
      tooltipEl.innerHTML = '<table style="' + style + '"></table>'
      chart.chartInstance.canvas.parentNode.appendChild(tooltipEl)
    }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0
      return
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform')
    if (tooltip.yAlign) {
      tooltipEl.classList.add(tooltip.yAlign)
    } else {
      tooltipEl.classList.add('no-transform')
    }

    // Set Text
    if (data && data.length > 0) {
      let labelStyle = 'width: 80px'
      labelStyle += '; font-weight: 700'
      labelStyle += '; text-align: left'
      labelStyle += '; white-space: nowrap'

      let valueStyle = 'text-align: right'
      valueStyle += '; white-space: nowrap'

      let innerHtml = '<tbody>'

      innerHtml +=
        '<tr><td style="' +
        labelStyle +
        '">Run P&L</td><td style="' +
        valueStyle +
        '">' +
        data[0] +
        '</td></tr>'
      innerHtml +=
        '<tr><td style="' +
        labelStyle +
        '">P&L</td><td style="' +
        valueStyle +
        '">' +
        data[1] +
        '</td></tr>'
      innerHtml +=
        '<tr><td style="' +
        labelStyle +
        '">Date</td><td style="' +
        valueStyle +
        '">' +
        data[2] +
        '</td></tr>'

      if (data[3]) {
        innerHtml +=
          '<tr><td style="' +
          labelStyle +
          '">Course</td><td style="' +
          valueStyle +
          '">' +
          data[3] +
          '</td></tr>'
      }

      if (data[4]) {
        innerHtml +=
          '<tr><td style="' +
          labelStyle +
          '">Distance</td><td style="' +
          valueStyle +
          '">' +
          data[4] +
          ' furlongs</td></tr>'
      }

      if (data[5]) {
        innerHtml +=
          '<tr><td style="' +
          labelStyle +
          '">Horse</td><td style="' +
          valueStyle +
          '">' +
          data[5] +
          '</td></tr>'
      }

      if (data[6]) {
        innerHtml +=
          '<tr><td style="' +
          labelStyle +
          '">Jockey</td><td style="' +
          valueStyle +
          '">' +
          data[6] +
          '</td></tr>'
      }

      if (data[7]) {
        innerHtml +=
          '<tr><td style="' +
          labelStyle +
          '">Trainer</td><td style="' +
          valueStyle +
          '">' +
          data[7] +
          '</td></tr>'
      }

      if (data[8]) {
        innerHtml +=
          '<tr><td colspan="2" style="font-style: italic;font-size: 11px!important;text-align: center;padding-top: 5px;">Click the point to open the race</td></tr>'
      }

      innerHtml += '</tbody>'

      let tableRoot = tooltipEl.querySelector('table')
      tableRoot.innerHTML = innerHtml
    }

    const positionY = chart.chartInstance.canvas.offsetTop
    const positionX = chart.chartInstance.canvas.offsetLeft

    tooltipEl.style.opacity = 1
    tooltipEl.style.position = 'absolute'
    if (chart.chartInstance.width) {
      if (tooltip.caretX > chart.chartInstance.width / 2) {
        tooltipEl.style.right =
          positionX + (chart.chartInstance.width - tooltip.caretX) + 'px'
        tooltipEl.style.left = 'auto'
      } else {
        tooltipEl.style.left = positionX + tooltip.caretX + 'px'
      }
    } else {
      tooltipEl.style.left = positionX + tooltip.caretX + 'px'
    }
    tooltipEl.style.top = positionY + tooltip.caretY + 'px'
    tooltipEl.style.fontFamily = tooltip._bodyFontFamily
    tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px'
    tooltipEl.style.fontStyle = tooltip._bodyFontStyle
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px'
    tooltipEl.style.pointerEvents = 'none'
  }

  const chartSettings = {
    data: {
      labels: chartData.series,
      datasets: [
        {
          data: chartData.series
            ? chartData.series.map((series) => series[1])
            : [],
          completeData: chartData.series,
          label: 'Historical P&L',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#fff',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth:
            chartData.series && chartData.series.length < 50 ? 5 : 1,
          pointHoverRadius:
            chartData.series && chartData.series.length < 50 ? 7 : 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10
        }
      ]
    },
    options: {
      onClick: function (element, dataAtClick) {
        if (dataAtClick && dataAtClick.length > 0) {
          const clickedDatasetIndex = dataAtClick[0]._datasetIndex
          const clickedElementindex = dataAtClick[0]._index
          const currentDataPoint =
            dataAtClick[0]._chart.config.data.datasets[clickedDatasetIndex]
              .completeData[clickedElementindex]
          if (
            currentDataPoint &&
            currentDataPoint.length > 0 &&
            currentDataPoint[8]
          ) {
            const win = window.open(
              `${window.location.origin}${currentDataPoint[8].replace(
                '/api',
                ''
              )}`,
              '_blank'
            )
            win.focus()
          }
        }
      },
      onHover: (event, chartElement) => {
        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
      },
      layout: {
        padding: {
          top: 10,
          right: 10
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Points'
            }
          }
        ]
      },
      tooltips: {
        enabled: false,
        mode: 'index',
        custom: customTooltips
      },
      legend: {
        position: 'bottom'
      }
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDownloadJPEG = () => {
    handleClose()
    if (chartRef && chartRef.current) {
      const base64Image = chartRef.current.chartInstance.toBase64Image()
      const element = document.createElement('a')
      element.setAttribute('href', base64Image)
      element.setAttribute('download', 'chart.png')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  const handleDownloadCSV = () => {
    handleClose()
    if (chartRef && chartRef.current) {
      const chartDataArr = chartData.series
        .filter((i) => i[1])
        .map((series, i) => ({
          Event: i + 1,
          'Historical P&L': series[1],
          'Run P&L': series[0],
          Date: series[2] ? series[2].replace(',', '') : '',
          Course: series[3] || ''
        }))
      let data, filename, link
      let csv = convertChartDataToCSV({
        data: chartDataArr
      })

      if (csv == null) return

      filename = 'chart.csv'

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv
      }

      data = encodeURI(csv)
      link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', filename)
      document.body.appendChild(link) // Required for FF
      link.click()
      document.body.removeChild(link)
    }
  }

  const convertChartDataToCSV = (args) => {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data

    data = args.data || null
    if (data == null || !data.length) {
      return null
    }

    columnDelimiter = args.columnDelimiter || ','
    lineDelimiter = args.lineDelimiter || '\n'
    keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    data.forEach(function (item) {
      ctr = 0
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter
        result += item[key]
        ctr++
      })
      result += lineDelimiter
    })
    return result
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.graphHeading}>
        <Typography variant="h2" component="h2" classes={{ h2: classes.h2 }}>
          Historical P&L
        </Typography>
        <div className="download-stats-chart">
          <Button
            variant="outlined"
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            className={classes.downloadButton}
            startIcon={
              <GetApp style={{ color: theme.palette.primary.light }} />
            }
            endIcon={<KeyboardArrowDown className={classes.arrowIcon} />}
            onClick={handleClick}
          >
            Download
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDownloadCSV}>Download CSV</MenuItem>
            <MenuItem onClick={handleDownloadJPEG}>Download Image</MenuItem>
          </Menu>
        </div>
      </div>
      <div
        className="stats-graph-canvas-wrapper"
        style={{ position: 'relative' }}
      >
        <Line
          data={chartSettings.data}
          className="stats-graph-canvas"
          options={chartSettings.options}
          ref={chartRef}
        />
      </div>
    </Paper>
  )
}

StatsChart.propTypes = {
  chartData: PropTypes.shape({
    series: PropTypes.array
  })
}
export default StatsChart
