var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var size = require('gulp-size');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var image = require('gulp-image');
var del = require('del');
var preprocess = require('gulp-preprocess');
var debug = require('gulp-debug');

gulp.task('watch_javascript', function() {
    var bundler = browserify({
        entries: ['./src/js/parle.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('parle.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./static/js/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('parle.js'))
    .pipe(gulp.dest('./static/js/'));
});

gulp.task('sass_me', function () {
    gulp.src('src/scss/style.scss')
        .pipe(gulp.dest('static/css'))
        .pipe(sass({
            includePaths: ['src/scss']
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
        .pipe(preprocess({context: {DEV: true}}))
        .pipe(gulp.dest('templates'))
        .pipe(size());
});

gulp.task('watch_index', function() {
  gulp.watch('src/index.html', ['index']);
});

gulp.task('dev', ['javascript', 'styles', 'svg', 'index']);
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
            includePaths: ['src/scss']
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
        .pipe(preprocess({context: {DEV: false}}))
        .pipe(gulp.dest('templates'))
        .pipe(size());
});

gulp.task('deploy', ['deploy_javascript', 'deploy_styles', 'deploy_svg', 'deploy_index']);