var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    rev = require('gulp-rev'),
    revList = require('gulp-rev-list'),
    revCollector = require('gulp-rev-collector'),
    minifyHTML = require('gulp-minify-html'),
    del = require('del'),
    sequence = require('gulp-sequence'),
    fontSpider = require( 'gulp-font-spider'),
    jsToHtml = require('./src/components/gulp-i18njs-to-html'),
    through = require('through2');


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

// 压缩国际化内容
gulp.task('i18n', function() {
    return gulp.src(['src/i18n/*.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src/dist/i18n'))
        .pipe(notify({ message: 'i18n task complete' }));
});

// 一次性执行所有命令

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

// 监听启动
gulp.task('watch',function(){
    gulp.watch(['src/styles/*.css','src/styles/page/*.css'],['styles']);
    // gulp.watch(['src/i18n/cn.js'],['toHtml']);
    // gulp.watch(['src/i18n/*.js'],['i18n']);

    gulp.watch(['src/app.js','src/dist/**/*.*','!src/dist/js/rev-manifest.js','src/scripts/app/*.js','src/views/**/*.*','src/dist/i18n/*.js'],['hashScripts']);
});

gulpSequence = sequence.use(gulp);
// 'toHtml', 'i18n',
gulp.task('default', gulpSequence(['styles'], 'hashScripts'));


/*===================   发布正式操作  =========================*/

 //中文
 gulp.task('cn_publish',function(callback){
    sequence(['images_pub','styles_pub','scripts_pub','html_pub'],
        ['rev_images_html_cn','rev_images_css_cn','rev_images_js_cn'],
        'rev_appjs_cn','rev_index_cn',callback)
 });

gulp.task('toHtml', function() {
    return gulp.src('src/i18n/cn.js')
    //return gulp.src('src/i18n/dataTables.bootstrap.js')
        .pipe(jsToHtml({tempPath:'/src/i18n/template.html'}))
        .pipe(fontSpider())
        .pipe(gulp.dest('src'));
});







 