/* #region Задача Default  */
// Первоначальная тестировочная задача по умолчанию
function defaultTask(cb) {
    // place code for your default task here
    cb();
}

exports.default = defaultTask
/* #endregion Задача Default */

/* Гавна-код */
const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')

function clean() {
    return del(['dist'])
}

exports.clean = clean

/* end Гавна-код */

/* #region  Задача del папку 'dist' */
// Код для нормальных пацанов
// Подключение модулей к планировщику gulp
const gulp_module = require('gulp')
// require('gulp'): 'gulp' внутри require должен совпадать с тем как он написан в package.json в разделе "devDependencies"

const less_module = require('gulp-less')
const del_module = require('del')

// Функция для удаления папки dist с помощью модуля del
function clean_fn() {
    return del_module(['dist'])
    // 'dist' это название папки которую будем удалять
}

// Описание задачи
exports.clean_task = clean_fn
// clean_task это название задачи для gulp, если в терминале ввести gulp --tasks, то увидим именно clean_task
// clean_fn после равно это название функции, которую выполнит задача
// В терминале выполняем gulp clean_task, в результате происходит удаление нужной папки

//Если у вас возникла ошибка в терминале, то есть простое решение:
//Можно сначала удалить модуль del, который у вас скорей всего версии 7 и выше
//npm uninstall del
//Устанавливайте плагин del версии 6 иначе будут ошибки и придется переделывать всю сборку, так как в новой версии требуется использовать новый синтаксис импорта и экспорта.
//npm i del@6.0.0 -D
/* #endregion Задача del папку 'dist' */

/* #region  Задача Less>CSS */

// Объект константа paths (пути), хранящий пути где у нас будет вестись разработка, и где будет результирующая папка

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

// Функция компиляции less в css
function styles_fn() {
    return gulp_module.src(paths.styles.src)
        // нашли выше все файлы less в папке разработки
        .pipe(less_module())
        // pipe это выполнение действий. Применили к найденным стилям модуль less
        .pipe(gulp_module.dest(paths.styles.dest))
    // gulp создаст папку назначения и туда поместится наш файл
}

// задача преобразования стилей
exports.styles_task = styles_fn

/* #endregion Задача Less->CSS */
