var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var SOURCEPATH = {
  sassSource : 'src/scss/*.scss'
}

var APPPATH = {
  root : 'app/',
  css : 'app/css',
  js : 'app/js'
}

gulp.task('sass', function(){
  return gulp.src(SOURCEPATH.sassSource)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css))
});

gulp.task('serve', ['sass'], function() {
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
    server : {
      baseDir : APPPATH.root
    }
  })
});

gulp.task ('watch', ['serve', 'sass'], function() {
  gulp.watch([SOURCEPATH.sassSource], ['sass']);
});

gulp.task('default', ['watch']);
