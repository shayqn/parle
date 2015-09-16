var gulp = require('gulp');
var browserify = require('gulp-browserify');
var size = require('gulp-size');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var image = require('gulp-image');
var useref = require('gulp-useref');
var del = require('del');

gulp.task('javascript', function () {
    gulp.src('src/js/parle.js')
        .pipe(gulp.dest('static/js'))
        .pipe(size());
});

gulp.task('watch_javascript', function() {
  gulp.watch('src/js/parle.js', ['javascript']);
});

gulp.task('sass_me', function () {
    gulp.src('src/scss/style.scss')
        .pipe(gulp.dest('static/css'))
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(gulp.dest('static/css'))
        .pipe(size());
});

gulp.task('styles', ['sass_me'], function () {
    gulp.src('src/scss/style.css.map')
        .pipe(gulp.dest('static/css'));
});

gulp.task('watch_styles', function() {
  gulp.watch('src/scss/style.scss', ['styles']);
});

gulp.task('svg', function () {
    gulp.src('src/images/*.svg')
        .pipe(gulp.dest('static/images'))
        .pipe(size());
});

gulp.task('watch_svg', function() {
  gulp.watch('src/images/*.svg', ['svg']);
});

gulp.task('index', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('templates'))
        .pipe(size());
});

gulp.task('watch_index', function() {
  gulp.watch('src/index.html', ['index']);
});

gulp.task('dev', ['javascript', 'styles', 'svg', 'index', 'style_map']);
gulp.task('watch_dev', ['watch_javascript', 'watch_styles', 'watch_svg', 'watch_index']);

gulp.task('deploy_javascript', function () {
    gulp.src('src/js/parle.js')
        .pipe(browserify({transform: ['reactify']}))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'))
        .pipe(size());
});

gulp.task('deploy_clean_styles', function() {
    return del(['static/css/**/*']);
});

gulp.task('deploy_styles', ['deploy_clean_styles'], function () {
    gulp.src('src/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(gulp.dest('static/css'))
        .pipe(size());
});

gulp.task('deploy_svg', function () {
    gulp.src('src/images/*.svg')
        .pipe(image())
        .pipe(gulp.dest('static/images'))
        .pipe(size());
});

gulp.task('deploy_index', function () {
    gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('templates'))
        .pipe(size());
});

gulp.task('deployment', ['deploy_javascript', 'deploy_styles', 'deploy_svg', 'deploy_index']);