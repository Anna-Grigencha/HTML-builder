const fs = require('fs/promises');
const path = require('path');
(async () => {
    try {
        await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => { // создаем папку files-copy
        if (err) throw err;
});
let files = await fs.readdir(path.join(__dirname, 'files'));
for (let file of files) {
const DirFilePath = path.join(__dirname, 'files');
const src = path.join(DirFilePath, file);
const DirFileCopyPath = path.join(__dirname, 'files-copy');
const dest = path.join(DirFileCopyPath, file);
await fs.copyFile(src, dest);
}
    }

catch (err) {
    console.error(err);
  }
})()
