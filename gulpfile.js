// Include gulp
const gulp = require('gulp');
const babel = require('gulp-babel');

// Include Our Plugins
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pegjs  = require('gulp-pegjs');
const clean  = require('gulp-clean');

gulp.task('clean', function() {
  return gulp.src([
    './source/singletons/parser.js',
    './pride.js',
    './pride.min.js',
  ]).pipe(clean());
});

// Lint Task
gulp.task('lint', ['clean'], function() {
  return gulp.src('./source/**/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('parser1', function() {
  return gulp.src('./source/parser/parser.pegjs')
    .pipe(pegjs({format: 'bare'}))
    .pipe(gulp.dest('./source/parser'));
});

gulp.task('parser2', ['parser1'], function() {
  return gulp.src([
    './source/parser/early.js',
    './source/parser/parser.js'
  ])
    .pipe(concat('parser.js'))
    .pipe(gulp.dest('./source/singletons'));
});

gulp.task('scripts', ['parser2'], function() {
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
