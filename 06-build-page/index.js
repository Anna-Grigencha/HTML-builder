const fs = require('fs');
const path = require('path');
const fsp = require('fs/promises');

(async () => {
    try {
        await fsp.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, err => { // удаляем папку project-dist
            if (err) throw err;
        });
        await fsp.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => { // создаем папку project-dist
            if (err) throw err;
        });

        //создание копии папки assets
        await fsp.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => { // создаем папку assets
            if (err) throw err;
        });

        let folders = await fsp.readdir(path.join(__dirname, 'assets'));

        for (let folder of folders) {
            await fsp.mkdir(path.join(__dirname, 'project-dist', 'assets', folder), { recursive: true }, err => { // создаем папки
                if (err) throw err;
            });
            let files = await fsp.readdir(path.join(__dirname, 'assets', folder));
            for (let file of files) {
                const dirFilePath = path.join(__dirname, 'assets', folder);
                const src = path.join(dirFilePath, file);
                const dirFileCopyPath = path.join(__dirname, 'project-dist', 'assets', folder);
                const dest = path.join(dirFileCopyPath, file);
                await fsp.copyFile(src, dest);
            }
        }

        //создание файла style css
        const filesCss = await fsp.readdir(path.join(__dirname, './styles'), {
            withFileTypes: true
        });
        const style = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

        for (const fileCss of filesCss) {
            const dirFilePath = path.join(__dirname, 'styles');
            const filePath = path.join(dirFilePath, fileCss.name);
            if (fileCss.isFile() && path.parse(fileCss.name).ext === ".css") {

                const styleReadStream = fs.createReadStream(filePath, 'utf8');
                styleReadStream.pipe(style);
            }
        }

        //создание файла index.html

        const projectDist = path.join(__dirname, 'project-dist');
        const template = path.join(__dirname, 'template.html');
        let templateHtml = await fsp.readFile(template, { encoding: 'utf8' });
        const components = path.join(__dirname, 'components');
        const componentsFiles = await fsp.readdir(components, { withFileTypes: true });
        let arrHtmlFiles = [];

        for (let file of componentsFiles) {
            if (file.isFile() && path.extname(file.name) === '.html') {
                let filePath = path.join(components, file.name);
                let fileParse = path.parse(filePath);
                let htmlComponents = await fsp.readFile(filePath, { encoding: 'utf8' });
                arrHtmlFiles.push([`{{${fileParse.name}}}`, htmlComponents]);
            }
        }
        for (let arrHtmlFile of arrHtmlFiles) {
            templateHtml = templateHtml.replace(arrHtmlFile[0], arrHtmlFile[1]);
        }
        const indexFilePath = path.join(projectDist, 'index.html');
        await fsp.writeFile(indexFilePath, templateHtml, { encoding: 'utf8' });
    }

    catch (err) {
        console.error(err);
    }
})()



