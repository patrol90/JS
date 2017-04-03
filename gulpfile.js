var gulp = require('gulp');
sass = require('gulp-sass');
browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('DRINKS/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('DRINKS/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('DRINKS/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('DRINKS/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('DRINKS/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js

});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'DRINKS' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});