//Импорт всех требуемых модулей
const fs = require('node:fs/promises');
const path = require('path');

(async () => {
  try {

    const files = await fs.readdir(path.join(__dirname, './secret-folder'), { //Чтение содержимого папки secret - folder
      withFileTypes: true
    });
    for (const file of files) {     //Получение данных о каждом объекте который содержит папка secret - folder
      if (file.isFile()) {         //Проверка объекта на то, что он является файлом
        const filePath = path.join(__dirname, './secret-folder', file.name);
        const fileName = path.parse(filePath).name;
        const fileExt = path.extname(filePath).slice(1);
        const fileSize = (await fs.stat(filePath)).size;
        console.log(`${fileName} - ${fileExt} - ${fileSize}byte`);      //Вывод данных о файле в консоль
      }
    }
  } catch (err) {
    console.error(err);
  }
})();