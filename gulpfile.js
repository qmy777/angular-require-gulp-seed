var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    revList = require('gulp-rev-list'),
    sequence = require('gulp-sequence');


/*===================   中文页面    ==========================*/

// 清空dist中的所有文件
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/img'], cb)
});

// 合并所有页面公用部分样式
gulp.task('styles',function(){
    return gulp.src(['src/styles/base.css','src/styles/common.css','src/styles/page/*.css'],{base:'src'})
        .pipe(autoprefixer({browsers:['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],remove:false}))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('src/dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('src/dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// 合并所有页面controller代码
gulp.task('scripts', function() {
    return gulp.src(['src/scripts/controller/*.js'])
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('src/dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src/dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// 去缓存功能
gulp.task('hashScripts', function () {
    console.log('hashScripts');
    return gulp.src(['src/app.js','src/dist/**/*.*','src/scripts/app/*.js','src/views/**/*.*','src/dist/i18n/*.js'],{base:'src'})
        .pipe(revList())
        .pipe(revList.manifest())
        .pipe(gulp.dest('src/dist/js'))
        .pipe(notify({ message: 'Hash task complete' }));
});

// 压缩i18n文件

gulp.task('default', ['hashScripts']);

// 监听启动
gulp.task('watch',function(){
    gulp.watch(['src/**/*.*','!src/dist/js/rev-manifest.js'], ['hashScripts']);
});

// gulpSequence = sequence.use(gulp);
// 'toHtml', 'i18n',
// gulp.task('default', gulpSequence(['styles'], 'i18n', 'hashScripts'));






 