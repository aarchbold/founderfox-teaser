var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    bower = require('gulp-bower'),
    autoprefixer = require('gulp-autoprefixer');


var config = {
     sassPath: './src/sass',
    cssPath: './src/css',
     bowerDir: './bower_components' ,
    cssDest: './webapp/static/css'
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./webapp/static/fonts')); 
});

gulp.task('sass', function() {
    return sass(config.sassPath + '/styles.scss', { 
    		style: 'expanded',
            loadPath: [
                 './src/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
    	})
        .pipe(gulp.dest(config.cssPath));
});

gulp.task('autoprefixer', function () {
    return gulp.src(config.cssPath + '/styles.css')
        .pipe(autoprefixer({
            browsers: [ 'last 3 version', 'safari 7', 'ie 9', 'ie 8', 'ios 7' ],
            cascade: false
        }))
        .pipe(gulp.dest(config.cssDest));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['sass']); 
    gulp.watch(config.cssPath + '/*.css', ['autoprefixer']);
});

  gulp.task('default', ['bower', 'icons', 'sass', 'autoprefixer']);