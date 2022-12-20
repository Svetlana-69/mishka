import  dartSaas from "sass";
import gulpSaas from "gulp-sass";

const saas = gulpSaas(dartSaas);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(saas({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.ifGulp(app.isBuild, app.plugins.groupCssMediaQueries()))
        .pipe(app.plugins.ifGulp(
            app.isBuild,
            app.plugins.autoprefixer({
                grid: true,
                overrideBrowserslist: ['last 3 versions'],
                cascade: true
            })
        ))
        // Раскомментировать если нужен не сжаты дубль файла стилей
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.ifGulp(app.isBuild, app.plugins.cleanCss()))
        .pipe(app.plugins.rename({ extname: '.min.css' }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}