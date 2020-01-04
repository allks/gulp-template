var gulp = require('gulp');
var rename = require('gulp-rename');

function copy(done) {
    gulp.src('./scss/style.scss')
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./css/'))
    done()
}

gulp.task(copy)