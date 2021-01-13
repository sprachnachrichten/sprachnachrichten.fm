const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require('gulp-cssnano');
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

gulp.task("watch", function() {
  gulp.watch('./assets/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./assets/js/**/*.js', gulp.parallel('js'));
});

gulp.task('dev', gulp.parallel('css', 'js'));
gulp.task('build', gulp.parallel('css', 'js'));