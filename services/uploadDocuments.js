const multer = require("multer");
const path = require("path");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3'); 


/**
 * storageEngine: Uses Multer to establish destination folder
 * 
 * @link https://www.npmjs.com/package/multer#api
 * 
 * @param {string} destination location of folder
 * @param {string} filename gets original filename
 */
// const storageEngine = multer.diskStorage({
//     destination: "./uploads",
//     filename: function (req, file, fn) {
//         fn(null, file.originalname);
//     }
// });

// Setup AWS connection
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

// new instance of s3
const s3 = new aws.S3();

// multer storage config
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log('upload multer file:', file);
            const folder = 'images/' + file.originalname;
            cb(null, folder); //use Date.now() for unique file keys
        },
        fileFilter:function (req, file, callback) {
            validateFile(file, callback);
        }
    })
});

// upload call
const uploadDocuments = upload;



/**
 * validateFile: ensure file is of proper type
 * 
 * @param {Multer File} file 
 * @param {function} cb(error, boolean) 
 */
const validateFile = function (file, cb) {
    allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
    const extension = allowedFileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        console.log('Validation Passed.')
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
// const uploadDocuments = multer({
//     storage: storageEngine,
//     //SET LIMIT AFTER IMAGE MANIPULATION
//     //limits: { fileSize: 200000 },
//     fileFilter: function (req, file, callback) {
//         validateFile(file, callback);
//     }
// }).single("file");

module.exports = uploadDocuments;