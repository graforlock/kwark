var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var orderedDeps = [ 
        './kwark-core.js',
        './kwark-dom-select.js',
        './kwark-dom-effects.js',
        './kwark-async-ajax.js',
        './kwark-ui-component.js',
     ];

gulp.task('scripts', function() {
  return gulp.src(orderedDeps)
    .pipe(concat('kwark.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

