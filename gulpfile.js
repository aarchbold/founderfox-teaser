var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    bower = require('gulp-bower');


var config = {
     sassPath: './src/sass',
     bowerDir: './bower_components' 
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
        .pipe(gulp.dest('./webapp/static/css'));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['sass']); 
});

  gulp.task('default', ['bower', 'icons', 'sass']);