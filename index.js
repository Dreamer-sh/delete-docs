const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "please enter the directory path of the file to be deleted: ",
  (directory) => {
    deleteDocFiles(directory);
    rl.close();
  }
);

const deleteDocFiles = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`cannot read directory: ${err}`);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`cannot get file status: ${err}`);
          return;
        }
        if (stats.isDirectory()) {
          deleteDocFiles(filePath);
        } else if (
          stats.isFile() &&
          (file.endsWith(".doc") || file.endsWith(".docx"))
        ) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`cannot delete file ${filePath}: ${err}`);
            } else {
              console.log(`deletion completed: ${filePath}`);
            }
          });
        }
      });
    });
  });
};
