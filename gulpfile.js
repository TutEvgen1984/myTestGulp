/*function defaultTask(cb) {
    // place code for your default task here
    cb();
}

exports.default = defaultTask*/

/*const gulp = require('gulp')
const less = require('less')
const del = require('del')

function clean() {
    return del(['dist'])
}

exports.clean = clean
*/

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