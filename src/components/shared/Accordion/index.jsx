import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useAccordianStyles = makeStyles((theme) => ({
  typography: {
    color: theme.palette.common.text,
    fontSize: 15,
    lineHeight: '24px',
    fontWeight: 900,
    letterSpacing: 0.27,
    margin: 0,
    paddingBottom: 10
  }
}))

const CustomAccordion = withStyles({
  root: {
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MUIAccordion)

const CustomAccordionSummary = withStyles({
  root: {
    backgroundColor: '#ffffff',
    padding: 0,
    minHeight: 'inherit',
    marginBottom: 15,
    borderBottom: '1px solid #e8e9ec',
    '&$expanded': {
      minHeight: 'inherit'
    }
  },
  content: {
    margin: 0,
    paddingBottom: 0,
    '&$expanded': {
      margin: 0,
      paddingBottom: 0
    }
  },
  expanded: {}
})(AccordionSummary)

const CustomAccordionDetails = withStyles(() => ({
  root: {
    padding: 0
  }
}))(AccordionDetails)

const Accordion = ({
  title,
  className,
  defaultExpanded = true,
  children,
  showIcon
}) => {
  const classes = useAccordianStyles()
  return (
    <CustomAccordion
      className={className}
      square
      defaultExpanded={defaultExpanded}
    >
      <CustomAccordionSummary expandIcon={showIcon ? <ExpandMoreIcon /> : null}>
        <Typography className={classes.typography}>{title}</Typography>
      </CustomAccordionSummary>
      <CustomAccordionDetails>{children}</CustomAccordionDetails>
    </CustomAccordion>
  )
}

Accordion.propTypes = {
  className: PropTypes.string,
  defaultExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  showIcon: PropTypes.bool
}

export default Accordion
