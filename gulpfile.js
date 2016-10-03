

var	uglify = require('gulp-uglify'),
	gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	rename = require('gulp-rename'),	
	browser = require('browser-sync'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sourcemaps = require('gulp-sourcemaps');

const scripts = ['src/js/*.js'];
const styles = ['src/sass/*.css', 'src/sass/*.scss'];
const output = 'build';

gulp.task('compress', function(){
	gulp.src(scripts) // What files do we want gulp to consume?
	.pipe(uglify()) // Call the uglify function on these files
	.pipe(rename({ extname: '.min.js' })) //  Rename the uglified file
	.pipe(plumber())
	.pipe(eslint())
	.pipe(gulp.dest(output + '/js')) // Where do we put the result?
	});

gulp.task('sass', function() {
	gulp.src(styles)
	.pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(output + '/css'));
});

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['script']);
	gulp.watch('css/*.css', ['sass']);	
});

gulp.task('default', ['watch', 'sass', 'compress']);



