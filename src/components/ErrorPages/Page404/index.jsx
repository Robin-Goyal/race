import React from 'react'
import Typography from '@material-ui/core/Typography'
import SEO from '@components/SEO'

const Page404 = () => (
  <div className="row">
    <SEO title="404" />
    <div className="col-xs-12">
      <section className="page-404">
        <Typography variant="h2" component="h2">
          404 Error
        </Typography>
        <Typography variant="h4" component="h2">
          Page not found
        </Typography>
      </section>
    </div>
  </div>
)

export default Page404
