'use strict';

const del = require('del');
const gulp = require('gulp');
const csso = require('gulp-csso');
const sass = require('gulp-scss');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const rigger = require('gulp-rigger');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('del', function() {
    del('./build');
});


gulp.task('html', function() {
    console.log('1');
    gulp.src('./src/*.html')
        .pipe(rigger().on('error', function (error) {
            console.error(error.message);
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
});

gulp.task('styles', function () {
    console.log('2');
    gulp.src('./src/css/*.{sass,scss,css}')
        .pipe(sass().on('error', function (error) {
            console.error(error.message);
        }))
        .pipe(autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ]
        }))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())
});

gulp.task('scripts', function() {
    console.log('3');
    gulp.src('./src/js/*')
        .pipe(rigger().on('error', function (error) {
            console.error(error.message);
        }))
        .pipe(uglify().on('error', function (error) {
            console.error(error.message);
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
});

gulp.task('images', function () {
    console.log('4');
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
});

gulp.task('fonts', function () {
    console.log('5');
    return gulp.src('./src/fonts/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('serve', function () {
    console.log('6');
    browserSync.init({
        server: './build',
        port: 8000
    });
    gulp.watch(['./src/*.html', './src/html/*.html'], ['html']);
    gulp.watch('./src/css/*.{sass,scss,css}', ['styles']);
    gulp.watch('./src/js/*', ['scripts']);
});

gulp.task('dev', function(done) {
    gulp.series('del', 'html', 'styles', 'scripts', 'fonts');
    done();
});

gulp.task('build', function(done) {
    console.log('0');
    gulp.series('html', 'styles', 'scripts', 'fonts', 'images');
    done();
});

gulp.task('default', function(done) {
    gulp.task('build');
    gulp.series('build');
    done();
});
