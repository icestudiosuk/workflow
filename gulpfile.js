var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

var SOURCEPATH = {
  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html',
  jsSource : 'src/js/*.js'
}

var APPPATH = {
  root : 'app/',
  css : 'app/css',
  js : 'app/js'
}

gulp.task('clean-html', function() {
  return gulp.src(APPPATH.root + '/*.html', {read: false, force: true })
    .pipe(clean());
});

gulp.task('clean-scripts', function() {
  return gulp.src(APPPATH.js + '/*.js', {read: false, force: true })
    .pipe(clean());
});

gulp.task('sass', function(){
  return gulp.src(SOURCEPATH.sassSource)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css));
});

gulp.task('scripts', ['clean-scripts'], function() {
  gulp.src(SOURCEPATH.jsSource)
    .pipe(gulp.dest(APPPATH.js))
});

gulp.task('copy', ['clean-html'], function() {
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

gulp.task ('watch', ['serve', 'sass', 'copy', 'clean-html', 'scripts', 'clean-scripts'], function() {
  gulp.watch([SOURCEPATH.sassSource], ['sass']);
  gulp.watch([SOURCEPATH.htmlSource], ['copy']);
  gulp.watch([SOURCEPATH.jsSource], ['scripts']);
});

gulp.task('default', ['watch']);
