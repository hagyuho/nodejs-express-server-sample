const db = require('../model/index.js')
const AfList = db.aflist;

const readXlsxFile = require("read-excel-file/node");

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let uploadFiles = [];

      rows.forEach((row) => {
        let uploadFile = {
          name: row[0],
          interest: row[1],
          retireDday: row[2],
        };

        uploadFiles.push(uploadFile);
      });

      AfList.bulkCreate(uploadFiles)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};
