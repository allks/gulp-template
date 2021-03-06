var gulp = require('gulp'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

function pug_html(done) {
    gulp.src('./pug/**/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
    done()
}

function css_style(done) {
    gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            // outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream())
    done()
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    })
}

function browserReload(done) {
    browserSync.reload()
}

function watchFile() {
    gulp.watch('./pug/**/*.pug', pug_html);
    gulp.watch('./scss/**/*.scss', css_style);
    gulp.watch('./**/*.html', browserReload);
    gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(sync, watchFile))