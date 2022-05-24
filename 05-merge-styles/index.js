const fs = require('fs');
const path = require('path');
const bundle = fs.createWriteStream('05-merge-styles/project-dist/bundle.css');
fs.readdir('05-merge-styles/styles', { withFileTypes: true }, (err, items) => {
  if (err) throw err;
  items.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let temp = fs.createReadStream(
        `05-merge-styles/styles/${file.name}`,
        (err) => {
          if (err) throw err;
        }
      );
      temp.on('data', (data) => {
        bundle.write(data);
      });
    }
  });
});
