'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    prefixer = require('autoprefixer'),
    server = require('browser-sync').create(),
    minify = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    run = require('run-sequence');

sass.compiler = require('node-sass');

gulp.task('test_style', function() {
  gulp.src('src/style/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      prefixer()
    ]))
    .pipe(gulp.dest('src/style'))
    .pipe(server.stream());
});

gulp.task('run_dev', ['style'], function() {
  server.init({
    server: 'src/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/style/**/*.{scss,sass}', ['test_style']).on('change', server.reload);
  gulp.watch('src/*.html').on('change', server.reload);
});

var path = {
    build: { //Пути куда складывать готовые после сборки файлы
        html: 'docs/',
        js: 'docs/js/',
        css: 'docs/style/',
        img: 'docs/image/',
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/style/*.scss',
        img: 'src/image/**/*.{png,jpg,svg}',
    },
    clean: './build'
};

var config = {
    server: 'src/',
    notify: false,
    open: true,
    cors: true,
    ui: false
};

var config_build = {
  server: {
    baseDir: 'src/'
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: 'Frontend_Devil'
};

gulp.task('style', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            prefixer()
        ]))
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
});

gulp.task('js', function (cb) {
    pump([
        gulp.src(path.src.js),
        uglify()
    ],
        cb
    )
        .pipe(rename(function (path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest(path.build.js))
});


gulp.task('image', function () {
    gulp.src(path.src.img)
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.jpegtran({ progressive: true }),
            // imagemin.svgo()
        ]))
        .pipe(gulp.dest(path.build.img))
});

var del = require('del');
gulp.task('clean', function () {
    return del('build');
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/**",
  ], {
    base: "src"
  })
    .pipe(gulp.dest("docs"));
});

gulp.task('build', ['html', 'js', 'style', 'image', 'copy']);

gulp.task('server', ['style'], function () {
    server.init(config);
    gulp.watch(path.src.style, ['style']);
    gulp.watch(path.src.html, ['html']).on('change', server.reload);
});