var gulp = require('gulp');
var merge = require('event-stream').merge;
var dotenv = require('dotenv').config();

// browser-sync
var browser = require('browser-sync');
gulp.task('server', function(){
  browser({ server: { baseDir: 'dist/' } });
});

// gulp-jade
var gulpJade = require('gulp-jade');
gulp.task('jade', function(){
  return gulp.src(['src/jade/**/*.jade', '!src/jade/base/**/*.jade'])
    .pipe(gulpJade({ pretty: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(browser.reload({ stream: true }));
});

// gulp-minify-css
var gulpMinifyCss = require('gulp-minify-css');
gulp.task('minify-css', function(){
  return gulp.src(['src/css/**/*.css'])
    .pipe(gulpMinifyCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browser.reload({ stream: true }))
});

// upload to S3
var s3 = require('gulp-s3-upload')({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
gulp.task('upload', function () {
  return gulp.src('./dist/**')
    .pipe(s3({
       Bucket:  process.env.AWS_S3_BUCKET,
       ACL: 'public-read'
     }));
});

// default
gulp.task('default', ['server'], function(){
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('src/css/**/*.css', ['minify-css']);
});

// build
gulp.task('build', ['jade', 'minify-css'], function(){
  return merge(
    // copy other files
  );
});
