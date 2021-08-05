import React from 'react'
import PropTypes from 'prop-types'

import { apiUrls } from '@constants/api'
import Api from '@utils/api'
import Logger from '@utils/logger'
import FlatPageContent from '@components/shared/FlatPage/Page'

class FlatPage extends React.Component {
  state = {
    data: {
      title: '',
      content: ''
    },
    loading: false
  }

  async componentDidMount() {
    const { slug } = this.props
    this.setState({ loading: true })
    try {
      const data = await Api.get(apiUrls.flatpage(slug))
      this.setState({
        loading: false,
        data
      })
    } catch (err) {
      Logger.error(err)
    }
  }

  render() {
    const { data, loading } = this.state
    return (
      <FlatPageContent
        title={data.title}
        content={data.content}
        loading={loading}
      />
    )
  }
}

FlatPage.propTypes = {
  slug: PropTypes.string.isRequired
}

export default FlatPage
