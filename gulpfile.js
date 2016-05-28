var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];



gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(browserSync.stream())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function() {
  browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./css/app.css").on('change', browserSync.reload);
  
});


