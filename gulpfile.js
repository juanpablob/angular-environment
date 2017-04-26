/*!
 * Gulpfile
 * since 2015-07-20
 * author juanpablob <m.juanpablob@gmail.com>
 */

var argv = require('yargs').argv,
		gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		src = './src',
		dist = './dist',
		bower = './bower_components',
		scripts = [
			// Enqueue here your project's scripts

			// Except this
			src + '/**/*.js'
		];

// Compile Scripts
gulp.task('scripts', function() {
	gulp.src(scripts)
		.pipe(gulp.dest(dist + '/'));
});

// Validate JS
gulp.task('jshint', function() {
	gulp.src(src + '/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'));
});

gulp.watch(src + '/**/*.js', function() {
	gulp.start('scripts');
	gulp.start('jshint');
});

// Default
gulp.task('default', function() {
	gulp.start('scripts');
	gulp.start('jshint');
});

// Build for dist
gulp.task('build', function() {
	gulp.src(src + '/**/*.js')
		.pipe($.stripDebug())
		.pipe(gulp.dest(dist + '/'))
		.pipe($.jsmin())
		.pipe($.rename({suffix: '.min'}))
		.pipe(gulp.dest(dist + '/'));
});
