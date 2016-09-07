var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', function() {
    pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('dist')
    ]);
})
