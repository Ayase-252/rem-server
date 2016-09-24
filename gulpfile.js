const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('compile', () => {
  return gulp.src(['./route/**/*.js',
    'src/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
})
