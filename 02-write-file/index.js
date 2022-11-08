const path = require('path');
const fs = require('fs');
const { stdout } = process; 
const { stdin } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');//создание потока записи в текстовый файл
stdout.write('Введите имя участника:\n');//Выводит строку в консоль
stdin.on('data', chunk => 
{
  if (chunk.toString().trim() === 'exit'){
    process.exit(); 
  }
  output.write(chunk);
  
});
process.on('exit', () => stdout.write('\nХорошего дня!'));
process.on('SIGINT', () => process.exit());  //сигнал SIGINT генерируется при нажатии ctrl+c