const gulp = require("gulp");
// browsersync
const browserSync = require("browser-sync").create();
// js
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
// css
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
// imgs
const imagemin = require("gulp-imagemin");

function browsersync() {
  browserSync.init({
    server: { baseDir: "src/" }
  });
}

function scripts() {
    // gulp.pipe
    return gulp
      .src(["node_modules/jquery/dist/jquery.min.js", "src/js/script.js"])
      .pipe(concat("script.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("src/js"))
      .pipe(browserSync.stream());
  }
  
  function styles() {
    return gulp
      .src("src/scss/*.scss")
      .pipe(sass())
      .pipe(concat("styles.min.css"))
      .pipe(autoprefixer({ grid: true }))
      .pipe(cleancss())
      .pipe(gulp.dest("src/css/"))
      .pipe(browserSync.stream());
  }
  
  function images() {
    return gulp.src("src/source_images/*").pipe(imagemin()).pipe(gulp.dest("src/images"));
  }
  
  function startwatch() {
    gulp.watch(["src/**/*.js", "!src/**/*.min.js"], scripts);
    gulp.watch("src/scss/*.scss", styles);
    gulp.watch("src/index.html").on("change", browserSync.reload);
    gulp.watch("src/images/**/*", images);
  }
  
  function build() {
    return gulp
      .src(
        [
          "src/js/*.min.js",
          "src/css/*.min.css",
          "src/images/**.*", // img/icon1.png \ img/icon2.jpg \ img/icons/logo.svg
          "src/index.html"
        ],
        {
          base: "src"
        }
      )
      .pipe(gulp.dest("dist"));
  }

exports.browsersync = browsersync;

exports.scripts = scripts;

exports.styles = styles;

exports.images = images;

exports.default = gulp.parallel(
  scripts,
  styles,
  images,
  browsersync,
  startwatch
);

exports.build = gulp.series(scripts, styles, images, build);