let csvToJson = require("convert-csv-to-json");
var fs = require("fs");

const folder = "../highlights/";

const convertCsv = function () {
  let fileList = [];
  fs.readdirSync(folder).forEach((file) => {
    if (file.split(".")[1] === "csv") {
      fileList.push(file);
      csvToJson
        .formatValueByType()
        .fieldDelimiter(",")
        .generateJsonFileFromCsv(`${folder}${file}`, `${folder}${file.split(".")[0]}.json`);
    }
  });
  console.log("3:", fileList);
  //   // return fileList;
};

convertCsv();
