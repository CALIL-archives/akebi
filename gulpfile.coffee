gulp = require('gulp')
sourcemaps = require('gulp-sourcemaps')
concat = require('gulp-concat')
coffee = require('gulp-coffee')
browserify = require('browserify')
babelify = require('babelify')
source = require('vinyl-source-stream')
sass = require('gulp-sass')
browserSync = require('browser-sync')

plumber = require('gulp-plumber')
notify = require('gulp-notify')

gulp.task 'js_concat', ['browserify'], ->
  gulp.src([
    'src/console.log.js'
    'compiled/akebi.js'
  ])
  .pipe(concat('akebi.js'))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream())


gulp.task 'browserify', ->
  browserify('src/akebi.jsx', debug: false)
  .transform(babelify, {presets: ['es2015', 'react']})
  .bundle()
  .on('error', (err) ->
    console.log 'Error : ' + err.message
    this.emit("end")
  )
  .pipe(source('akebi.js'))
  .pipe gulp.dest('compiled')

gulp.task 'sass', [], ->
  postcss = require('gulp-postcss');
  gulp.src('src/*.sass')
  .pipe(plumber({
    errorHandler: (error)->
      browserSync.notify(error.message, 1000000);
      this.emit('end');
  }))
  .pipe(sass())
  .pipe(postcss([
    require('autoprefixer'),
  ]))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream())


gulp.task 'browserSync-reload', ['js_concat'], ->
  browserSync.reload()

gulp.task 'browserSync', ->
  browserSync.init
    notify: true
    open: true
    port: 3000
    server:
      baseDir: './'
      index  : 'index.html'

gulp.task 'default', ['browserSync'], ->
  gulp.watch [ './index.html' ], ['browserSync-reload']
  gulp.watch [ './**/*.{sass,scss}' ], ['sass']
  gulp.watch [ './src/*.jsx', './src/view/*.jsx'], ['browserSync-reload']
