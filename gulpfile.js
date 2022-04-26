const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));


function buildStyles() {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./build/'))
        .pipe(browsersync.stream());
}

function js() {
    const source = './src/js/*';

    return src(source)
        .pipe(changed(source))
        .pipe(dest('./build/js/'))
        .pipe(browsersync.stream());
}

// html

function html() {
    return src('./src/*.html')
        .pipe(dest('./build/'))
        .pipe(browsersync.stream());
}

// Watch files

function watchFiles() {
    watch('./src/**/*.scss', buildStyles);
    watch('./src/js/*', js);
    watch('./src/*.html', html);
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build/'
        },
        port: 3000
    });
}


exports.watch = parallel(watchFiles, browserSync);
exports.default = series(parallel(html, js, buildStyles));