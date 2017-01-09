// Include gulp
const gulp = require('gulp');
const babel = require('gulp-babel');

// Include Our Plugins
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('./source/**/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src([
           './source/initial_setup.js',
           './source/settings.js',
           './source/constructors/**/*.js',
           './source/functions/**/*.js',
           './source/singletons/**/*.js'
         ])
         .pipe(babel({
           presets: ['es2015']
         }))
        .pipe(concat('pride.js'))
        .pipe(gulp.dest('./'))
        .pipe(rename('pride.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['lint', 'scripts']);

gulp.task('watch', function() {
  gulp.watch('./source/**/*.js', ['default']);
});
