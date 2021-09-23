const { src, dest, watch } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const celanCSS = require('gulp-clean-css');

function streamHtml() {
	return src('src/*.html')
		.pipe(dest('public'));
}
function streamJS() {
	return src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
		.pipe(dest('public/js'));
}
function streamJquery() {
    return src('node_modules/jquery/dist/jquery.min.js')
        .pipe(uglify())
        .pipe(dest('public/lib'));
}

function streamCss(){
    return src('src/css/*.css')
        .pipe(celanCSS())
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('public/css'));
}

exports.jquery = streamJquery;
exports.html= streamHtml;

exports.all = series(streamHtml(),streamJS(),streamJquery(),streamCss());

exports.default = function() {
    watch('src/*.html', streamHtml )
    watch('src/js/*.js', streamJS )
    watch('src/css/*.css', streamCss )
}