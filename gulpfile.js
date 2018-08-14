var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var SOURCEPATH = {
  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html'
}

var APPPATH = {
  root : 'app/',
  css : 'app/css',
  js : 'app/js'
}

gulp.task('sass', function(){
  return gulp.src(SOURCEPATH.sassSource)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css));
});

gulp.task('copy', function() {
  gulp.src(SOURCEPATH.htmlSource)
    .pipe(gulp.dest(APPPATH.root))
});

gulp.task('serve', ['sass'], function() {
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
    server : {
      baseDir : APPPATH.root
    }
  })
});

gulp.task ('watch', ['serve', 'sass', 'copy'], function() {
  gulp.watch([SOURCEPATH.sassSource], ['sass']);
  gulp.watch([SOURCEPATH.htmlSource], ['copy']);
});

gulp.task('default', ['watch']);
