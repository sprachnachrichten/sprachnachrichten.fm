const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require('gulp-cssnano');
const responsive = require('gulp-responsive');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function() {
  return gulp.src('./assets/scss/main.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(cssnano())
	.on('error', sass.logError)
	.pipe(gulp.dest('./_includes/css'));
});

gulp.task('js', function() {
  return gulp.src('./assets/js/main.js')
	.pipe(gulp.dest('./_includes/js'));
});

gulp.task('images', function () {
  return gulp.src('assets/images/original/**/*.{png,jpg}')
    .pipe(responsive({
      '**/*': [{
        width: 96,
        rename: { suffix: '-96px' },
      },{
        width: 192,
        rename: { suffix: '-192px' },
      },{
        width: 256,
        rename: { suffix: '-256px' },
      },{
        width: 512,
        rename: { suffix: '-512px' },
      },{
        width: 1024,
        rename: { suffix: '-1024px' },
      }]
    },{
      quality: 80,
      progressive: true,
      withMetadata: false,
      withoutEnlargement: true,
      errorOnUnusedImage: false,
      errorOnEnlargement: false
    }))
    .pipe(gulp.dest('assets/images/optimized'))
})

gulp.task("watch", function() {
  gulp.watch('./assets/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./assets/js/**/*.js', gulp.parallel('js'));
});

gulp.task('dev', gulp.parallel('css', 'js'));
gulp.task('build', gulp.parallel('css', 'js', 'images'));
