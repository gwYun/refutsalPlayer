let csv = require("csvtojson");

function getHighlights(date, team) {
  const csvFilePath = `highlights/${date}_${team}_highlights.csv`;
  console.log(csvFilePath);

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      return jsonObj;
    });
}

export default getHighlights;
