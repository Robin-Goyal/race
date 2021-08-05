import React from 'react'
import { Tab, TabList, TabPanel, Tabs as RTabs } from 'react-tabs'
import PropTypes from 'prop-types'
import 'react-tabs/style/react-tabs.css'

const Tabs = ({ className, tabs }) => (
  <div>
    <RTabs className={className || ''}>
      <TabList>
        {tabs.map(tab => (
          <Tab key={`${tab.title}-title`}>{tab.title}</Tab>
        ))}
      </TabList>

      {tabs.map(tab => (
        <TabPanel key={`${tab.title}-body`}>{tab.body}</TabPanel>
      ))}
    </RTabs>
  </div>
)

Tabs.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.element.isRequired
    })
  )
}

export default Tabs
