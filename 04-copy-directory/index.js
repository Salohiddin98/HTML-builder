const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "files");
const dest = path.join(__dirname, "files-copy");

fs.readdir(dest, { withFileTypes: true }, (err, items) => {
  if (err) throw err;
  items.forEach((file) => {
    if (file.isFile()) {
      fs.unlink(`${dest}/${file.name}`, (err) => err);
    }
  });
});

fs.mkdir(dest, { recursive: true }, (err) => {
  if (err) throw err;
  copyDir();
});

function copyDir() {
  fs.readdir(dir, { withFileTypes: true }, (err, items) => {
    if (err) throw err;
    items.forEach((file) => {
      if (file.isFile()) {
        fs.copyFile(`${dir}/${file.name}`, `${dest}/${file.name}`, (err) => {
          if (err) {
            throw err;
          }
        });
      } else {
        console.log(file.name + "-папка и не будет скопирован!");
      }
    });
  });
}
