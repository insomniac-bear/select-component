const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sourcemaps = require(`gulp-sourcemaps`);
const rename = require(`gulp-rename`);
const postcss = require(`gulp-postcss`);
const sass = require(`gulp-sass`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const csso = require(`gulp-csso`);
const del = require(`del`);

sass.compiler = require(`node-sass`);

gulp.task(`css`, () => {
  return gulp.src(`src/scss/style.scss`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso())
    .pipe(rename(`style.min.css`))
    .pipe(sourcemaps.write(`.`))
    .pipe(gulp.dest(`dist/css`));
});

gulp.task(`html`, () => {
  return gulp.src(`src/*.html`)
    .pipe(gulp.dest(`dist`));
});

gulp.task(`refresh`, (done) => {
  server.reload();
  done();
});

gulp.task(`server`, () => {
  server.init({
    server: `dist/`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch(`src/scss/**/*.scss`, gulp.series(`css`, `refresh`))
  gulp.watch(`src/*.html`, gulp.series(`html`, `refresh`));
});

gulp.task(`copy`, () => {
  return gulp.src([
    `src/fonts/**/*.{woff,woff2}`,
    `src/img/**`,
    `src/js/**`,
    `src/*.ico`,
  ], {
    base: `src`,
  })
    .pipe(gulp.dest(`dist`));
});

gulp.task(`clean`, () => {
  return del(`dist`);
});

gulp.task(`build`, gulp.series(`clean`, `copy`, `html`, `css`));
gulp.task(`start`, gulp.series(`build`, `server`));
