const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'assets');
const dest = path.join(__dirname, 'project-dist/assets');
fs.mkdir('06-build-page/project-dist', { recursive: true }, (err) => {
  if (err) throw err;

  const template = fs.createReadStream('06-build-page/template.html');

  template.on('data', (data) => {
    replaceTag(data.toString());
    cssBundle();
    copyFiles(dir, dest);
  });
});

function replaceTag(str) {
  fs.readdir(
    '06-build-page/components/',
    { withFileTypes: true },
    (err, items) => {
      if (err) throw err;
      items.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.html') {
          let temp = fs.createReadStream(
            `06-build-page/components/${file.name}`
          );
          temp.on('data', (data) => {
            str = str.replace(`{{${file.name.split('.')[0]}}}`, data);
            fs.writeFile(
              '06-build-page/project-dist/index.html',
              str,
              (err) => err
            );
          });
        }
      });
    }
  );
}
function cssBundle() {
  const style = fs.createWriteStream('06-build-page/project-dist/style.css');
  fs.readdir('06-build-page/styles', { withFileTypes: true }, (err, items) => {
    if (err) throw err;
    items.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        let temp = fs.createReadStream(
          `06-build-page/styles/${file.name}`,
          (err) => {
            if (err) throw err;
          }
        );
        temp.on('data', (data) => {
          style.write(data);
        });
      }
    });
  });
}

function copyFiles(dir, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(dest, { withFileTypes: true }, (err, items) => {
      if (err) throw err;
      items.forEach((file) => {
        if (file.isFile()) {
          fs.unlink(`${dest}/${file.name}`, (err) => err);
        }
      });
      copyDir();
    });
  });

  function copyDir() {
    fs.readdir(dir, { withFileTypes: true }, (err, items) => {
      if (err) throw err;
      items.forEach((file) => {
        if (file.isFile()) {
          fs.copyFile(`${dir}/${file.name}`, `${dest}/${file.name}`, (err) => {
            if (err) throw err;
          });
        } else {
          copyFiles(`${dir}/${file.name}`, `${dest}/${file.name}`);
        }
      });
    });
  }
}
