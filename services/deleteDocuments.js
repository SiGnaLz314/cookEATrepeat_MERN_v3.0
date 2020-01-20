var aws = require('aws-sdk');

// Setup AWS connection
aws.config.update({
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION,
    });
const s3 = new aws.S3();

const deleteDocuments = async (result) => {
  const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `images/${result.imagepath}` //if any sub folder-> path/of/the/folder.ext
  }
  try {
      console.log(params);
      await s3.headObject(params).promise()
      console.log("File Found in S3")
      try {
          await s3.deleteObject(params).promise()
          console.log("file deleted Successfully")
      }
      catch (err) {
          console.log("ERROR in file Deleting : " + JSON.stringify(err))
      }
  } catch (err) {
          console.log("File not Found ERROR : " + err.code)
}
}

module.exports = deleteDocuments;