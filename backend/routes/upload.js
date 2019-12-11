// 'use strict'
require("dotenv").config();
const express = require("express");
const router = express.Router();
const uploadDocuments = require("./uploadDocuments");

/**
 * POST: Upload image to storage 
 * 
 * @alias http://localhost:3000/upload/image
 * 
 * @see routes/uploadDocuments handles moving the image to storage
 */
router.route('/image').post((req, res) => {
  uploadDocuments(req, res, error => {
    if (error) {
      console.log("Error after Routing, please try again !!");
    } else {
      if (req.file == undefined) {
        console.log("Error on File, no file was selected");
      } else {
        res.send({
          status: "200",
          responseType: "string",
          response: "success"
        });
      }
    }
  });
});

module.exports = router;