import browsersync from "browser-sync";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // Сжатие CSS файлов
import autoprefixer from "gulp-autoprefixer"; // добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Групировка медиа запросов
import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import ifGulp from 'gulp-if'
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';


export const plugins = {
    browsersync,
    plumber,
    notify,
    rename,
    cleanCss,
    autoprefixer,
    groupCssMediaQueries,
    fs,
    fonter,
    ttf2woff2,
    ifGulp,
    vinylFTP,
    util
}