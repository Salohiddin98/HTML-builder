const fs = require('fs');
const { stdin, stdout } = process;

const text = fs.createWriteStream('02-write-file/text.txt');
stdout.write('Введите что душе угодно:\n');
stdin.on('data', (data) => {
  if (data.toString() === 'exit\r\n') {
    process.exit();
  } else if (process.on('SIGINT', () => process.exit()));
  text.write(data);
});

process.on('exit', () => {
  stdout.write('Пока!');
});
