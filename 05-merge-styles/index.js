const fs = require('fs');
const path = require('path');
const fsp = require('fs/promises');

(async () => {
    try {
        const files = await fsp.readdir(path.join(__dirname, './styles'), {
            withFileTypes: true
          });
          const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

          for (const file of files) {
            const dirFilePath = path.join(__dirname, 'styles');
            const filePath = path.join(dirFilePath, file.name);
            if (file.isFile() && path.parse(file.name).ext === ".css") {
                const styleReadStream = fs.createReadStream(filePath, 'utf8');
               styleReadStream.pipe(bundle);

            }
        }
    }
        catch (err) {
            console.error(err);
          }
    })()
