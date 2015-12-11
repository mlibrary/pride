// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('./source/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src([
           './source/initial_setup.js',
           './source/settings.js',
           './source/constructors/*.js',
           './source/functions/*.js',
           './source/singletons/*.js'
         ])
        .pipe(concat('pride.js'))
        .pipe(gulp.dest('./'))
        .pipe(rename('pride.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['lint', 'scripts']);
