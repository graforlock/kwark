var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    utils = require('./lib/utils');

var deps = {
        src : {
                core: './src/kwark-core.js',
                select: './src/kwark-dom-select.js',
                effects: './src/kwark-dom-effects.js',
                ajax: './src/kwark-async-ajax.js',
                component: './src/kwark-ui-component.js'
        },
        dest : {
                core: './dist/kwark-core.js',
                select: './dist/kwark-dom-select.js',
                effects: './dist/kwark-dom-effects.js',
                ajax: './dist/kwark-async-ajax.js',
                component: './dist/kwark-ui-component.js'
        }
};

var files = utils.fileList(deps.src),
    modules = utils.moduleObject(deps.src);


gulp.task('scripts', function() {
  return gulp.src(files)
    .pipe(gulp.dest('./dist/'));
});


gulp.task('bundle', function() {
  return gulp.src(files)
    .pipe(concat('kwark.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('module', ['bundle'], function(cb){
    fs.appendFile('./dist/kwark.min.js', modules, cb);
});

gulp.task('uglify', ['module'],function() {
    return gulp.src('./dist/*.js')
        .pipe(uglify().on('error', function(err) { throw new Error(err)}))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['bundle', 'module', 'uglify']);