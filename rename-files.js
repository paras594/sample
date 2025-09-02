const fs = require("fs");
const path = require("path");

// Specify the directory path
const dirPath = "./";

// Function to rename files
function renameFiles(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      // file name should not contain cupcake or rename-files
      if (!file.includes("cupcake") && !file.includes("rename-files")) {
        const filePath = path.join(dirPath, file);
        const fileExt = path.extname(file);
        const newFileName = `cupcake-${file}`;
        fs.rename(filePath, path.join(dirPath, newFileName), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Renamed ${file} to ${newFileName}`);
          }
        });
      }
    });
  });
}

renameFiles(dirPath);
