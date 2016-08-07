var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var orderedDeps = [ 
        './src/kwark-core.js',
        './src/kwark-dom-select.js',
        './src/kwark-dom-effects.js',
        './src/kwark-async-ajax.js',
        './src/kwark-ui-component.js',
     ];

gulp.task('scripts', function() {
  return gulp.src(orderedDeps)
    .pipe(concat('kwark.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

