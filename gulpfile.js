/* #region Задача Default  */
/*// Первоначальная тестировочная задача по умолчанию
function defaultTask(cb) {
    // place code for your default task here
    cb();
}

exports.default = defaultTask*/
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

/* #region Задача Less->CSS.min  */
// подключим плагин gulp-rename
const rename = require('gulp-rename')

// подключим плагин gulp-clean-css
const cleanCSS = require('gulp-clean-css')

// Функция компиляции less в css версия 2
function styles_fn2() {
    return gulp_module.src(paths.styles.src)
        // нашли выше все файлы less в папке разработки
        .pipe(less_module())
        // pipe это выполнение действий. Применили к найденным стилям модуль less который выдаст style.css
        .pipe(cleanCSS())
        // сработает плагин gulp-clean-css и выполнит минификацию кода CSS
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }
        ))
        // сработает плагин gulp-rename и переименует файл в main.min (а .css в конце уже стоит)
        .pipe(gulp_module.dest(paths.styles.dest))
    // gulp создаст папку назначения и туда поместится наш файл main.min.css
}

// задача преобразования стилей
exports.styles_task_min = styles_fn2
/* #endregion Less->CSS.min */

/* #region  Слежение Watch */
// Функция слежения за изменениями файлов
function watch_fn() {
    gulp_module.watch(paths.styles.src, styles_fn2)
    // у метода watch() в скобках первым идет путь, куда смотреть, это 'src/styles/**/*.less'
    // вторым после запятой это функция, которая выполнится в случае изменения файла указанного в пути
    // метод .watch следит за изменениями файлов
}

exports.watch_task = watch_fn

/* #endregion Слежение Watch */

/* #region  Серия задач */
// Серия из задач
const build = gulp_module.series(this.clean_task, this.styles_task_min, this.watch_task)
// сначала очищаем директорию,
// затем минифицируем стили,
// затем запускаем наблюдателя

exports.build_task = build

// exports.default = build

// эта запись означает, что по умолчанию, если в терминале ввести короткую команду gulp, будет срабатывать build_task

// чтобы остановить выполнение наблюдателя, надо нажать ctrl+c

/* #endregion Серия задач */

/* #region  13.8 Обработка скриптов */
const babel = require('gulp-babel')
// плагин делающий совместимость о старыми браузерами

const uglify = require('gulp-uglify')
// плагин оптимизирующий и сжимает скрипты

const concat = require('gulp-concat')
// плагин умеющий объединять несколько файлов в один

// Функция компиляции скриптов
function scripts_fn() {
    return gulp_module.src(paths.scripts.src, {
        sourcemaps: true
        // включили карту
    })
        // нашли выше все файлы скриптов в папке разработки
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        // объединили несколько файлов в один и сразу же переименовали в результирующее название main.min.js
        .pipe(gulp_module.dest(paths.scripts.dest))
    // gulp создаст папку назначения и туда поместится наш файл
}

exports.scripts_task = scripts_fn

// обновленная функция наблюдения:
function watch_fn2() {
    // наблюдение за стилями:
    gulp_module.watch(paths.styles.src, styles_fn2)

    // наблюдение за скриптами:
    gulp_module.watch(paths.scripts.src, scripts_fn)
}

exports.watch_task2 = watch_fn2

const build2 = gulp_module.series(this.clean_task, gulp_module.parallel(this.styles_task_min, this.scripts_task), this.watch_task2)

exports.default = build2

/* #endregion 13.8 Обработка скриптов */

/* #region 13.10 Autoprefixer, Sourcemaps, Babel  */

const sourcemaps = require('gulp-sourcemaps')

// ... задолбался

/* #endregion 13.10 Autoprefixer, Sourcemaps, Babel */