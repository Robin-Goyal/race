const gulp = require('gulp')
const iconfont = require('gulp-iconfont')
const async = require('async')
const consolidate = require('gulp-consolidate')
const imagemin = require('gulp-imagemin')

const runTimestamp = Math.round(Date.now() / 1000)

/*
 * Generate icon-font
 */
gulp.task('iconfont', (done) => {
  const iconStream = gulp.src(['src/assets/icons/*.svg']).pipe(
    iconfont({
      fontName: 'icons', // required
      formats: ['ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
      prependUnicode: false,
      normalize: true,
      fontHeight: 1000,
      timestamp: runTimestamp // recommended to get consistent builds when watching files
    })
  )

  return async.parallel(
    [
      (cb) => {
        iconStream.on('glyphs', (glyphs) => {
          gulp
            .src('src/assets/templates/_icons.scss')
            .pipe(
              consolidate('lodash', {
                glyphs,
                fontName: 'icons',
                fontPath: '../fonts/',
                className: 'icon',
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'] // default, 'woff2' and 'svg' are available
              })
            )
            .pipe(gulp.dest('src/assets/styles/'))
            .on('finish', cb)
        })
      },
      (cb) => {
        iconStream.pipe(gulp.dest('src/assets/fonts/')).on('finish', cb)
      }
    ],
    done
  )
})

/*
 * Minify images
 */
gulp.task('imgmin', () =>
  gulp
    .src([
      'src/assets/img/**/*.png',
      'src/assets/img/**/*.jpg',
      'src/assets/img/**/*.gif',
      'src/assets/img/**/*.jpeg'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('src/assets/img/'))
)

gulp.task('default', gulp.series(['iconfont', 'imgmin']))
