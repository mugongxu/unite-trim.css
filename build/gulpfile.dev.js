var gulp       = require('gulp');
var path       = require('path');
var sass       = require('gulp-sass');
var cleanCSS   = require('gulp-clean-css');
var rename     = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sequence   = require('run-sequence');

var distPath   = path.resolve(__dirname, '../dist');

gulp.task('run', () => {
    gulp.src(path.resolve('../src/unite-trim.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ format: 'beautify' }))
    .pipe(gulp.dest(distPath))
    .pipe(rename('unite-trim.min.css'))
    .pipe(cleanCSS({
        format: {
            breaks: {
                afterComment: true
            }
        }
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(distPath))
});

gulp.task('watch', () => {
    gulp.watch(path.resolve('../src/*.scss'), () => {
        sequence('run');
    })
});

gulp.task('default', () => {
    sequence('run', 'watch');
});
