export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.fonter({ formats: ['ttf'] }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    // Ищем файлы шрифтов .ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        // Ковертируем в .woff
        .pipe(app.plugins.fonter({ formats: ['woff'] }))
        // Выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // Ищем файлы шрифтов .ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        // Ковертируем в .woff
        .pipe(app.plugins.ttf2woff2())
        // Выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontStyle = () => {
   const fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
   app.plugins.fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
       if (fontsFiles) {
           if (!app.plugins.fs.existsSync(fontsFile)) {
               app.plugins.fs.writeFile(fontsFile, '', cb);
               let newFileOnly;
               fontsFiles.forEach(file => {
                   const fontFileName = file.split('.')[0];
                   if (newFileOnly !== fontFileName) {
                       const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                       let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                       switch (fontWeight.toLowerCase()) {
                           case 'thin':
                               fontWeight = 100;
                               break;
                           case 'extralight':
                               fontWeight = 200;
                               break;
                           case 'light':
                               fontWeight = 300;
                               break;
                           case 'medium':
                               fontWeight = 500;
                               break;
                           case 'semibold':
                               fontWeight = 600;
                               break;
                           case 'bold':
                               fontWeight = 700;
                               break;
                           case 'extrabold':
                           case 'heavy':
                               fontWeight = 800;
                               break;
                           case 'black':
                               fontWeight = 900;
                               break;
                           default:
                               fontWeight = 400;
                       }

                       app.plugins.fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);

                       newFileOnly = fontFileName;
                   }
               })
           } else {
               console.log('Файл scss/fonts.scss уже существует. Для обновления файла его нужно удатить');
           }
       }
   });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() {}
}