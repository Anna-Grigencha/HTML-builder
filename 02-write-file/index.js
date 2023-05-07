//1. Импорт всех требуемых модулей.
const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');


//2. Создание потока записи в текстовый файл

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');//создание потока записи в текстовый файл

//3. Вывод в консоль приветственного сообщения
stdout.write('Введите имена участников\n');

//4. Ожидание ввода текста пользователем, с дальнейшей проверкой ввода на наличие ключевого слова **exit**
//5. Запись текста в файл
stdin.on('data', chunk => {
  if (chunk.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(chunk);

});
//6. Ожидание дальнейшего ввода
//7. Реализация прощального сообщения при остановке процесса
process.on('exit', () => stdout.write('\nХорошего дня!'));
process.on('SIGINT', () => process.exit());  //сигнал SIGINT генерируется при нажатии ctrl+c