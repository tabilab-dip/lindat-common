'use strict';

var gulp = require('gulp');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['preprocess'], function () {
    gulp.watch([
      options.src + '/*.{css,less}',
      options.src + '/**/*.{css,less}'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('preprocess');
      }
    });

    gulp.watch([
      options.src + '/**/*.js',
      options.src + '/refbox/refbox.html'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('scripts');
      } else {
        gulp.start('preprocess');
      }
    });

    gulp.watch([
      options.src + '/**/*.{html,yml,json}',
      'bower.json',
      '!' + options.src + '/refbox/refbox.html'
    ], ['preprocess']);
  });
};