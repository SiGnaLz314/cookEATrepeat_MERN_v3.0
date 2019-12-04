const multer = require("multer");
const path = require("path");

/**
 * storageEngine: Uses Multer to establish destination folder
 * 
 * @link https://www.npmjs.com/package/multer#api
 * 
 * @param {string} destination location of folder
 * @param {string} filename gets original filename
 */
const storageEngine = multer.diskStorage({
    destination: "../public/uploads",
    filename: function(req, file, fn) {
        fn(null, file.originalname);
    }
});

/**
 * validateFile: ensure file is of proper type
 * 
 * @param {Multer File} file 
 * @param {function} cb(error, boolean) 
 */
const validateFile = function(file, cb) {
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

/**
 * upldoadDocuemnts: multer Instance.
 * 
 * Validates and Uploads file to file destination through multer
 * 
 * @see storageEngine
 * @see validateFile
 */
const uploadDocuments = multer({
    storage: storageEngine,
    //SET LIMIT AFTER IMAGE MANIPULATION
    //limits: { fileSize: 200000 },
    fileFilter: function(req, file, callback) {
        validateFile(file, callback);
    }
}).single("file");

module.exports = uploadDocuments;