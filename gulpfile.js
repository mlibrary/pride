// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pegjs  = require('gulp-pegjs');

var exec = require('child_process').exec;

// PegJS Task
gulp.task('pegjs', function() {
  gulp.src('./source/parser/parser.pegjs')
    .pipe(pegjs({format: "bare", exportVar: "Pride.Parser"}))
    .pipe(gulp.dest('./source/parser'))
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src('./source/**/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  gulp.src('./source/parser/parser.pegjs')
    .pipe(pegjs({format: "bare", exportVar: "Pride.Parser"}))
    .pipe(gulp.dest('./source/parser'))
  return gulp.src([
           './source/initial_setup.js',
           './source/settings.js',
           './source/constructors/**/*.js',
           './source/functions/**/*.js',
           './source/singletons/**/*.js',
           './source/parser/**/*.js',
         ])
        .pipe(concat('pride.js'))
        .pipe(gulp.dest('./'))
        .pipe(rename('pride.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['lint', 'pegjs', 'scripts']);

gulp.task('watch', function() {
  gulp.watch('./source/**/*.js', ['default']);
});

// https://stackoverflow.com/questions/29511491/running-a-shell-command-from-gulp
gulp.task('run-tests', function(cb) {
  gulp.src('./source/parser/parser.pegjs')
    .pipe(pegjs({format: "bare", exportVar: "Pride.Parser"}))
    .pipe(gulp.dest('./source/parser'))

  exec('node test2.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch-parser', function() {
  gulp.watch('./source/**/*.pegjs', ['run-tests']);
});
