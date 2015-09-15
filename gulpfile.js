var gulp = require('gulp');
var browserify = require('gulp-browserify');
var size = require('gulp-size');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var image = require('gulp-image');
var useref = require('gulp-useref');

gulp.task('dev_javascript', function () {
    gulp.src('src/js/parle.js')
        .pipe(gulp.dest('static/js'))
        .pipe(size());
});

gulp.task('dev_styles', function () {
    gulp.src('src/scss/style.scss')
        .pipe(gulp.dest('static/css'))
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(gulp.dest('static/css'))
        .pipe(size());
});

gulp.task('dev_style_map', function () {
    gulp.src('src/scss/style.css.map')
        .pipe(gulp.dest('static/css'))
});

gulp.task('dev_svg', function () {
    gulp.src('src/images/*.svg')
        .pipe(gulp.dest('static/images'))
        .pipe(size());
});

gulp.task('dev_index', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('templates'))
        .pipe(size());
});

gulp.task('dev', ['dev_javascript', 'dev_styles', 'dev_svg', 'dev_index', 'dev_style_map']);

gulp.task('javascript', function () {
    gulp.src('src/js/parle.js')
        .pipe(browserify({transform: ['reactify']}))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'))
        .pipe(size());
});

gulp.task('styles', function () {
    gulp.src('src/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(gulp.dest('static/css'))
        .pipe(size());
});

gulp.task('svg', function () {
    gulp.src('src/images/*.svg')
        .pipe(image())
        .pipe(gulp.dest('static/images'))
        .pipe(size());
});

gulp.task('index', function () {
    gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('templates'))
        .pipe(size());
});

gulp.task('deployment', ['clean', 'javascript', 'styles', 'svg', 'index']);