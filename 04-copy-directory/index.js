const fs = require('fs/promises');
const path = require('path');
(async () => {
    try {
        await fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => { // удаляем папку files-copy
            if (err) throw err;
    });
        await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => { // создаем папку files-copy
        if (err) throw err;
});
let files = await fs.readdir(path.join(__dirname, 'files'));
for (let file of files) {
const dirFilePath = path.join(__dirname, 'files');
const src = path.join(dirFilePath, file);
const dirFileCopyPath = path.join(__dirname, 'files-copy');
const dest = path.join(dirFileCopyPath, file);
await fs.copyFile(src, dest);
}
    }

catch (err) {
    console.error(err);
  }
})()
