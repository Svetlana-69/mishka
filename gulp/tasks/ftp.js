import { configFTP } from '../config/ftp.js';

export const ftp = () => {
    configFTP.log = app.plugins.util.log;
    const ftpConnect = app.plugins.vinylFTP.create(configFTP);
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FTP",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}