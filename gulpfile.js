var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    fs = require('fs');

var deps = {
        src : {
                core: './src/kwark-core.js',
                select: './src/kwark-dom-select.js',
                effects: './src/kwark-dom-effects.js',
                ajax: './src/kwark-async-ajax.js',
                component: './src/kwark-ui-component.js',
                state : './src/kwark-ui-state.js'
        }
};


gulp.task('bundle', function() {
  return gulp.src('./src/*.js')
    .pipe(uglify().on('error', function(err) { console.log(err)}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['bundle']);