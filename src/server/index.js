const express = require('express')
const path = require('path')

/**
 * @todo make it dynamic import
 * @todo throw error if the client is not there.
 */
const manifest = require('../../dist/manifest.json')
const app = express()

/**
 * @todo setup other head children from manifest.json
 */
const getMetas = function () {
  return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    `
}

/**
 * @todo setState of redux, make changes to client-app to handle the incoming context and render the current state
 */

// const setState = function () {
//   return `hydration state if we need it`
// }

const HTMLShell = (html, title) => `
    <!DOCTYPE html>
    <html>
        <head>
            ${getMetas()}
            <link href="${manifest['main.css']}" rel="stylesheet" />
            <title> ${title} </title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script src="${manifest['main.js']}"></script>
        </body>
    </html>`

app.use(express.static(path.join(__dirname, '..', '..', 'dist')))

/**
 * @todo reactServerDOM render to string implementation,
 * @todo webpack-server.config.js
 */

// app.get('/race/:date/:location/:time', (req, res) => {
//   const title = req.url['date']
// })

// app.get('/dashboard', (req, res) => {
//   const html = `<div>DASHBOARD</div>`
//   // const state = setState()
//   // const url = req.url
//   const title = 'dashboard'
//   res.send(HTMLShell(html, title))
// })

// app.get('/history/*', (req, res) => {
//   const html = `<div>HISTORY</div>`
//   // const state = setState()
//   // const url = req.url
//   const title = 'history'
//   res.send(HTMLShell(html, title))
// })

app.get('**', (req, res) => {
  /*let html = render(
        <Provider store={store}>
          <Router />
        </Provider>
      )*/

  /**
   * @todo req.url to set title of page
   */

  const html = `<div>SHOUDLD WE HYDRATE THIS?</div>`
  // const state = setState()
  const title = 'ROOT'
  res.send(HTMLShell(html, title))
})

app.listen(4000)
