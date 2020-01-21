const multer = require("multer");
const path = require("path");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3'); 


// Setup AWS connection
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

// new instance of s3 with config
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


// upload call
const uploadDocuments = upload;

module.exports = uploadDocuments;