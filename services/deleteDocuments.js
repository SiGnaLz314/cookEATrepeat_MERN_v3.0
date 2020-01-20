var aws = require('aws-sdk');
var s3 = new aws.S3();

// Setup AWS connection
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});




const deleteDocuments = (result) => {
    console.log('delete filename:', result );
    console.log('End Filename');
    let params = {
        Bucket: 'node-sdk-sample-7271', 
        Delete: { // required
          Objects: [ // required
            {
              Key: filename // required
            },
          ],
        },
    };
          
    s3.deleteObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}
  
module.exports = deleteDocuments;