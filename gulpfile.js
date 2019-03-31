/**
 * @file: gulp配置文件
 *
 * @Author: JoneLin
 * @Date:   2015-11-10 21:35:26
 * @Last Modified by:   JoneGo
 * @Last Modified time: 2016-03-10 18:24:15
 */

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

var source = {
  script: ['src/**/*.js'],
  html: 'index.html'
};

// 开启服务器
gulp.task('serve', function() {
  
  connect.server({
    livereload: true
  });
  gulp.watch(source.script, function() {
    gulp.src(source.script)
      .pipe(connect.reload());
  });
  gulp.watch(source.html, function() {
    gulp.src(source.html)
      .pipe(connect.reload());
  });
});

// 合并压缩js文件
gulp.task('build', ['clean:build'], function() {
  gulp.src(['src/prototype/Role.js',
            'src/prototype/Enemy.js',
            'src/prototype/Boss.js',
            'src/prototype/Tool.js',
            'src/prototype/Effect.js',
            'src/main/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/src'));
});

// 清理文件
gulp.task('clean:build', function() {
  del.sync('build/src', {
    force: true
  });
});

gulp.task('default', ['serve'], function() {
 
});

