import React from 'react'
import PropTypes from 'prop-types'

import WithLoading from '@components/shared/WithLoading'

const FlatPageContent = ({ title, content }) => (
  <section className="flat-page">
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h1>{title}</h1>
          <div
            className="flat-page__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  </section>
)

FlatPageContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default WithLoading(FlatPageContent)
