const path = require("path");
const fs = require("fs");
const dir = path.join(__dirname, "secret-folder");

fs.readdir(dir, { withFileTypes: true }, (err, items) => {
  if (err) throw err;
  items.forEach((file) => {
    if (file.isFile()) fileInfo(file.name);
  });
});

function fileInfo(file) {
  let a = file.length;
  let b = path.extname(file).length;
  fs.stat(path.join(dir, file), (err, stat) => {
    if (err) throw err;
    console.log(
      "Имя: " +
        file.substring(0, a - b) +
        "   Расширение: " +
        path.extname(file).substring(1) +
        "   Размер: " +
        stat.size / 1000 +
        " KB"
    );
  });
}
