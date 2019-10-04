const multer = require("multer");
const path = require("path");

// https://www.npmjs.com/package/multer#api
// 'destination' and 'filename' - both functions determine where the file should be stored and the name of the file at the destination
const storageEngine = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, fn) {
    fn(
      null,
      new Date().getTime().toString() +
        "-" +
        file.fieldname +
        path.extname(file.originalname)
    );
  }
});

var validateFile = function(file, cb) {
  allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
  const extension = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb("Invalid file type. Only PDF, JPEG, PNG and GIF files are allowed.");
  }
};

const uploadDocuments = multer({
  storage: storageEngine,
//SET LIMIT AFTER IMAGE MANIPULATION
  //limits: { fileSize: 200000 },
  fileFilter: function(req, file, callback) {
    validateFile(file, callback);
  }
}).single("file");

module.exports = uploadDocuments;