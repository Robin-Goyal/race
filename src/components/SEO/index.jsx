import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const SEO = ({ title }) => (
  <Helmet
    title={title}
    titleTemplate={`%s - RatingTheRaces`}
    link={[
      {
        rel: 'canonical',
        href: window.location.href
      }
    ]}
  />
)

SEO.defaultProps = {
  title: 'Dashboard'
}

SEO.propTypes = {
  title: PropTypes.string.isRequired
}

export default SEO
